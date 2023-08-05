package hr.student.EmiBank.Mapper;

import hr.student.EmiBank.dtos.request.TransactionRequestDto;
import hr.student.EmiBank.dtos.response.TransactionDetailsDto;
import hr.student.EmiBank.model.Transaction;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    Transaction map(TransactionRequestDto transactionRequestDto);
    TransactionDetailsDto map(Transaction transaction);
}
