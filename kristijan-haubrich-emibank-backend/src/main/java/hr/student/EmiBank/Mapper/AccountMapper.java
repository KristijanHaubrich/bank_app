package hr.student.EmiBank.Mapper;

import hr.student.EmiBank.dtos.request.NewAccountDto;
import hr.student.EmiBank.dtos.response.AccountData;
import hr.student.EmiBank.dtos.response.AccountResponseDto;
import hr.student.EmiBank.model.Account;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    AccountData map(Account account);
    Account map(NewAccountDto newAccountDto);
}
