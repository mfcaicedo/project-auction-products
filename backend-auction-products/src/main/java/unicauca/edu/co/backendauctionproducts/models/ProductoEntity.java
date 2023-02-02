package unicauca.edu.co.backendauctionproducts.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class ProductoEntity {
    private Integer codigo;		
	private String nombre;	
	private Integer valor_inicial_oferta;	

	public ProductoEntity()
	{
		
	}
}


