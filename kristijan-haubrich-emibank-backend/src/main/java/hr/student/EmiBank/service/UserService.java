package hr.student.EmiBank.service;

import hr.student.EmiBank.Mapper.ClientMapper;
import hr.student.EmiBank.auth.JwtService;
import hr.student.EmiBank.dtos.request.UserAuthRequestDto;
import hr.student.EmiBank.dtos.response.*;
import hr.student.EmiBank.jpa_repository.*;
import hr.student.EmiBank.model.BankManager;
import hr.student.EmiBank.model.Client;
import hr.student.EmiBank.model.Token;
import hr.student.EmiBank.model.Users;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final BankManagerRepo bankManagerRepo;
    private final BankManagerService bankManagerService;
    private final TokenRepo tokenRepo;
    private final ClientRepo clientRepo;
    private final ClientService clientService;
    private final ClientMapper clientMapper;
    private final int accessTokenDuration = 1000*60*60*3;
    private final int refreshTokenDuration = 1000*60*60*24*20;
    private final JwtService jwtService;

    @Transactional
    public BankManagerAuthResponseDto authenticateBankManager(UserAuthRequestDto userAuthRequestDto) {
           Optional<BankManager> bankManager = bankManagerRepo.findByEmail(userAuthRequestDto.getEmail());

           if (bankManager.isPresent()){
               Users userObj = bankManager.get();

               if(passwordEncoder.matches(userAuthRequestDto.getPassword(), userObj.getPassword())){

                   Map<String,Object> authorities = new HashMap<>();
                   List<String> permissions = new ArrayList<>();

                   userObj.getAuthorities().forEach(
                           grantedAuthority -> permissions.add(grantedAuthority.getAuthority())
                   );

                   authorities.put("authorities",permissions);

                   String accessToken = jwtService.generateToken(authorities,userObj,accessTokenDuration);

                   Optional<Token> dbRefreshToken = tokenRepo.findByEmail(userObj.getEmail());
                   String refreshToken = jwtService.generateToken(authorities,userObj,refreshTokenDuration);
                   if(dbRefreshToken.isPresent()) dbRefreshToken.get().setRefreshToken(refreshToken);
                   else{
                       Token token = new Token();
                       token.setRefreshToken(refreshToken);
                       token.setEmail(userObj.getEmail());
                       tokenRepo.save(token);
                   }

                   return new BankManagerAuthResponseDto(refreshToken,accessToken,bankManagerService.getBankManagerDetails(userObj.getEmail()));
               }
           }
           return null;
    }

    @Transactional
    public ClientAuthResponseDto authenticateClient(UserAuthRequestDto userAuthRequestDto) {
        Optional<Client> client = clientRepo.findByEmail(userAuthRequestDto.getEmail());

        if (client.isPresent()){
            Users userObj = client.get();

            if(passwordEncoder.matches(userAuthRequestDto.getPassword(), userObj.getPassword())){

                Map<String,Object> authorities = new HashMap<>();
                List<String> permissions = new ArrayList<>();

                userObj.getAuthorities().forEach(
                        grantedAuthority -> permissions.add(grantedAuthority.getAuthority())
                );

                authorities.put("authorities",permissions);

                String accessToken = jwtService.generateToken(authorities,userObj,accessTokenDuration);

                Optional<Token> dbRefreshToken = tokenRepo.findByEmail(userObj.getEmail());
                String refreshToken = jwtService.generateToken(authorities,userObj,refreshTokenDuration);;
                if(dbRefreshToken.isPresent()) dbRefreshToken.get().setRefreshToken(refreshToken);
                else{
                    Token token = new Token();
                    token.setRefreshToken(refreshToken);
                    token.setEmail(userObj.getEmail());
                    tokenRepo.save(token);
                }


                return new ClientAuthResponseDto(refreshToken,accessToken,clientMapper.map(clientService.getClientDetails(userObj.getEmail())));
            }
        }
        return null;
    }

    public EmailResponseDto getEmail(TokenDto tokenDto) {
        Optional<Token> dbToken = tokenRepo.findByRefreshToken(tokenDto.getToken());
        if(dbToken.isPresent()){
            return new EmailResponseDto(dbToken.get().getEmail());
        }
        return null;
    }
    @Transactional
    public IfResponseDto checkBankManagerEmail(String email) {
        Optional<BankManager> bankManager = bankManagerRepo.findByEmail(email);
        return new IfResponseDto(bankManager.isPresent());
    }

    @Transactional
    public IfResponseDto checkClientEmail(String email) {
        Optional<Client> client = clientRepo.findByEmail(email);
        return new IfResponseDto(client.isPresent());
    }
}
