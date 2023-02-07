package unicauca.edu.co.backendauctionproducts.services.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class AuctionDTO {
    private long id;
	private ProductDTO product;
    private long idPersonOffered;
    private float valueOffered;
    private Boolean auctionState;

    public AuctionDTO(){

    }
    
}
