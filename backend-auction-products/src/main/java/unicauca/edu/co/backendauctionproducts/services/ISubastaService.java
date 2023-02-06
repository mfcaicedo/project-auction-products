package unicauca.edu.co.backendauctionproducts.services;

import java.util.List;

import unicauca.edu.co.backendauctionproducts.services.DTO.SubastaDTO;
import unicauca.edu.co.backendauctionproducts.services.DTO.ProductoDTO;

public interface ISubastaService{
    public SubastaDTO save(SubastaDTO subasta);	

    public SubastaDTO close(Integer codigo);	
    
    public List<ProductoDTO> getProductosEnSubasta();

    public List<ProductoDTO> getProductosNOEnSubasta();
    

}
