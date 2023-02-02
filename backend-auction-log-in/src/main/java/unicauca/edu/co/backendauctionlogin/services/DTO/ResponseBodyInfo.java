package unicauca.edu.co.backendauctionlogin.services.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ResponseBodyInfo {
    private String message;
    private String typeError;
    private boolean success;
    private PersonDTO data;

    public ResponseBodyInfo() {
    }
}
