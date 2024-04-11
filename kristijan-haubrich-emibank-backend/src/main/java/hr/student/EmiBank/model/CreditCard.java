package hr.student.EmiBank.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "credit_cards")
public class CreditCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonManagedReference
    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client ccClient;
    private String cardNum;
    private String cardType;
    private Double cardLimit;
    private Double balance;

}