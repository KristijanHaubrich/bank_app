package hr.student.EmiBank.dtos.request;

import lombok.Data;

@Data
public class UserChangeEmailRequestDto {
    String oldEmail;
    String newEmail;
}
