package hr.student.EmiBank.jpa_repository;

import hr.student.EmiBank.model.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CreditCardRepo extends JpaRepository<CreditCard,Long> {
    Optional<CreditCard> findByCardNum(String cardNum);
}
