package hr.student.EmiBank.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.jetbrains.annotations.Nullable;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "account_id",nullable = false)
    private Account account;
    private String fromAccNum;
    private String date;
    private String toAccNum;
    private String transactionType;
    private Double amount;
    private String currency;


}