package unicauca.edu.co.backendauctionproducts.services;

import java.util.List;

import unicauca.edu.co.backendauctionproducts.services.DTO.SubastaDTO;
import unicauca.edu.co.backendauctionproducts.services.DTO.OfertaDTO;
import unicauca.edu.co.backendauctionproducts.services.DTO.ProductoDTO;
import unicauca.edu.co.backendauctionproducts.services.DTO.ProductoSubastaDTO;

public interface ISubastaService{
    public SubastaDTO save(SubastaDTO subasta);	

    public SubastaDTO close(Integer codigo);	
    
    public List<ProductoDTO> getProductosEnSubasta();

    public List<ProductoDTO> getProductosNOEnSubasta();

    public  OfertaDTO saveOferta(OfertaDTO oferta);

    public List<SubastaDTO> getSubastas();

    public ProductoSubastaDTO getProductoEnSubasta(Integer codigo);

}
