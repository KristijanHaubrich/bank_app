package hr.student.EmiBank.service;


import hr.student.EmiBank.Mapper.TransactionMapper;
import hr.student.EmiBank.dtos.request.TransactionRequestDto;
import hr.student.EmiBank.dtos.response.IfResponseDto;
import hr.student.EmiBank.dtos.response.TransactionDetailsDto;
import hr.student.EmiBank.jpa_repository.AccountRepo;
import hr.student.EmiBank.jpa_repository.CreditCardRepo;
import hr.student.EmiBank.jpa_repository.TransactionRepo;
import hr.student.EmiBank.model.Account;
import hr.student.EmiBank.model.CreditCard;
import hr.student.EmiBank.model.Transaction;
import hr.student.EmiBank.model.exchange_rates_model.ExchangeRate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionMapper transactionMapper;
    private final TransactionRepo transactionRepo;
    private final AccountRepo accountRepo;
    private final CreditCardRepo creditCardRepo;
    @Transactional(readOnly = true)
    public List<TransactionDetailsDto> getAllTransactions(){
        List<Transaction> transactions = transactionRepo.findAll();
        List<TransactionDetailsDto> transactionDetailsDtos = new ArrayList<>();
        if (!transactions.equals(null)){
            transactions.forEach(
                    transaction -> {
                        transactionDetailsDtos.add(transactionMapper.map(transaction));
                    }
            );
        }
        return transactionDetailsDtos;
    }
    @Transactional
    public Transaction getTransaction(Long id){
       return transactionRepo.findById(id)
               .orElseThrow(()-> new EntityNotFoundException("Transaction not found"));
    }

    @Transactional
    public Boolean checkIfCreditCard(String accNum) {
        Optional<Account> dbAccount = accountRepo.findByAccNum(accNum);
        if(dbAccount.isPresent()){
            Account account = dbAccount.get();
            CreditCard creditCard = account.getCreditCard();
            if(creditCard == null)return false;
            return true;
        }
        return false;
    }
    @Transactional
    public IfResponseDto executeTransactionBetweenAccounts(TransactionRequestDto transaction)throws Exception {

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String date = dtf.format(now);

        ExchangeRate converter = new ExchangeRate();
        Optional<Account> fromAccount = accountRepo.findByAccNum(transaction.getFromAccNum());
        Optional<Account> toAccount = accountRepo.findByAccNum(transaction.getToAccNum());

        String amount = transaction.getAmount();
        Double realAmount = Double.parseDouble(amount);

        if(!fromAccount.isPresent()) return new IfResponseDto(false);

        BigDecimal rounding = new BigDecimal(realAmount).setScale(2, RoundingMode.HALF_DOWN);
        Double transAmount = rounding.doubleValue();
        System.out.println("transAmount");
        System.out.println(BigDecimal.valueOf(transAmount).scale() > 2);
        if(BigDecimal.valueOf(transAmount).scale() > 2) return new IfResponseDto(false);


        Double toAmount = transAmount;
        Double fromAmount = transAmount;

        if(!transaction.getCurrency().equals(fromAccount.get().getCurrency())){
            fromAmount = converter.exchangeRate(transaction.getCurrency(),fromAccount.get().getCurrency(),transAmount);
            rounding = new BigDecimal(fromAmount).setScale(2, RoundingMode.HALF_DOWN);
            fromAmount = rounding.doubleValue();
        }
        if (BigDecimal.valueOf(fromAccount.get().getBalance()-fromAmount).scale() > 2)return new IfResponseDto(false);


        if(toAccount.isPresent()){
            if(!transaction.getCurrency().equals(toAccount.get().getCurrency())){
                toAmount = converter.exchangeRate(transaction.getCurrency(),toAccount.get().getCurrency(),transAmount);
                rounding = new BigDecimal(toAmount).setScale(2, RoundingMode.HALF_DOWN);
                toAmount = rounding.doubleValue();
            }
            if (BigDecimal.valueOf(toAccount.get().getBalance()+toAmount).scale() > 2)return new IfResponseDto(false);
        }

        if(isTransactionPossible(fromAccount.get(), fromAmount)){
            fromAccount.get().setBalance(fromAccount.get().getBalance()-fromAmount);

            if(checkIfCreditCard(fromAccount.get().getAccNum())){
                Optional<CreditCard> fromCard = creditCardRepo.findByCardNum(fromAccount.get().getCreditCard().getCardNum());
                if (fromCard.isPresent()){
                    fromCard.get().setBalance(fromAccount.get().getBalance()-fromAmount);
                }
            }

            Transaction transactionFromAccount = Transaction.builder()
                    .account(fromAccount.get())
                    .transactionType(transaction.getTransactionType())
                    .amount(realAmount)
                    .currency(transaction.getCurrency())
                    .toAccNum(transaction.getToAccNum())
                    .date(date)
                    .fromAccNum(transaction.getFromAccNum())
                    .build();


            transactionRepo.save(transactionFromAccount);

            if(toAccount.isPresent()){
                toAccount.get().setBalance(toAccount.get().getBalance()+toAmount);

                if(checkIfCreditCard(toAccount.get().getAccNum())){
                    Optional<CreditCard> toCard = creditCardRepo.findByCardNum(toAccount.get().getCreditCard().getCardNum());
                    if (toCard.isPresent()){
                        toCard.get().setBalance(toAccount.get().getBalance()+toAmount);
                    }
                }

                Transaction transactionToAccount = Transaction.builder()
                        .account(toAccount.get())
                        .transactionType(transaction.getTransactionType())
                        .amount(realAmount)
                        .date(date)
                        .currency(transaction.getCurrency())
                        .toAccNum(transaction.getToAccNum())
                        .fromAccNum(transaction.getFromAccNum())
                        .build();

                transactionRepo.save(transactionToAccount);
            }
            return new IfResponseDto(true);
        }
        return new IfResponseDto(false);
    }
    @Transactional
    public IfResponseDto executeInternalAccountTransaction(TransactionRequestDto transaction)throws Exception{
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String date = dtf.format(now);

        Optional<Account> toAccount = accountRepo.findByAccNum(transaction.getToAccNum());

        if(!toAccount.isPresent()) return new IfResponseDto(false);

        String amount = transaction.getAmount();
        Double realAmount = Double.parseDouble(amount);

        BigDecimal rounding = new BigDecimal(realAmount).setScale(2, RoundingMode.HALF_DOWN);
        Double transAmount = rounding.doubleValue();
        if(BigDecimal.valueOf(toAccount.get().getBalance() + transAmount).scale() > 2 || BigDecimal.valueOf(toAccount.get().getBalance() - transAmount).scale() > 2 ) return new IfResponseDto(false);

        if (transaction.getTransactionType().equals("top up balance")){
            toAccount.get().setBalance(toAccount.get().getBalance() + transAmount);
            if(toAccount.get().getCreditCard() != null){
                Optional<CreditCard> toCard = creditCardRepo.findByCardNum(toAccount.get().getCreditCard().getCardNum());
                if (toCard.isPresent()){
                    toCard.get().setBalance(toCard.get().getBalance() + transAmount);
                }
            }
            Transaction transactionToAccount = Transaction.builder()
                    .account(toAccount.get())
                    .transactionType(transaction.getTransactionType())
                    .amount(realAmount)
                    .currency(transaction.getCurrency())
                    .toAccNum(transaction.getToAccNum())
                    .date(date)
                    .fromAccNum(transaction.getFromAccNum())
                    .build();

            transactionRepo.save(transactionToAccount);
            return new IfResponseDto(true);
        }

        if (transaction.getTransactionType().equals("withdrawal") && isTransactionPossible(toAccount.get(),transAmount)){
            toAccount.get().setBalance(toAccount.get().getBalance() - transAmount);
            if(toAccount.get().getCreditCard() != null){
                Optional<CreditCard> toCard = creditCardRepo.findByCardNum(toAccount.get().getCreditCard().getCardNum());
                if(toCard.get().getCardLimit() <= transAmount){
                    toCard.get().setBalance(toCard.get().getBalance() - transAmount);
                }
            }
            Transaction transactionToAccount = Transaction.builder()
                    .account(toAccount.get())
                    .transactionType(transaction.getTransactionType())
                    .amount(realAmount)
                    .currency(transaction.getCurrency())
                    .toAccNum(transaction.getToAccNum())
                    .date(date)
                    .fromAccNum(transaction.getFromAccNum())
                    .build();

            transactionRepo.save(transactionToAccount);
            return new IfResponseDto(true);
        }

        return new IfResponseDto(false);
    }
    @Transactional
    public Boolean isTransactionPossible(Account account, Double amount)throws Exception{
        ExchangeRate converter = new ExchangeRate();

        Double balanceAfterTransaction = account.getBalance()-amount;
        if(!account.getCurrency().equals("USD")){
            balanceAfterTransaction = converter.exchangeRate(account.getCurrency(),"USD" ,balanceAfterTransaction);
        }

        return balanceAfterTransaction > -1000D;
    }

    @Transactional
    public void addNewTransaction(Transaction transaction){
            transactionRepo.save(transaction);
    }

    @Transactional
    public void deleteTransaction(Long transactionId){
        transactionRepo.deleteById(transactionId);
    }
}
