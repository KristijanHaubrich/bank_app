package hr.student.EmiBank.dtos.response;

import hr.student.EmiBank.model.Account;
import hr.student.EmiBank.model.BankManager;
import hr.student.EmiBank.model.CreditCard;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;


@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class ClientDetailsResponseDto {
    private ClientData clientData;
    private Boolean isFound;
}
