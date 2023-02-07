package unicauca.edu.co.backendauctionproducts.services;

import unicauca.edu.co.backendauctionproducts.services.DTO.AuctionDTO;

public interface IAuctionService {
    public AuctionDTO save(AuctionDTO auctionDTO);

    public AuctionDTO close(long id);
}
