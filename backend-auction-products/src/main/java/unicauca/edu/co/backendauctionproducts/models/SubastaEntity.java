package unicauca.edu.co.backendauctionproducts.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class SubastaEntity {
    private Integer id;		
	private Integer id_producto_ofertado;	
	private Integer id_ofertante;
    private Integer valor_ofertado;
    private Boolean estado_subasta;	

    public SubastaEntity(){

    }
}