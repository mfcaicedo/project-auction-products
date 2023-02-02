package unicauca.edu.co.backendauctionlogin.services.DTO;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import unicauca.edu.co.backendauctionlogin.models.Type_Rol;

@Getter
@Setter
@AllArgsConstructor
public class PersonDTO {
    private long id;
    private String name;
    private String lastName;
    private String email;
    private String cellphone;
    private String login;
    private String password;
    private Type_Rol rol;

    public PersonDTO() {
    }
}

