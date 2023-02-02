package unicauca.edu.co.backendauctionproducts.services;

import java.util.List;

import unicauca.edu.co.backendauctionproducts.services.DTO.ProductoDTO;

public interface IProductoService {
    public List<ProductoDTO> findAll();	
    public ProductoDTO save(ProductoDTO producto);	
}
