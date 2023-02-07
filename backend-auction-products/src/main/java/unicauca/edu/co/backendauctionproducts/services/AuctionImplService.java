package unicauca.edu.co.backendauctionproducts.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unicauca.edu.co.backendauctionproducts.models.Auction;
import unicauca.edu.co.backendauctionproducts.repositories.IRepositoryAuction;
import unicauca.edu.co.backendauctionproducts.repositories.UsuarioRepository;
import unicauca.edu.co.backendauctionproducts.services.DTO.AuctionDTO;

@Service
public class AuctionImplService implements IAuctionService {


    @Autowired
    private IRepositoryAuction repositoryAuction;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AuctionDTO save(AuctionDTO auctionDTO) {
        Auction auctionEntity = modelMapper.map(auctionDTO, Auction.class);
        auctionEntity = repositoryAuction.save(auctionEntity);
        auctionDTO = modelMapper.map(auctionEntity, AuctionDTO.class);
        return auctionDTO;
    }

    @Override
    public AuctionDTO close(long id) {
        Auction auctionEntity = repositoryAuction.findById(id).get();
        auctionEntity.setAuctionState(false);
        auctionEntity = repositoryAuction.save(auctionEntity);
        AuctionDTO auctionDTO = modelMapper.map(auctionEntity, AuctionDTO.class);
        return auctionDTO;
    }

}
