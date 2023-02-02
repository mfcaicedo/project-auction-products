package unicauca.edu.co.backendauctionproducts.controllers;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import unicauca.edu.co.backendauctionproducts.services.IProductoService;
import unicauca.edu.co.backendauctionproducts.services.DTO.ProductoDTO;


@RestController
@RequestMapping("/api")
public class ProductoRestController {

    @Autowired
	private IProductoService productoService;

	//listar producto
	@GetMapping("/productos")
	public List<ProductoDTO> index() {
		return productoService.findAll();
	}

	//guardar producto
    @PostMapping("/producto")
	public ProductoDTO create(@RequestBody ProductoDTO producto) {	
		ProductoDTO objProducto = null;
		objProducto =  productoService.save(producto);
		return objProducto;
	}
    
}
