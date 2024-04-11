package hr.student.EmiBank.controller;


import hr.student.EmiBank.Mapper.TransactionMapper;
import hr.student.EmiBank.dtos.request.TransactionRequestDto;
import hr.student.EmiBank.dtos.response.IfResponseDto;
import hr.student.EmiBank.dtos.response.TransactionDetailsDto;
import hr.student.EmiBank.model.Transaction;
import hr.student.EmiBank.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions/")
public class TransactionController {

    private final TransactionService transactionService;

    private final TransactionMapper transactionMapper;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<TransactionDetailsDto> getAllTransactions(){
        return transactionService.getAllTransactions();
    }

    @GetMapping("{transactionId}")
    @PreAuthorize("hasAuthority('GET_TRANSACTION')")
    public TransactionDetailsDto  getTransaction(@PathVariable Long transactionId){
        return transactionMapper.map(transactionService.getTransaction(transactionId));
    }

    @PostMapping("executeBetweenAccountsTransaction")
    @PreAuthorize("hasAuthority('BETWEEN_ACC_TRANSACTION')")
    public IfResponseDto executeBetweenAccountsTransaction(@RequestBody TransactionRequestDto transactionRequestDto) throws Exception{
        return transactionService.executeTransactionBetweenAccounts(transactionRequestDto);
    }

    @PostMapping("executeInternalAccountTransaction")
    @PreAuthorize("hasAuthority('INTERNAL_ACC_TRANSACTION')")
    public IfResponseDto executeInternalAccountTransaction(@RequestBody TransactionRequestDto transactionRequestDto) throws Exception {
       return transactionService.executeInternalAccountTransaction(transactionRequestDto);
    }

    @DeleteMapping("{transactionId}")
    @PreAuthorize("hasAuthority('DELETE_TRANSACTION')")
    public void deleteTransaction(@PathVariable Long transactionId){
       transactionService.deleteTransaction(transactionId);
    }

}
