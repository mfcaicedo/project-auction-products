package unicauca.edu.co.backendauctionproducts.services;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unicauca.edu.co.backendauctionproducts.models.Auction;
import unicauca.edu.co.backendauctionproducts.repositories.IRepositoryAuction;
import unicauca.edu.co.backendauctionproducts.repositories.IRepositoryProduct;
import unicauca.edu.co.backendauctionproducts.services.DTO.AuctionDTO;

import java.util.List;
import java.util.Optional;

@Service
public class AuctionImplService implements IAuctionService {


    @Autowired
    private IRepositoryAuction repositoryAuction;
    @Autowired
    private IRepositoryProduct repositoryProduct;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AuctionDTO save(AuctionDTO auctionDTO) {
        Auction auctionEntity = modelMapper.map(auctionDTO, Auction.class);
        //Busco si hay un sabasta activa para el producto que se quiere subastar
        Auction auctionEntity2 = repositoryAuction.findByProduct_Id(auctionDTO.getProduct().getId());
        if (auctionEntity2 == null) {
            //guardo la subasta
            auctionEntity = repositoryAuction.save(auctionEntity);
            auctionDTO = modelMapper.map(auctionEntity, AuctionDTO.class);
            return auctionDTO;
        } else {
            //si hay una subasta activa para el producto que se quiere subastar
            //se actualiza la subasta
            auctionEntity2.setAuctionState(true);
            auctionEntity2 = repositoryAuction.save(auctionEntity2);
            auctionDTO = modelMapper.map(auctionEntity2, AuctionDTO.class);
            return auctionDTO;
        }
    }

    @Override
    public AuctionDTO close(long id) {
        //busco la subasta por el id del producto
        Auction auctionEntity = repositoryAuction.findByProduct_Id(id);
        System.out.println("ver esto" + auctionEntity.getAuctionState());
        auctionEntity.setAuctionState(false);
        auctionEntity = repositoryAuction.save(auctionEntity);
        AuctionDTO auctionDTO = modelMapper.map(auctionEntity, AuctionDTO.class);
        return auctionDTO;
    }

    @Override
    public List<AuctionDTO> findAll() {
        List<Auction> auctionsEntity = repositoryAuction.findAll();
        List<AuctionDTO> auctionsDTO = modelMapper.map(auctionsEntity, new TypeToken<List<AuctionDTO>>() {}.getType());
        return auctionsDTO;
    }

    @Override
    public AuctionDTO findById(long id) {
        Optional<Auction> auctionEntity = repositoryAuction.findById(id);
        AuctionDTO auctionDTO = modelMapper.map(auctionEntity, AuctionDTO.class);
        return auctionDTO;
    }

    @Override
    public AuctionDTO offer(AuctionDTO auctionDTO, long id) {
        Auction auctionEntity = repositoryAuction.findById(id).get();
        auctionEntity.setIdPersonOffered(auctionDTO.getIdPersonOffered());
        auctionEntity.setValueOffered(auctionDTO.getValueOffered());
        auctionEntity = repositoryAuction.save(auctionEntity);
        auctionDTO = modelMapper.map(auctionEntity, AuctionDTO.class);
        return auctionDTO;
    }

}
