package unicauca.edu.co.backendauctionproducts.services.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter @AllArgsConstructor
public class ProductDTO {
	private long id;
    private Integer code;
	private String name;
	private float initialValueOffer;
	private String state;
	private List<AuctionDTO> auctions;

	public ProductDTO()
	{
		
	}
}
