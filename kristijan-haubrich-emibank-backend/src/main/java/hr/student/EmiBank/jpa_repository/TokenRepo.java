package hr.student.EmiBank.jpa_repository;

import hr.student.EmiBank.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepo extends JpaRepository<Token,String> {
    Optional<Token> findByEmail(String email);
    Optional<Token> findByRefreshToken(String token);
}

