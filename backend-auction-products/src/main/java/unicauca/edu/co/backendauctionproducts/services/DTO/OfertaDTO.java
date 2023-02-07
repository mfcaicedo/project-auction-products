package unicauca.edu.co.backendauctionproducts.services.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class OfertaDTO {

    private Integer id;		
	private Integer id_producto;	
	private Integer id_ofertante;
    private Integer valor_ofertado;
    
    public OfertaDTO(){

    }
    
}