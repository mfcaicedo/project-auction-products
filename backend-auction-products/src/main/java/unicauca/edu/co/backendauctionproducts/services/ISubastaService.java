package unicauca.edu.co.backendauctionproducts.services;

import java.util.List;

import unicauca.edu.co.backendauctionproducts.services.DTO.SubastaDTO;

public interface ISubastaService{
    public SubastaDTO save(SubastaDTO subasta);	

    public SubastaDTO close(Integer codigo);	
}
