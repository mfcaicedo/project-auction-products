package unicauca.edu.co.backendauctionproducts.services.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class ProductoSubastaDTO {
    
    private Integer codigo;		
	private String nombre;	
	private Integer valor_actual_oferta;	

    public ProductoSubastaDTO()
	{
		
	}

}
