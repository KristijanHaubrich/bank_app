package hr.student.EmiBank.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientAuthResponseDto {
    private String refreshToken;
    private String accessToken;
    private ClientData clientDetailsResponseDto;
}
