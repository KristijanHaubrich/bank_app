package hr.student.EmiBank.dtos.request;

import hr.student.EmiBank.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class BankManagerRequestDto {
    private String name;
    private String password;
    private String bankManagerRole;
    private String email;

}
