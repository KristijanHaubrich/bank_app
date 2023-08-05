package hr.student.EmiBank;

import hr.student.EmiBank.auth.JwtService;
import hr.student.EmiBank.dtos.request.TransactionRequestDto;
import hr.student.EmiBank.dtos.response.TokenDto;
import hr.student.EmiBank.jpa_repository.PermissionRepo;
import hr.student.EmiBank.jpa_repository.RoleRepo;
import hr.student.EmiBank.jpa_repository.TokenRepo;
import hr.student.EmiBank.jpa_repository.UserRepo;
import hr.student.EmiBank.model.Token;
import hr.student.EmiBank.model.Users;
import hr.student.EmiBank.model.exchange_rates_model.ExchangeRate;
import hr.student.EmiBank.service.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Component
@RequiredArgsConstructor
public class BankCommandLineRunner implements CommandLineRunner {
    private final TokenRepo tokenRepo;
    private final UserService userService;
    private final JwtService jwtService;
    private final int token_duration = 1000*10;
    private final PermissionService permissionService;
    private final PermissionRepo permissionRepo;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final BankManagerService bankManagerService;
    private final RoleRepo roleRepo;
    private final RolesService rolesService;
    private final TransactionService transactionService;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
    }
}
