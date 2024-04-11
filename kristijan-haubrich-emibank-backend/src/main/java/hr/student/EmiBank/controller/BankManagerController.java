package hr.student.EmiBank.controller;

import hr.student.EmiBank.dtos.request.CheckPasswordDto;
import hr.student.EmiBank.dtos.request.UserChangeEmailRequestDto;
import hr.student.EmiBank.dtos.request.UserChangePasswordRequestDto;
import hr.student.EmiBank.dtos.request.BankManagerRequestDto;
import hr.student.EmiBank.dtos.response.BankManagerDetailsResponseDto;
import hr.student.EmiBank.dtos.response.IfResponseDto;
import hr.student.EmiBank.dtos.response.TokenDto;
import hr.student.EmiBank.service.BankManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bank_managers/")
public class BankManagerController {

    private final BankManagerService bankManagerService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<BankManagerDetailsResponseDto> getAllBankManagers(){
        return bankManagerService.getAllBankManagers();
    }

    @GetMapping("{bankManagerEmail}")
    @PreAuthorize("hasAuthority('GET_BANK_MANAGER_DETAILS')")
    public BankManagerDetailsResponseDto getBankManagerDetails(@PathVariable String bankManagerEmail){
        return bankManagerService.getBankManagerDetails(bankManagerEmail);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void addNewBankManager(@RequestBody BankManagerRequestDto bankManagerRequestDto){
        bankManagerService.addNewBankManager(bankManagerRequestDto);
    }
    @PostMapping("checkPassword")
    @PreAuthorize("hasAnyRole('BANK_MANAGER','ADMIN')")
    public IfResponseDto checkPassword(@RequestBody CheckPasswordDto checkPasswordDto){
        return bankManagerService.checkPassword(checkPasswordDto);
    }

    @PatchMapping("changePassword")
    @PreAuthorize("hasAuthority('CHANGE_BANK_MANAGER_PASSWORD')")
    public void changePassword(@RequestBody UserChangePasswordRequestDto userChangePasswordRequestDto){
        bankManagerService.changePassword(userChangePasswordRequestDto);
    }

    @GetMapping("getAccessToken/{email}")
    @PreAuthorize("hasAnyRole('BANK_MANAGER','ADMIN')")
    public TokenDto getAccessToken(@PathVariable String email){
        return bankManagerService.getAccessToken(email);
    }

    @PatchMapping("changeEmail")
    @PreAuthorize("hasAuthority('CHANGE_BANK_MANAGER_EMAIL')")
    public void changeEmail(@RequestBody UserChangeEmailRequestDto userChangeEmailRequestDto){
        bankManagerService.changeEmail(userChangeEmailRequestDto);
    }

    @DeleteMapping("{bankManagerEmail}")
    @PreAuthorize("hasAnyRole('ADMIN','BANK_MANAGER')")
    public IfResponseDto deleteBankManager(@PathVariable String bankManagerEmail){
        return bankManagerService.deleteBankManager(bankManagerEmail);
    }
}
