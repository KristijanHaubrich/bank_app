package hr.student.EmiBank.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
public class AddNewPermissionsRequest {
    List<String> permissions;
}
