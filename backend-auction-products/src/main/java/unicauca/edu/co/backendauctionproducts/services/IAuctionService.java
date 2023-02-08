package unicauca.edu.co.backendauctionproducts.services;

import unicauca.edu.co.backendauctionproducts.services.DTO.AuctionDTO;

import java.util.List;

public interface IAuctionService {
    public AuctionDTO save(AuctionDTO auctionDTO);

    public AuctionDTO close(long id);

    public List<AuctionDTO> findAll();

    public AuctionDTO findById(long id);

    public AuctionDTO offer(AuctionDTO auctionDTO, long id);
}
