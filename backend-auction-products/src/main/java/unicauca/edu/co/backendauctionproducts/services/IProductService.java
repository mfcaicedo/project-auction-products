package unicauca.edu.co.backendauctionproducts.services;

import java.util.List;

import unicauca.edu.co.backendauctionproducts.services.DTO.ProductDTO;

public interface IProductService {
    public List<ProductDTO> findAll();
    public ProductDTO save(ProductDTO product);
    public ProductDTO findById(long id);

}
