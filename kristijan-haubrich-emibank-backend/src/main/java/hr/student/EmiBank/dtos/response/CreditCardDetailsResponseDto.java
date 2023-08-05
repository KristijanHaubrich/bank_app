package hr.student.EmiBank.dtos.response;

import hr.student.EmiBank.model.Account;
import hr.student.EmiBank.model.Client;
import lombok.Data;

@Data
public class CreditCardDetailsResponseDto {
    private Account account;
    private Client ccClient;
    private String cardNum;
    private String cardType;
    private Double limit;
    private Double balance;
}
