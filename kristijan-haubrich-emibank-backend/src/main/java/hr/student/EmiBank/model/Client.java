package hr.student.EmiBank.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
@Table(name = "clients")
public class Client extends Users {

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "bank_manager_id")
    private BankManager bankManager;
    private String address;
    @JsonManagedReference
    @OneToMany(mappedBy="accClient")
    private List<Account> accounts;

    @JsonManagedReference
    @OneToMany(mappedBy="ccClient")
    private List<CreditCard> creditCards;

}