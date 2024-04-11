package hr.student.EmiBank.dtos.response;

import hr.student.EmiBank.model.CreditCard;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class CheckForCreditCardResponse {
    private boolean isPresent;
    private CreditCard creditCard;
}
