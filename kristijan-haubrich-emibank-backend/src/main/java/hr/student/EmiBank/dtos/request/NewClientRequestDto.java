package hr.student.EmiBank.dtos.request;

import lombok.Data;

@Data
public class NewClientRequestDto {
    private String name;
    private String email;
    private String password;
    private String address;
    private String bankManagerEmail;
}
