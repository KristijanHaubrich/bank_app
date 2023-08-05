package hr.student.EmiBank.dtos.response;

import lombok.Data;

import java.util.List;

@Data
public class BankManagerDetailsResponseDto {
    private final String name;
    private final List<String> clients;
    private final String email;

}
