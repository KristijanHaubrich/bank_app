package hr.student.EmiBank.dtos.response;

import hr.student.EmiBank.model.Client;
import hr.student.EmiBank.model.CreditCard;
import hr.student.EmiBank.model.Transaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class AccountResponseDto {
    private AccountData accountData;
    private Boolean isFound;
}
