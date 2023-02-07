package unicauca.edu.co.backendauctionproducts.repositories;

import org.springframework.stereotype.Repository;

@Repository
public class UsuarioRepository {
    /*
    private ArrayList<Product> listaDeProductos;
	private ArrayList<Auction> listaDeSubastas;

    public UsuarioRepository()
    {
        this.listaDeProductos = new ArrayList<Product>();
        cargarProductos();

		this.listaDeSubastas = new ArrayList<Auction>();
    }

	public List<Product> findAll()
   {
	   System.out.println("Invocando a listarclientes");
	   return this.listaDeProductos;	
   }


    public Product save(Product producto)
	{
		 System.out.println("Invocando a almacenar producto");
		 Product objProducto=null;
		 if (this.listaDeProductos.add(producto))
		 {
			 objProducto=producto;
		 }
		 
		 return objProducto;
	}

	public Auction saveSubasta(Auction subasta)
	{
		 System.out.println("Invocando a crear Subasta");
		 Auction objSubasta=null;
		 if (this.listaDeSubastas.add(subasta))
		 {
			objSubasta=subasta;
		 }
		 
		 return objSubasta;
	}


	public Auction closeSubasta(Integer codigo)
	{
		 System.out.println("Invocando a cerrar Subasta");
		 Auction objSubasta=null;

		 //buscamos la subasta con id de producto enviado por parametro
		 for (Auction subasta : listaDeSubastas) {
			if(subasta.getId_producto_ofertado()==codigo)
			{
				//actualizamos el estado de la subasta

				subasta.setEstado_subasta(false);
				objSubasta=subasta;
				break;
			}
		}

		 return objSubasta;
	}




    private void cargarProductos()
	{
        Product objProducto1 = new Product(123, "Mesa", 600000);
        Product objProducto2 = new Product(1234, "Carro", 800000);
        Product objProducto3 = new Product(12345, "Moto", 900000);
        Product objProducto4 = new Product(34, "Portátil", 700000);
        Product objProducto5 = new Product(45, "Celular", 400000);
        this.listaDeProductos.add(objProducto1);
        this.listaDeProductos.add(objProducto2);
        this.listaDeProductos.add(objProducto3);
        this.listaDeProductos.add(objProducto4);
        this.listaDeProductos.add(objProducto5);
	}

	public Product findById(Integer codigo)
	{
		System.out.println("Invocando a consultar un cliente");
		Product objProducto=null;
		 
		 for (Product producto : listaDeProductos) {
			 if(producto.getCodigo()==codigo)
			 {
				objProducto=producto;
				 break;
			 }
		 }
		 
		 return objProducto;
	 }

*/
}
