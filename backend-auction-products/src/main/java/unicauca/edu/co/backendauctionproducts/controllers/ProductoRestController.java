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
import unicauca.edu.co.backendauctionproducts.services.ISubastaService;
import unicauca.edu.co.backendauctionproducts.services.DTO.ProductoDTO;
import unicauca.edu.co.backendauctionproducts.services.DTO.SubastaDTO;
import unicauca.edu.co.backendauctionproducts.services.DTO.OfertaDTO;
import unicauca.edu.co.backendauctionproducts.services.DTO.ProductoSubastaDTO;


@RestController
@RequestMapping("/api")
public class ProductoRestController {

    @Autowired
	private IProductoService productoService;

	@Autowired
	private ISubastaService subastaService;

	//listar producto
	@GetMapping("/productos")
	public List<ProductoDTO> index() {
		return productoService.findAll();
	}

	//guardar producto
    @PostMapping("/productos")
	public ProductoDTO create(@RequestBody ProductoDTO producto) {	
		ProductoDTO objProducto = null;
		objProducto =  productoService.save(producto);
		return objProducto;
	}

	//traer un producto por codigo
	@GetMapping("/productos/{codigo}")
	public ProductoDTO show(@PathVariable Integer codigo) {
		ProductoDTO objProducto = null;		
		objProducto = productoService.findById(codigo);		
		return objProducto;
	}

	//get productos de subasta
	@GetMapping("/subastas")
	public List<SubastaDTO> getSubastas() {
		//ProductoDTO objProducto = null;		
		return subastaService.getSubastas();		
	}


	//get productos de subasta
	@GetMapping("/productoEnSubasta/{codigo}")
	public ProductoSubastaDTO getProductoEnSubasta(@PathVariable Integer codigo) {
		ProductoSubastaDTO objProducto = null;	
		objProducto = subastaService.getProductoEnSubasta(codigo);
		return objProducto;
	}

	//get productos de subasta
	@GetMapping("/productos/ensubasta")
	public List<ProductoDTO> getProductosEnSubasta() {
		//ProductoDTO objProducto = null;		
		return subastaService.getProductosEnSubasta();		
	}

	//get productos de subasta
	@GetMapping("/productos/enNOsubasta")
	public List<ProductoDTO> getProductosEnNOSubasta() {
		//ProductoDTO objProducto = null;		
		return subastaService.getProductosNOEnSubasta();		
	}


	
	//crear subasta
	@PostMapping("/subastas")
	public SubastaDTO create(@RequestBody SubastaDTO subasta) {	
		SubastaDTO objSubasta = null;
		objSubasta =  subastaService.save(subasta);
		return objSubasta;
	}



	//enviar oferta
	//crear subasta
	@PostMapping("/ofertar")
	public OfertaDTO ofertar(@RequestBody OfertaDTO oferta) {	
		OfertaDTO objOferta = null;
		objOferta =  subastaService.saveOferta(oferta);
		return objOferta;
	}


	//crear subasta
	@PostMapping("/subastas/close/{codigo}")
	public SubastaDTO close(@PathVariable Integer codigo) {	
		SubastaDTO objSubasta = null;
		objSubasta =  subastaService.close(codigo);
		return objSubasta;
	}
    
}
