package hr.student.EmiBank.jpa_repository;

import hr.student.EmiBank.model.BankManager;
import hr.student.EmiBank.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClientRepo extends JpaRepository<Client,Long>{
    Optional<Client> findByEmail(String Email);
}