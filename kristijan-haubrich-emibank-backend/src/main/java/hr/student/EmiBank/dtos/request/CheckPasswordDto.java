package hr.student.EmiBank.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class CheckPasswordDto {
    private String password;
    private String email;
}
