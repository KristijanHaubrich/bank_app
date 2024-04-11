package hr.student.EmiBank.controller;


import hr.student.EmiBank.Mapper.CreditCardMapper;
import hr.student.EmiBank.dtos.request.NewCreditCardDto;
import hr.student.EmiBank.dtos.response.CreditCardDetailsResponseDto;
import hr.student.EmiBank.dtos.response.IfResponseDto;
import hr.student.EmiBank.service.CreditCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/credit_cards/")
public class CreditCardController {
    private final CreditCardService creditCardService;
    private final CreditCardMapper creditCardMapper;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<CreditCardDetailsResponseDto> getAllCreditCards(){
        return creditCardService.getAllCreditCards();
    }

    @GetMapping("{cardNum}")
    @PreAuthorize("hasAuthority('GET_CREDIT_CARD_DETAILS')")
    public CreditCardDetailsResponseDto getCreditCardDetails(@PathVariable String cardNum){
        return creditCardMapper.map(creditCardService.getCreditCardDetails(cardNum));
    }

    @GetMapping("checkCreditCard/{cardNum}")
    @PreAuthorize("hasAnyRole('BANK_MANAGER','ADMIN')")
    public IfResponseDto checkCreditCard(@PathVariable String cardNum){
        return creditCardService.checkCreditCard(cardNum);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('CREATE_CREDIT_CARD')")
    public IfResponseDto createCreditCard(@RequestBody NewCreditCardDto newCreditCardDto){
        return creditCardService.createCreditCard(newCreditCardDto);
    }

}

