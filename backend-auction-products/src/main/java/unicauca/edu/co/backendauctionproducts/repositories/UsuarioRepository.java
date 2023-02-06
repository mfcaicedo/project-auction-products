package unicauca.edu.co.backendauctionproducts.repositories;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import unicauca.edu.co.backendauctionproducts.models.ProductoEntity;
import unicauca.edu.co.backendauctionproducts.models.SubastaEntity;
import unicauca.edu.co.backendauctionproducts.services.DTO.SubastaDTO;

@Repository
public class UsuarioRepository {
    
    private ArrayList<ProductoEntity> listaDeProductos;
	private ArrayList<SubastaEntity> listaDeSubastas;

    public UsuarioRepository()
    {
        this.listaDeProductos = new ArrayList<ProductoEntity>();
        cargarProductos();

		this.listaDeSubastas = new ArrayList<SubastaEntity>();
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

	public SubastaEntity saveSubasta(SubastaEntity subasta)	
	{
		 System.out.println("Invocando a crear Subasta");
		 SubastaEntity objSubasta=null;
		 if (this.listaDeSubastas.add(subasta))
		 {
			objSubasta=subasta;
		 }
		 
		 return objSubasta;
	}


	public SubastaEntity closeSubasta(Integer codigo)	
	{
		 System.out.println("Invocando a cerrar Subasta");
		 SubastaEntity objSubasta=null;

		 //buscamos la subasta con id de producto enviado por parametro
		 for (SubastaEntity subasta : listaDeSubastas) {
			if(subasta.getId_producto_ofertado()==codigo)
			{
				//actualizamos el estado de la subasta

				subasta.setEstado_subasta(false);
				objSubasta=subasta;
				break;
			}
		}

		 /*if (this.listaDeSubastas.add(subasta))
		 {
			objSubasta=subasta;
		 }*/
		 
		 return objSubasta;
	}


	public List<SubastaEntity> getSubastas(){
		return this.listaDeSubastas;
	}


	public List<ProductoEntity> getProductos(){
		return this.listaDeProductos;
	}


    private void cargarProductos()
	{
        ProductoEntity objProducto1 = new ProductoEntity(123, "Mesa", 600000);
		this.listaDeProductos.add(objProducto1);

		ProductoEntity objProducto2 = new ProductoEntity(12, "Silla", 100000);
		this.listaDeProductos.add(objProducto2);
	}

	public ProductoEntity findById(Integer codigo)
	{
		System.out.println("Invocando a consultar un cliente");
		ProductoEntity objProducto=null;
		 
		 for (ProductoEntity producto : listaDeProductos) {
			 if(producto.getCodigo()==codigo)
			 {
				objProducto=producto;
				 break;
			 }
		 }
		 
		 return objProducto;
	 }


}
