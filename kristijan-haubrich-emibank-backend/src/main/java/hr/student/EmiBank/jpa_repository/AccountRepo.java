package hr.student.EmiBank.jpa_repository;

import hr.student.EmiBank.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepo extends JpaRepository<Account,Long> {
    Optional<Account> findByAccNum(String accNum);
}
