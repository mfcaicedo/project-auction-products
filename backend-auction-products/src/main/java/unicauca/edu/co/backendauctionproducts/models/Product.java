package unicauca.edu.co.backendauctionproducts.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "product")
@Getter
@Setter
@AllArgsConstructor
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
    private Integer code;
	@Column
	private String name;
	@Column
	private float valueInitialOffer;
	@Column
	private String state;
	@Getter(onMethod_= @JsonIgnore)
	@OneToMany(mappedBy = "product")
	private List<Auction> auctions;

	public Product()
	{
		
	}
}


