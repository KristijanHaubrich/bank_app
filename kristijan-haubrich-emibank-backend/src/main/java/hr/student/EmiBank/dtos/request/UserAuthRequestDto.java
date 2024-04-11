package hr.student.EmiBank.dtos.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserAuthRequestDto {
    private String password;
    private String email;
}
