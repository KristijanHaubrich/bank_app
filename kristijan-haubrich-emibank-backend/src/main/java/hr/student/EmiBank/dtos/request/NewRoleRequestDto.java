package hr.student.EmiBank.dtos.request;

import hr.student.EmiBank.model.Permission;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
public class NewRoleRequestDto {
    String roleName;
    List<String> permissions;
}
