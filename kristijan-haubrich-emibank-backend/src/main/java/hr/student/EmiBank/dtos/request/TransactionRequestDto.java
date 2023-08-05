package hr.student.EmiBank.dtos.request;

import hr.student.EmiBank.model.Account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class TransactionRequestDto {
    private String fromAccNum;
    private String toAccNum;
    private String transactionType;
    private String amount;
    private String currency;
}
