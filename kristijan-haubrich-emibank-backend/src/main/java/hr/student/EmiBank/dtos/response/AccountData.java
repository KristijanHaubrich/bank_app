package hr.student.EmiBank.dtos.response;

import hr.student.EmiBank.model.Client;
import hr.student.EmiBank.model.CreditCard;
import hr.student.EmiBank.model.Transaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class AccountData {
    private String accNum;
    private String accType;
    private Double balance;
    private String currency;
    private CreditCard creditCard;
    private List<Transaction> transactions;
    private Client accClient;
}
