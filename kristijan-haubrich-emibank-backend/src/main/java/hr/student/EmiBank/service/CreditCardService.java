package hr.student.EmiBank.service;

import hr.student.EmiBank.Mapper.CreditCardMapper;
import hr.student.EmiBank.dtos.request.NewCreditCardDto;
import hr.student.EmiBank.dtos.response.CreditCardDetailsResponseDto;
import hr.student.EmiBank.dtos.response.IfResponseDto;
import hr.student.EmiBank.jpa_repository.CreditCardRepo;
import hr.student.EmiBank.model.Account;
import hr.student.EmiBank.model.Client;
import hr.student.EmiBank.model.CreditCard;
import kotlin.OptIn;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreditCardService {
    private final CreditCardRepo creditCardRepo;
    private final AccountService accountService;
    private final ClientService clientService;
    private final CreditCardMapper mapper;

    @Transactional
    public List<CreditCardDetailsResponseDto> getAllCreditCards() {
        List<CreditCard> creditCards = creditCardRepo.findAll();
        List<CreditCardDetailsResponseDto> creditCardDetailsResponseDtos = new ArrayList<>();
        if (creditCards != null){
            creditCards.forEach(
                    creditCard -> creditCardDetailsResponseDtos.add(mapper.map(creditCard))
            );
        }
        return creditCardDetailsResponseDtos;
    }
    @Transactional
    public CreditCard getCreditCard(Long id){
        return creditCardRepo.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Credit card not found"));
    }
    @Transactional
    public void addNewCreditCard(CreditCard creditCard){
        creditCardRepo.save(creditCard);
    }

    @Transactional
    public CreditCard getCreditCardDetails(String cardNum) {
        return creditCardRepo
                .findByCardNum(cardNum)
                .orElseThrow(()-> new EntityNotFoundException("Credit card not found"));

    }
    @Transactional
    public IfResponseDto createCreditCard(NewCreditCardDto newCreditCardDto) {
        Account account = accountService.getAccountDetails(newCreditCardDto.getAccountNum());
        Client client = clientService.getClientDetails(newCreditCardDto.getCcClientEmail());

        if(!account.equals(null) && !client.equals(null)){
            CreditCard creditCard = CreditCard.builder()
                    .account(account)
                    .ccClient(client)
                    .cardType(newCreditCardDto.getCardType())
                    .cardNum(newCreditCardDto.getCardNum())
                    .cardLimit(newCreditCardDto.getLimit())
                    .balance(account.getBalance())
                    .build();
            creditCardRepo.save(creditCard);

            return new IfResponseDto(true);
        }

        return new IfResponseDto(false);
    }

    public IfResponseDto checkCreditCard(String cardNum) {
        Optional<CreditCard> dbCreditCard = creditCardRepo.findByCardNum(cardNum);
        if(dbCreditCard.isPresent()) return new IfResponseDto(true);
        return new IfResponseDto(false);
    }
}
