package hr.student.EmiBank.dtos.request;

import lombok.Data;

@Data
public class UserChangePasswordRequestDto {
    private String password;
    private String email;
}
