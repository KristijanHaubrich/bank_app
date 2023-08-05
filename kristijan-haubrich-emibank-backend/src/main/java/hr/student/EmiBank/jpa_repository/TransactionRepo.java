package hr.student.EmiBank.jpa_repository;

import hr.student.EmiBank.model.Account;
import hr.student.EmiBank.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepo extends JpaRepository<Transaction,Long> {
    List<Transaction> findByAccount(Account account);
}
