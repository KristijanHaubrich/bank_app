package hr.student.EmiBank.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "accounts")
public class Account{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String accNum;
    private String accType;
    private Double balance;
    private String currency;

    @JsonBackReference
    @OneToOne(mappedBy = "account",cascade = CascadeType.ALL,orphanRemoval = true)
    private CreditCard creditCard;

    @JsonManagedReference
    @OneToMany(mappedBy="account")
    private List<Transaction> transactions;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "client_id",nullable = false)
    private Client accClient;
}
