package hr.student.EmiBank.dtos.response;

import lombok.Data;

@Data
public class TransactionDetailsDto {
    private String fromAccNum;
    private String toAccNum;
    private String transactionType;
    private Double amount;
    private String date;
    private String currency;
}
