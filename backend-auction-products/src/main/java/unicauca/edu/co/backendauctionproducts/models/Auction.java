package unicauca.edu.co.backendauctionproducts.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "auction")
@Getter @Setter @AllArgsConstructor
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
	private long idPersonOffered;
    @Column
    private float valueOffered;
    @Column
    private Boolean auctionState;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Auction(){

    }
}
