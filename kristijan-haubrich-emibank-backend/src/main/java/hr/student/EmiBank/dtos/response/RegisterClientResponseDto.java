package hr.student.EmiBank.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class RegisterClientResponseDto {
    private Boolean isSuccess;
    private Boolean clientAlreadyExists;
    private Boolean bankManagerExists;
}
