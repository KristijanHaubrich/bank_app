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
    public Boolean isAmountToBigForTransaction(Double amount,String currency) throws Exception{
        if(!currency.equals("USD")) return new ExchangeRate().exchangeRate(currency,"USD",amount) > 10000;
        return amount > 10000;
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
        BigDecimal realAmount = new BigDecimal(amount).setScale(2, RoundingMode.HALF_DOWN);

        if(!fromAccount.isPresent() || isAmountToBigForTransaction(realAmount.doubleValue(), transaction.getCurrency())) return new IfResponseDto(false);

        BigDecimal rounding = new BigDecimal(amount).setScale(2, RoundingMode.HALF_DOWN);
        Double transAmount = rounding.doubleValue();
        if(BigDecimal.valueOf(transAmount).scale() > 2){
            return new IfResponseDto(false);
        }


        Double toAmount = transAmount;
        Double fromAmount = transAmount;

        if(!transaction.getCurrency().equals(fromAccount.get().getCurrency())){
            fromAmount = converter.exchangeRate(transaction.getCurrency(),fromAccount.get().getCurrency(),transAmount);
            rounding = new BigDecimal(String.valueOf(fromAmount)).setScale(2, RoundingMode.HALF_DOWN);
            fromAmount = rounding.doubleValue();
        }

        if(toAccount.isPresent()){
            if(!transaction.getCurrency().equals(toAccount.get().getCurrency())){
                toAmount = converter.exchangeRate(transaction.getCurrency(),toAccount.get().getCurrency(),transAmount);
                rounding = new BigDecimal(String.valueOf(toAmount)).setScale(2, RoundingMode.HALF_DOWN);
                toAmount = rounding.doubleValue();
            }
        }

        if(isTransactionPossible(fromAccount.get(), fromAmount)){
            rounding = new BigDecimal(String.valueOf(fromAccount.get().getBalance()-fromAmount)).setScale(2,RoundingMode.HALF_DOWN);
            if (BigDecimal.valueOf(rounding.doubleValue()).scale() > 2){
                return new IfResponseDto(false);
            }
            fromAccount.get().setBalance(rounding.doubleValue());

            if(checkIfCreditCard(fromAccount.get().getAccNum())){
                Optional<CreditCard> fromCard = creditCardRepo.findByCardNum(fromAccount.get().getCreditCard().getCardNum());
                if (fromCard.isPresent()){
                    fromCard.get().setBalance(rounding.doubleValue());
                }
            }

            Transaction transactionFromAccount = Transaction.builder()
                    .account(fromAccount.get())
                    .transactionType(transaction.getTransactionType())
                    .amount(realAmount.doubleValue())
                    .currency(transaction.getCurrency())
                    .toAccNum(transaction.getToAccNum())
                    .date(date)
                    .fromAccNum(transaction.getFromAccNum())
                    .build();


            transactionRepo.save(transactionFromAccount);

            if(toAccount.isPresent()){
                rounding = new BigDecimal(String.valueOf(toAccount.get().getBalance()+toAmount)).setScale(2,RoundingMode.HALF_DOWN);
                if (BigDecimal.valueOf(rounding.doubleValue()).scale() > 2){
                    return new IfResponseDto(false);
                }
                toAccount.get().setBalance(rounding.doubleValue());

                if(checkIfCreditCard(toAccount.get().getAccNum())){
                    Optional<CreditCard> toCard = creditCardRepo.findByCardNum(toAccount.get().getCreditCard().getCardNum());
                    if (toCard.isPresent()){
                        toCard.get().setBalance(rounding.doubleValue());
                    }
                }

                Transaction transactionToAccount = Transaction.builder()
                        .account(toAccount.get())
                        .transactionType(transaction.getTransactionType())
                        .amount(realAmount.doubleValue())
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

        String amount = transaction.getAmount();
        BigDecimal realAmount = new BigDecimal(amount).setScale(2, RoundingMode.HALF_DOWN);

        BigDecimal rounding = new BigDecimal(amount).setScale(2, RoundingMode.HALF_DOWN);
        Double transAmount = rounding.doubleValue();

        if(!toAccount.isPresent() || isAmountToBigForTransaction(transAmount,transaction.getCurrency())) return new IfResponseDto(false);

        if (transaction.getTransactionType().equals("top up balance")){
            rounding = new BigDecimal(String.valueOf(toAccount.get().getBalance() + transAmount)).setScale(2,RoundingMode.HALF_DOWN);
            if (BigDecimal.valueOf(rounding.doubleValue()).scale() > 2){
                return new IfResponseDto(false);
            }
            toAccount.get().setBalance(rounding.doubleValue());
            if(toAccount.get().getCreditCard() != null){
                Optional<CreditCard> toCard = creditCardRepo.findByCardNum(toAccount.get().getCreditCard().getCardNum());
                if (toCard.isPresent()){
                    toCard.get().setBalance(rounding.doubleValue());
                }
            }
            Transaction transactionToAccount = Transaction.builder()
                    .account(toAccount.get())
                    .transactionType(transaction.getTransactionType())
                    .amount(realAmount.doubleValue())
                    .currency(transaction.getCurrency())
                    .toAccNum(transaction.getToAccNum())
                    .date(date)
                    .fromAccNum(transaction.getFromAccNum())
                    .build();

            transactionRepo.save(transactionToAccount);
            return new IfResponseDto(true);
        }

        if (transaction.getTransactionType().equals("withdrawal") && isTransactionPossible(toAccount.get(),transAmount)){
            rounding = new BigDecimal(String.valueOf(toAccount.get().getBalance() - transAmount)).setScale(2,RoundingMode.HALF_DOWN);
            if (BigDecimal.valueOf(rounding.doubleValue()).scale() > 2){
                return new IfResponseDto(false);
            }
            toAccount.get().setBalance(rounding.doubleValue());
            if(toAccount.get().getCreditCard() != null){
                Optional<CreditCard> toCard = creditCardRepo.findByCardNum(toAccount.get().getCreditCard().getCardNum());
                if(toCard.get().getCardLimit() <= transAmount){
                    toCard.get().setBalance(rounding.doubleValue());
                }
            }
            Transaction transactionToAccount = Transaction.builder()
                    .account(toAccount.get())
                    .transactionType(transaction.getTransactionType())
                    .amount(realAmount.doubleValue())
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
