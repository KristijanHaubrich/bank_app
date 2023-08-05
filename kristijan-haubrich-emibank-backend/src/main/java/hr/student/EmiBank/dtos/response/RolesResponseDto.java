package hr.student.EmiBank.dtos.response;

import hr.student.EmiBank.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class RolesResponseDto {
    List<String> roles;
}
