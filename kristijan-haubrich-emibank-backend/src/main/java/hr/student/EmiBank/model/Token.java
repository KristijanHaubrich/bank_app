package hr.student.EmiBank.model;

import lombok.*;

import javax.persistence.*;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "tokens")
public class Token {
    @Id
    private String email;
    private String refreshToken;
}
