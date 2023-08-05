package hr.student.EmiBank.dtos.request;

import hr.student.EmiBank.model.Account;
import hr.student.EmiBank.model.Client;
import lombok.Data;

@Data
public class NewCreditCardDto {
    private String accountNum;
    private String ccClientEmail;
    private String cardNum;
    private String cardType;
    private Double limit;
}
