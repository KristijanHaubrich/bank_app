package hr.student.EmiBank.Mapper;

import hr.student.EmiBank.dtos.response.CreditCardDetailsResponseDto;
import hr.student.EmiBank.model.CreditCard;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CreditCardMapper {
    CreditCardDetailsResponseDto map(CreditCard creditCard);
}
