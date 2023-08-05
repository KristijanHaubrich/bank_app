package hr.student.EmiBank.Mapper;

import hr.student.EmiBank.dtos.request.BankManagerRequestDto;
import hr.student.EmiBank.model.BankManager;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BankManagerMapper {
    BankManager map(BankManagerRequestDto bankManagerRequestDto);
}
