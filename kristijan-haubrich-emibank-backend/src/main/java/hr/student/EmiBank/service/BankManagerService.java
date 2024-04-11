package hr.student.EmiBank.service;

import hr.student.EmiBank.Mapper.BankManagerMapper;
import hr.student.EmiBank.auth.JwtService;
import hr.student.EmiBank.dtos.request.CheckPasswordDto;
import hr.student.EmiBank.dtos.request.UserChangeEmailRequestDto;
import hr.student.EmiBank.dtos.request.UserChangePasswordRequestDto;
import hr.student.EmiBank.dtos.request.BankManagerRequestDto;
import hr.student.EmiBank.dtos.response.BankManagerDetailsResponseDto;
import hr.student.EmiBank.dtos.response.IfResponseDto;
import hr.student.EmiBank.dtos.response.RegisterBankManagerResponseDto;
import hr.student.EmiBank.dtos.response.TokenDto;
import hr.student.EmiBank.jpa_repository.BankManagerRepo;
import hr.student.EmiBank.jpa_repository.RoleRepo;
import hr.student.EmiBank.jpa_repository.TokenRepo;
import hr.student.EmiBank.jpa_repository.UserRepo;
import hr.student.EmiBank.model.BankManager;
import hr.student.EmiBank.model.Role;
import hr.student.EmiBank.model.Token;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BankManagerService {
    private final BankManagerRepo bankManagerRepo;
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final BankManagerMapper bankManagerMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TokenRepo tokenRepo;
    private static final int accessTokenDuration = 1000*60*60*3;

    @Transactional
    public List<BankManagerDetailsResponseDto> getAllBankManagers(){
        List<BankManager> bankManagersFromDatabase = bankManagerRepo.findAll();
        List<BankManagerDetailsResponseDto> bankManagerDetailsResponseDtos = new ArrayList<>();

        if(bankManagersFromDatabase!=null){
            bankManagersFromDatabase.forEach(
                    bankManager -> {
                        List<String> clients = new ArrayList<>();
                        if (bankManager.getClients() != null){

                            bankManager.getClients().forEach(
                                    client -> clients.add(client.getEmail())
                            );
                        }
                        bankManagerDetailsResponseDtos.add(new BankManagerDetailsResponseDto(bankManager.getName(),clients,bankManager.getEmail()));
                    }
            );
        }

        return bankManagerDetailsResponseDtos;
    }

    @Transactional
    public BankManagerDetailsResponseDto getBankManagerDetails(String bankManagerEmail) {
        Optional<BankManager> bankManagerFromDatabase = bankManagerRepo.findByEmail(bankManagerEmail);

        if(bankManagerFromDatabase.isPresent()){
            List<String> clients = new ArrayList<>();
            if (bankManagerFromDatabase.get().getClients() != null){

                bankManagerFromDatabase.get().getClients().forEach(
                        client -> clients.add(client.getEmail())
                );

                return new BankManagerDetailsResponseDto(bankManagerFromDatabase.get().getName(),clients,bankManagerFromDatabase.get().getEmail());
            }

        }
        return null;
    }

    @Transactional
    public RegisterBankManagerResponseDto addNewBankManager(BankManagerRequestDto bankManagerRequestDto){
        Optional<Role> role = roleRepo.findByName(bankManagerRequestDto.getBankManagerRole());
        Optional<BankManager> BM = bankManagerRepo.findByEmail(bankManagerRequestDto.getEmail());
        boolean alreadyExist = BM.isPresent();
        if (role.isPresent() && !alreadyExist){
            BankManager bankManager = bankManagerMapper.map(bankManagerRequestDto);
            bankManager.setRole(role.get());
            bankManager.setPassword(passwordEncoder.encode(bankManagerRequestDto.getPassword()));
            userRepo.save(bankManager);

            Optional<BankManager> checkBM = bankManagerRepo.findByEmail(bankManagerRequestDto.getEmail());
            return new RegisterBankManagerResponseDto(checkBM.isPresent(),false);
        }
        return new RegisterBankManagerResponseDto(false,alreadyExist);
    }

    @Transactional
    public void changePassword(UserChangePasswordRequestDto userChangePasswordRequestDto) {
        Optional<BankManager> bankManager = bankManagerRepo.findByEmail(userChangePasswordRequestDto.getEmail());
        bankManager.ifPresent(bm -> bm.setPassword(passwordEncoder.encode(userChangePasswordRequestDto.getPassword())));
    }

    @Transactional
    public IfResponseDto checkPassword(CheckPasswordDto checkPasswordDto){
        Optional<BankManager> bankManager = bankManagerRepo.findByEmail(checkPasswordDto.getEmail());
        if(bankManager.isPresent()){
            IfResponseDto responseDto = new IfResponseDto(false);
            String encodedPassword = bankManager.get().getPassword();
            if(passwordEncoder.matches(checkPasswordDto.getPassword(), encodedPassword))
                responseDto.setValidation(true);
            return responseDto;
        }
        return null;
    }
    @Transactional
    public void changeEmail(UserChangeEmailRequestDto userChangeEmailRequestDto) {
        Optional<BankManager> bankManager = bankManagerRepo.findByEmail(userChangeEmailRequestDto.getOldEmail());
        if (bankManager.isPresent()){
            bankManager.get().setEmail(userChangeEmailRequestDto.getNewEmail());
        }
    }

    @Transactional
    public IfResponseDto deleteBankManager(String bankManagerEmail){
        Optional<BankManager> bankManager = bankManagerRepo.findByEmail(bankManagerEmail);
        if (bankManager.isPresent()){
            if(!bankManager.get().getClients().isEmpty()) return new IfResponseDto(false);

            bankManagerRepo.delete(bankManager.get());
            Optional<Token> dbToken = tokenRepo.findByEmail(bankManagerEmail);
            if(dbToken.isPresent()){
                tokenRepo.delete(dbToken.get());
            }
            Optional<BankManager> checkBankManager = bankManagerRepo.findByEmail(bankManagerEmail);
            return new IfResponseDto(!checkBankManager.isPresent());
        }
        return new IfResponseDto(false);
    }
    @Transactional
    public TokenDto getAccessToken(String email) {
        Optional<BankManager> dbBankManager = bankManagerRepo.findByEmail(email);

        if (dbBankManager.isPresent()){
            Map<String,Object> authorities = new HashMap<>();
            List<String> permissions = new ArrayList<>();

            BankManager userObj = dbBankManager.get();

            userObj.getAuthorities().forEach(
                    grantedAuthority -> permissions.add(grantedAuthority.getAuthority())
            );

            authorities.put("authorities",permissions);

            String accessToken = jwtService.generateToken(authorities,userObj,accessTokenDuration);

            return new TokenDto(accessToken);
        }
        return null;
    }
}
