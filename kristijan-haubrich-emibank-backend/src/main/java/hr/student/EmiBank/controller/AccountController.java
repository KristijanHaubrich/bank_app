package hr.student.EmiBank.controller;

import hr.student.EmiBank.Mapper.AccountMapper;
import hr.student.EmiBank.dtos.request.NewAccountDto;
import hr.student.EmiBank.dtos.response.AccountData;
import hr.student.EmiBank.dtos.response.AccountResponseDto;
import hr.student.EmiBank.dtos.response.CheckForCreditCardResponse;
import hr.student.EmiBank.dtos.response.IfResponseDto;
import hr.student.EmiBank.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/accounts/")
public class AccountController {
    private final AccountService accountService;
    private final AccountMapper accountMapper;
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<AccountData> getAllAccounts(){
        return accountService.getAllAccounts();
    }
    @GetMapping("{accNum}")
    @PreAuthorize("hasAuthority('GET_ACCOUNT_DETAILS')")
    public AccountResponseDto getAccountDetails(@PathVariable String accNum){
        return accountService.sendAccountDetails(accNum);
    }
    @GetMapping("checkAccount/{accNum}")
    @PreAuthorize("hasAnyRole('BANK_MANAGER','ADMIN','CLIENT')")
    public IfResponseDto checkAccount(@PathVariable String accNum){
        return accountService.checkAccount(accNum);
    }

    @GetMapping("checkForCreditCard/{accNum}")
    @PreAuthorize("hasAnyRole('BANK_MANAGER','ADMIN','CLIENT')")
    public CheckForCreditCardResponse checkForCreditCard(@PathVariable String accNum){
        return accountService.checkForCreditCard(accNum);
    }
    @PostMapping
    @PreAuthorize("hasAuthority('CREATE_ACCOUNT')")
    public IfResponseDto createAccount(@RequestBody NewAccountDto newAccountDto){
        return accountService.createAccount(newAccountDto);
    }

    @DeleteMapping("{accNum}")
    @PostAuthorize("hasAuthority('DELETE_ACCOUNT')")
    public IfResponseDto deleteAccount(@PathVariable String accNum){
        return accountService.deleteAccount(accNum);
    }

}
