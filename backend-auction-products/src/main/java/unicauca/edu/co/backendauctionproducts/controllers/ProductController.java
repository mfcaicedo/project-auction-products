package unicauca.edu.co.backendauctionproducts.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import unicauca.edu.co.backendauctionproducts.services.IProductService;
import unicauca.edu.co.backendauctionproducts.services.IAuctionService;
import unicauca.edu.co.backendauctionproducts.services.DTO.ProductDTO;
import unicauca.edu.co.backendauctionproducts.services.DTO.AuctionDTO;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.PUT,RequestMethod.PATCH, RequestMethod.DELETE})
public class ProductController {

    @Autowired
	private IProductService productService;

	@Autowired
	private IAuctionService subastaService;

	//listar producto
	@RequestMapping(value = "/products", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public List<ProductDTO> index() {
		List<ProductDTO> products = productService.findAll();
		return products;
	}

	//guardar producto
	@RequestMapping(value = "/products", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public ProductDTO store(@RequestBody ProductDTO producto) {
		ProductDTO objProducto = null;
		objProducto =  productService.save(producto);
		return objProducto;
	}

	//traer un producto por codigo
	@RequestMapping(value = "/products/{id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ProductDTO show(@PathVariable long id) {
		ProductDTO objProducto = null;
		objProducto = productService.findById(id);
		return objProducto;
	}

	//actualizar el estado a En_subasta de un producto
	@RequestMapping(value = "/products/updateState/{id}", method = RequestMethod.PATCH, produces = "application/json")
	@ResponseBody
	public ProductDTO updateState(@PathVariable long id) {
		ProductDTO objProducto = null;
		objProducto = productService.updateState(id);
		return objProducto;
	}

}
