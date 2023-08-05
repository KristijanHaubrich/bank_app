package hr.student.EmiBank.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RoleDetailsResponseDto {
    private final String name;
    private final List<String> permissions;
    private final List<String> users;
}
