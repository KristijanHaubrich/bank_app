package hr.student.EmiBank.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
@Table(name = "bank_managers")
public class BankManager extends Users {
    @JsonManagedReference
    @OneToMany(mappedBy="bankManager")
    private List<Client> clients;

}