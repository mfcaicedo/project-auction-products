package unicauca.edu.co.backendauctionproducts.repositories;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import unicauca.edu.co.backendauctionproducts.models.ProductoEntity;

@Repository
public class UsuarioRepository {
    
    private ArrayList<ProductoEntity> listaDeProductos;

    public UsuarioRepository()
    {
        this.listaDeProductos = new ArrayList<ProductoEntity>();
        cargarProductos();
    }

	public List<ProductoEntity> findAll()
   {
	   System.out.println("Invocando a listarclientes");
	   return this.listaDeProductos;	
   }


    public ProductoEntity save(ProductoEntity producto)	
	{
		 System.out.println("Invocando a almacenar producto");
		 ProductoEntity objProducto=null;
		 if (this.listaDeProductos.add(producto))
		 {
			 objProducto=producto;
		 }
		 
		 return objProducto;
	}

    private void cargarProductos()
	{
        ProductoEntity objProducto1 = new ProductoEntity(123, "Mesa", 600000);
        this.listaDeProductos.add(objProducto1);
	}
}
