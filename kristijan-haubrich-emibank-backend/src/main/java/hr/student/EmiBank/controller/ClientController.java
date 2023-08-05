package hr.student.EmiBank.controller;

import hr.student.EmiBank.Mapper.ClientMapper;
import hr.student.EmiBank.dtos.request.*;
import hr.student.EmiBank.dtos.response.ClientData;
import hr.student.EmiBank.dtos.response.ClientDetailsResponseDto;
import hr.student.EmiBank.dtos.response.IfResponseDto;
import hr.student.EmiBank.dtos.response.TokenDto;
import hr.student.EmiBank.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clients/")
public class ClientController {
    private final ClientService clientService;
    private final ClientMapper clientMapper;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<ClientData> getAllClients(){
        return clientService.getAllClients();
    }

    @GetMapping("{clientEmail}")
    @PreAuthorize("hasAuthority('GET_CLIENT_DETAILS')")
    public ClientDetailsResponseDto getClientDetails(@PathVariable String clientEmail){
        return clientService.sendClientDetails(clientEmail);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADD_NEW_CLIENT')")
    public void addNewCLient(@RequestBody NewClientRequestDto newClientRequestDto){
        clientService.addNewClient(newClientRequestDto);
    }

    @PostMapping("checkPassword")
    @PreAuthorize("hasAnyRole('BANK_MANAGER','ADMIN','CLIENT')")
    public IfResponseDto checkPassword(@RequestBody CheckPasswordDto checkPasswordDto){
        return clientService.checkPassword(checkPasswordDto);
    }

    @PatchMapping("changePassword")
    @PreAuthorize("hasAuthority('CHANGE_CLIENT_PASSWORD')")
    public void changePassword(@RequestBody UserChangePasswordRequestDto userChangePasswordRequestDto){
        clientService.changePassword(userChangePasswordRequestDto);
    }

    @PatchMapping("changeEmail")
    @PreAuthorize("hasAuthority('CHANGE_CLIENT_EMAIL')")
    public void changeEmail(@RequestBody UserChangeEmailRequestDto userChangeEmailRequestDto){
        clientService.changeEmail(userChangeEmailRequestDto);
    }

    @DeleteMapping("{clientEmail}")
    @PreAuthorize("hasAuthority('DELETE_CLIENT')")
    public IfResponseDto deleteClient(@PathVariable String clientEmail){
        return clientService.deleteClient(clientEmail);
    }

    @GetMapping("getAccessToken/{email}")
    @PreAuthorize("hasAnyRole('CLIENT')")
    public TokenDto getAccessToken(@PathVariable String email){
        return clientService.getAccessToken(email);
    }
}
