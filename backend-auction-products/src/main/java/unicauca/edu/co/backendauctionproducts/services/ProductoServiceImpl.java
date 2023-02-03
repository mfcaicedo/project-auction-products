package unicauca.edu.co.backendauctionproducts.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unicauca.edu.co.backendauctionproducts.models.ProductoEntity;
import unicauca.edu.co.backendauctionproducts.repositories.UsuarioRepository;
import unicauca.edu.co.backendauctionproducts.services.DTO.ProductoDTO;

@Service
public class ProductoServiceImpl implements IProductoService{

    @Autowired
	private UsuarioRepository servicioAccesoBaseDatos;

	@Autowired
    private ModelMapper modelMapper;

    @Override
	public List<ProductoDTO> findAll() {	
		
		List<ProductoEntity> clientesEntity= this.servicioAccesoBaseDatos.findAll();
		List<ProductoDTO> clientesDTO=this.modelMapper.map(clientesEntity, new TypeToken<List<ProductoDTO>>() {}.getType());
		return clientesDTO;
	}

    @Override
    public ProductoDTO save(ProductoDTO producto) {
       
        ProductoEntity productoEntity = this.modelMapper.map(producto, ProductoEntity.class);
		ProductoEntity objProductoEntity = this.servicioAccesoBaseDatos.save(productoEntity);
		ProductoDTO productoDTO=this.modelMapper.map(objProductoEntity, ProductoDTO.class);
		return productoDTO;	

    }


	@Override
	public ProductoDTO findById(Integer codigo) {		
		ProductoEntity objProductoEntity= this.servicioAccesoBaseDatos.findById(codigo);
		ProductoDTO clienteDTO=this.modelMapper.map(objProductoEntity, ProductoDTO.class);
		return clienteDTO;
	}

        
}
