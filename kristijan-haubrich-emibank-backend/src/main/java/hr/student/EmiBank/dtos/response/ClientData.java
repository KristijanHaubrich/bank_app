package hr.student.EmiBank.dtos.response;

import hr.student.EmiBank.model.Account;
import hr.student.EmiBank.model.CreditCard;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class ClientData {
    private String name;
    private String email;
    private String address;
    private List<Account> accounts;
    private List<CreditCard> creditCards;
}
