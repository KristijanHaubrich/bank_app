package hr.student.EmiBank.dtos.request;

import lombok.Data;

@Data
public class NewAccountDto {
    private String accNum;
    private String accType;
    private Double balance;
    private String currency;
    private String clientEmail;
}
