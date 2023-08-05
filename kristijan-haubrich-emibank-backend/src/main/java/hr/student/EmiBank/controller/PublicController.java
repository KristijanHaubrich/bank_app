package hr.student.EmiBank.controller;

import hr.student.EmiBank.dtos.request.BankManagerRequestDto;
import hr.student.EmiBank.dtos.request.NewClientRequestDto;
import hr.student.EmiBank.dtos.request.UserAuthRequestDto;
import hr.student.EmiBank.dtos.response.*;
import hr.student.EmiBank.service.BankManagerService;
import hr.student.EmiBank.service.ClientService;
import hr.student.EmiBank.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/")
public class PublicController {
    private final BankManagerService bankManagerService;
    private final ClientService clientService;
    private final UserService userService;

    @PostMapping("authenticateBankManager")
    public BankManagerAuthResponseDto authenticateBankManager(@RequestBody UserAuthRequestDto userAuthRequestDto){
        return userService.authenticateBankManager(userAuthRequestDto);
    }
    @PostMapping("authenticateClient")
    public ClientAuthResponseDto authenticateClient(@RequestBody UserAuthRequestDto userAuthRequestDto){
        return userService.authenticateClient(userAuthRequestDto);
    }
    @PostMapping("register/bankManager")
    public RegisterBankManagerResponseDto registerBankManager(@RequestBody BankManagerRequestDto bankManagerRequestDto){
       return bankManagerService.addNewBankManager(bankManagerRequestDto);
    }
    @PostMapping("register/client")
    public RegisterClientResponseDto registerClient(@RequestBody NewClientRequestDto newClientRequestDto){
        return clientService.addNewClient(newClientRequestDto);
    }
    @PostMapping("getEmail")
    public EmailResponseDto getEmail(@RequestBody TokenDto tokenDto){
        return userService.getEmail(tokenDto);
    }

    @GetMapping("checkBankManagerEmail/{email}")
    public IfResponseDto checkBankManagerEmail(@PathVariable String email){
        return userService.checkBankManagerEmail(email);
    }

    @GetMapping("checkClientEmail/{email}")
    public IfResponseDto checkClientEmail(@PathVariable String email){
        return userService.checkClientEmail(email);
    }

}
