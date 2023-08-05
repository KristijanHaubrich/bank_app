package hr.student.EmiBank.jpa_repository;

import hr.student.EmiBank.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermissionRepo extends JpaRepository<Permission,Long> {
    Optional<Permission> findByName(String name);
}
