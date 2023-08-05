package hr.student.EmiBank.dtos.request;

import hr.student.EmiBank.model.Permission;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class UserPermissionsDao {
    List<Permission> permissions;
}
