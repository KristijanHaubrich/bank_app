package hr.student.EmiBank.service;

import hr.student.EmiBank.Mapper.ClientMapper;
import hr.student.EmiBank.auth.JwtService;
import hr.student.EmiBank.dtos.request.CheckPasswordDto;
import hr.student.EmiBank.dtos.request.NewClientRequestDto;
import hr.student.EmiBank.dtos.request.UserChangeEmailRequestDto;
import hr.student.EmiBank.dtos.request.UserChangePasswordRequestDto;
import hr.student.EmiBank.dtos.response.*;
import hr.student.EmiBank.jpa_repository.*;
import hr.student.EmiBank.model.*;
import kotlin.OptIn;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.*;


@Service
@Slf4j
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepo clientRepo;
    private final ClientMapper clientMapper;
    private final BankManagerRepo bankManagerRepo;
    private final RoleRepo roleRepo;
    private final TokenRepo tokenRepo;
    private final PasswordEncoder passwordEncoder;
    private static final int accessTokenDuration = 1000*60*60*3;
    private final UserRepo userRepo;
    private final JwtService jwtService;
    @Transactional(readOnly = true)
    public List<ClientData> getAllClients(){
        List<Client> databaseClients = clientRepo.findAll();
        List<ClientData> clientData = new ArrayList<>();

        if (!databaseClients.isEmpty()){
            databaseClients.forEach(
                    databaseClient -> clientData.add(clientMapper.map(databaseClient))
            );
        }

        return clientData;
    }
    @Transactional(readOnly = true)
    public Client getClientDetails(String clientEmail) {
        Optional<Client> dbClient = clientRepo.findByEmail(clientEmail);
        return dbClient.get();
    }

    @Transactional
    public ClientDetailsResponseDto sendClientDetails(String clientEmail) {
        Optional<Client> dbClient = clientRepo.findByEmail(clientEmail);
        if(dbClient.isPresent()){
            ClientData clientData = clientMapper.map(dbClient.get());
            return new ClientDetailsResponseDto(clientData,true);
        }
        return new ClientDetailsResponseDto(null,false);
    }
    @Transactional
    public RegisterClientResponseDto addNewClient(NewClientRequestDto newClientRequestDto) {
        Client client = clientMapper.map(newClientRequestDto);
        Optional<Client> dbClient = clientRepo.findByEmail(newClientRequestDto.getEmail());
        Optional<BankManager> dbBankManager = bankManagerRepo.findByEmail(newClientRequestDto.getBankManagerEmail());
        Boolean bankManagerExist = dbBankManager.isPresent();
        Boolean alreadyExists = dbClient.isPresent();

        if(!alreadyExists && bankManagerExist){
               client.setBankManager(dbBankManager.get());
               Optional<Role> dbRole = roleRepo.findByName("ROLE_CLIENT");
               dbRole.ifPresent(client::setRole);
               client.setPassword(passwordEncoder.encode(newClientRequestDto.getPassword()));
               userRepo.save(client);

               Optional<Client> checkClient = clientRepo.findByEmail(newClientRequestDto.getEmail());
               return new RegisterClientResponseDto(checkClient.isPresent(),false,true);
        }
        return new RegisterClientResponseDto(false,alreadyExists,bankManagerExist);
    }

    @Transactional
    public void changePassword(UserChangePasswordRequestDto userChangePasswordRequestDto) {
        Client client = getClientDetails(userChangePasswordRequestDto.getEmail());
        client.setPassword(passwordEncoder.encode(userChangePasswordRequestDto.getPassword()));
    }
    @Transactional
    public void changeEmail(UserChangeEmailRequestDto userChangeEmailRequestDto) {
        Client client = getClientDetails(userChangeEmailRequestDto.getOldEmail());
        client.setEmail(userChangeEmailRequestDto.getNewEmail());
    }
    @Transactional
    public IfResponseDto deleteClient(String clientEmail)
    {
        Client client = getClientDetails(clientEmail);
        if (client != null){
            userRepo.delete(client);
            Optional<Token> dbToken = tokenRepo.findByEmail(clientEmail);
            if(dbToken.isPresent()){
                tokenRepo.delete(dbToken.get());
            }

            Optional<Client> checkClient = clientRepo.findByEmail(clientEmail);
            return new IfResponseDto(!checkClient.isPresent());
        }
        return new IfResponseDto(false);
    }

    @Transactional
    public TokenDto getAccessToken(String email) {
        Optional<Client> dbClient = clientRepo.findByEmail(email);

        if (dbClient.isPresent()){
            Map<String,Object> authorities = new HashMap<>();
            List<String> permissions = new ArrayList<>();

            Client userObj = dbClient.get();

            userObj.getAuthorities().forEach(
                    grantedAuthority -> permissions.add(grantedAuthority.getAuthority())
            );

            authorities.put("authorities",permissions);

            String accessToken = jwtService.generateToken(authorities,userObj,accessTokenDuration);

            return new TokenDto(accessToken);
        }
        return null;
    }

    @Transactional
    public IfResponseDto checkPassword(CheckPasswordDto checkPasswordDto) {
        Optional<Client> client = clientRepo.findByEmail(checkPasswordDto.getEmail());
        if(client.isPresent()){
            IfResponseDto responseDto = new IfResponseDto(false);
            String encodedPassword = client.get().getPassword();
            if(passwordEncoder.matches(checkPasswordDto.getPassword(), encodedPassword))
                responseDto.setValidation(true);
            return responseDto;
        }
        return null;
    }
}



