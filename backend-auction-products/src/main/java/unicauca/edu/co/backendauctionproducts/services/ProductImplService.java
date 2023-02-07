package unicauca.edu.co.backendauctionproducts.services;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unicauca.edu.co.backendauctionproducts.models.Product;
import unicauca.edu.co.backendauctionproducts.repositories.IRepositoryProduct;
import unicauca.edu.co.backendauctionproducts.repositories.UsuarioRepository;
import unicauca.edu.co.backendauctionproducts.services.DTO.ProductDTO;

@Service
public class ProductImplService implements IProductService {

    @Autowired
	private IRepositoryProduct repositoryProduct;

	@Autowired
    private ModelMapper modelMapper;

	@Override
	public List<ProductDTO> findAll() {
		List<Product> productsEntity = repositoryProduct.findAll();
		List<ProductDTO> personsDTO = modelMapper.map(productsEntity, new TypeToken<List<ProductDTO>>() {}.getType());
		return personsDTO;
	}

	@Override
	public ProductDTO save(ProductDTO productDTO) {
		Product productEntity = modelMapper.map(productDTO, Product.class);
		productEntity = repositoryProduct.save(productEntity);
		productDTO = modelMapper.map(productEntity, ProductDTO.class);
		return productDTO;
	}

	@Override
	public ProductDTO findById(long id) {
		Optional<Product> objProductEntity = repositoryProduct.findById(id);
		ProductDTO productDTO = modelMapper.map(objProductEntity.get(), ProductDTO.class);
		return productDTO;
	}
}
