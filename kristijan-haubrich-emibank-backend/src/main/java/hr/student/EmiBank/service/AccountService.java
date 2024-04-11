package hr.student.EmiBank.service;

import hr.student.EmiBank.Mapper.AccountMapper;
import hr.student.EmiBank.dtos.request.NewAccountDto;
import hr.student.EmiBank.dtos.response.*;
import hr.student.EmiBank.jpa_repository.AccountRepo;
import hr.student.EmiBank.jpa_repository.ClientRepo;
import hr.student.EmiBank.model.Account;
import hr.student.EmiBank.model.Client;
import hr.student.EmiBank.model.CreditCard;
import hr.student.EmiBank.model.Transaction;
import lombok.RequiredArgsConstructor;
import org.aspectj.apache.bcel.classfile.Module;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.AbstractCollection;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepo accountRepo;
    private final ClientRepo clientRepo;
    private final AccountMapper accountMapper;
    @Transactional
    public List<AccountData> getAllAccounts(){
        List<Account> accounts = accountRepo.findAll();
        List<AccountData> accountsResponse = new ArrayList<>();
        if (accounts != null){
            accounts.forEach(
                    account -> accountsResponse.add(accountMapper.map(account))
            );
        }
        return accountsResponse;
    }
    @Transactional
    public Account getAccountDetails(String accNum) {
        Optional<Account> dbaccount = accountRepo.findByAccNum(accNum);
        return dbaccount.get();
    }

    @Transactional
    public AccountResponseDto sendAccountDetails(String accNum) {
        Optional<Account> dbAccount = accountRepo.findByAccNum(accNum);
        if(dbAccount.isPresent()){
            AccountData accountData = accountMapper.map(dbAccount.get());
            return new AccountResponseDto(accountData,true);
        }
        return new AccountResponseDto(null,false);
    }
    @Transactional
    public IfResponseDto checkAccount(String accNum){
        Optional<Account> dbAccount = accountRepo.findByAccNum(accNum);
        if(dbAccount.isPresent()) return new IfResponseDto(true);
        return new IfResponseDto(false);
    }


    @Transactional
    public IfResponseDto deleteAccount(String accNum) {
        Optional<Account> account = accountRepo.findByAccNum(accNum);
        account.ifPresent(
                accountRepo::delete
        );
        Optional<Account> checkAccount = accountRepo.findByAccNum(accNum);
        if(checkAccount.isPresent()) return new IfResponseDto(false);
        return new IfResponseDto(true);
    }
    @Transactional
    public IfResponseDto createAccount(NewAccountDto newAccountDto) {
        Optional<Client> dbClient = clientRepo.findByEmail(newAccountDto.getClientEmail());
        Optional<Account> dbAccount = accountRepo.findByAccNum(newAccountDto.getAccNum());
        if (dbClient.isPresent() && !dbAccount.isPresent()){
            Account account = accountMapper.map(newAccountDto);
            account.setAccClient(dbClient.get());
            accountRepo.save(account);

            Optional<Account> checkAccount = accountRepo.findByAccNum(newAccountDto.getAccNum());
            return new IfResponseDto(checkAccount.isPresent());
        }
        return new IfResponseDto(false);
    }
    @Transactional
    public CheckForCreditCardResponse checkForCreditCard(String accNum) {
        Optional<Account> dbAccount = accountRepo.findByAccNum(accNum);
        if(dbAccount.isPresent()){
            Account account = dbAccount.get();
            CreditCard creditCard = account.getCreditCard();
            if(creditCard == null)return new CheckForCreditCardResponse(false,null);
            return new CheckForCreditCardResponse(true,creditCard);
        }
        return new CheckForCreditCardResponse(false,null);
    }
}
