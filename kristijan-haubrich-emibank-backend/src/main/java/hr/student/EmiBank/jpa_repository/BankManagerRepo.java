package hr.student.EmiBank.jpa_repository;

import hr.student.EmiBank.model.BankManager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BankManagerRepo extends JpaRepository<BankManager,Long>
{
    Optional<BankManager> findByEmail(String Email);
}
