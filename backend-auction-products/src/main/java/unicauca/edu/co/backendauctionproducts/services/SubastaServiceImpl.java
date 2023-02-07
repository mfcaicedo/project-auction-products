package unicauca.edu.co.backendauctionproducts.services;

import java.util.List;
import java.util.ArrayList;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unicauca.edu.co.backendauctionproducts.models.SubastaEntity;
import unicauca.edu.co.backendauctionproducts.models.ProductoEntity;
import unicauca.edu.co.backendauctionproducts.repositories.UsuarioRepository;
import unicauca.edu.co.backendauctionproducts.services.DTO.SubastaDTO;
import unicauca.edu.co.backendauctionproducts.services.DTO.ProductoDTO;
import unicauca.edu.co.backendauctionproducts.services.DTO.OfertaDTO;
import unicauca.edu.co.backendauctionproducts.services.DTO.ProductoSubastaDTO;


import unicauca.edu.co.backendauctionproducts.services.IProductoService;

import javax.swing.text.StyledEditorKit.BoldAction;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.moxy.json.MoxyJsonFeature;


import javax.ws.rs.core.GenericType;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.client.Invocation.Builder; 
import javax.ws.rs.core.MediaType;


@Service
public class SubastaServiceImpl implements ISubastaService{

    
    private String endPoint;
    private Client objClientePeticiones; 

    @Autowired
    private UsuarioRepository servicioAccesoBaseDatos;

    @Autowired
    private IProductoService servicioProducto;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public SubastaDTO save(SubastaDTO subasta) {
        
        SubastaEntity SubastaEntity = this.modelMapper.map(subasta, SubastaEntity.class);
		SubastaEntity objSubastaEntity = this.servicioAccesoBaseDatos.saveSubasta(SubastaEntity);
		SubastaDTO subastaDTO=this.modelMapper.map(objSubastaEntity, SubastaDTO.class);
		return subastaDTO;	

    }

    @Override
    public OfertaDTO saveOferta(OfertaDTO oferta){

        //buscamos el objeto en las subastas y cambiamos el ofertante y el precio de la oferta
        List<SubastaEntity> listaSubastas = this.servicioAccesoBaseDatos.getSubastas();

        for(SubastaEntity SubastaOBJ : listaSubastas){

            int idDeProductoSubasta = SubastaOBJ.getId_producto_ofertado();

            int IdProducto = oferta.getId_producto();

            int IdOfertante = oferta.getId_ofertante();

            int ValorOferta = oferta.getValor_ofertado();

            int valorBase = SubastaOBJ.getValor_ofertado();
            
            boolean estado_subasta = SubastaOBJ.getEstado_subasta();

            if(estado_subasta == true && (idDeProductoSubasta ==  IdProducto) && (ValorOferta > valorBase)){
                //modificamos la subasta
                SubastaOBJ.setId_ofertante(IdOfertante);
                SubastaOBJ.setValor_ofertado(ValorOferta);    
            }

        }

        return oferta;

    }

    @Override
    public ProductoSubastaDTO getProductoEnSubasta(Integer codigo){

        

        List<SubastaEntity> listaSubastas = this.servicioAccesoBaseDatos.getSubastas();

        ProductoDTO objProducto = getProductoByIdService(codigo);

        ProductoSubastaDTO objProductoSubasta = new ProductoSubastaDTO();

        for(SubastaEntity Subasta : listaSubastas){
            Integer codigoProdSubasta = Subasta.getId_producto_ofertado();

            if(codigo == codigoProdSubasta){
                
                objProductoSubasta.setCodigo(codigo);
                objProductoSubasta.setNombre(objProducto.getNombre());
                objProductoSubasta.setValor_actual_oferta(Subasta.getValor_ofertado());
            
            }
            
        }

        return objProductoSubasta;
        
    }

    @Override
    public List<SubastaDTO> getSubastas(){
        //List<SubastaDTO> listaDeSubastas = new ArrayList<SubastaDTO>();    

        List<SubastaEntity> listaSubastas = this.servicioAccesoBaseDatos.getSubastas();

        List<SubastaDTO> listaDeSubastasFinal = modelMapper.map(listaSubastas, new TypeToken<List<SubastaDTO>>() {}.getType());

        return listaDeSubastasFinal;

    }

    @Override
    public SubastaDTO close(Integer codigo){

        SubastaEntity objSubastaEntity= this.servicioAccesoBaseDatos.closeSubasta(codigo);
        SubastaDTO subastaDTO=this.modelMapper.map(objSubastaEntity, SubastaDTO.class);

        return subastaDTO;
    }


    public ProductoDTO getProductoByIdService(Integer codigoProducto){

        ProductoDTO ProductoTemporal = null;
        //IProductoService servicioProducto = null;

        ProductoTemporal = this.servicioProducto.findById(codigoProducto);

        return ProductoTemporal;

        /*System.out.println("este es el codigo del producto: "+ codigoProducto);

        //System.out.println("objeto peticiones: " + this.objClientePeticiones);

        ProductoDTO productoTemp2 = null;
        ProductoEntity productoTemp = null;

        this.endPoint="http://localhost:5000/api/productos";  //endpoint pra traer producto
	    

        System.out.println("este es el endpoint final: " + endPoint+"/"+codigoProducto);

        
        this.objClientePeticiones = ClientBuilder.newClient().register(new JacksonFeature());
        //this.objClientePeticiones = ClientBuilder.newClient().register(new MoxyJsonFeature());

        WebTarget target = this.objClientePeticiones.target(this.endPoint+"/"+codigoProducto);

        System.out.println("paso 1");
        
        Builder objPeticion=target.request(MediaType.APPLICATION_JSON_TYPE);
        
        
        System.out.println("paso 2");

        System.out.println("esta es la respuesta de la peticion: ");  
        System.out.println(objPeticion.get());

        
        //productoTemp = objPeticion.get(ProductoDTO.class);
        productoTemp = objPeticion.get(ProductoEntity.class);
        //productoTemp = objPeticion.get(ProductoDTO.class);
        //productoTemp = objPeticion.get(new GenericType<List<ProductoDTO>>() {});
        
        System.out.println("paso 3");
        
        System.out.println("este es el producto que trajo");
        System.out.println(productoTemp.getNombre());

        return productoTemp2;*/

    }


    @Override
	public List<ProductoDTO> getProductosNOEnSubasta(){

        List<ProductoDTO> listaProductosNOSubastados = new ArrayList<ProductoDTO>();
        List<SubastaEntity> listaSubastas = this.servicioAccesoBaseDatos.getSubastas();
        List<ProductoEntity> listaDeProductos = new ArrayList<ProductoEntity>(this.servicioAccesoBaseDatos.getProductos());

        

        for(ProductoEntity producto : listaDeProductos){
            Integer idProducto = producto.getCodigo();
            //int indice = 0;
            
            for(SubastaEntity productoDeSubasta : listaSubastas){
                Integer idProductoDeSubasta = productoDeSubasta.getId_producto_ofertado();

                System.out.println("es diferente");
                
                if(idProducto == idProductoDeSubasta){

                    System.out.println("este es el id del producto actual" + idProducto);
                    System.out.println("este es el id del producto en subasta" + idProductoDeSubasta);
                    System.out.println("--------");
                    //ProductoDTO productoDTO=this.modelMapper.map(producto, ProductoDTO.class);
                    //listaProductosNOSubastados.add(productoDTO);

                    //System.out.println("lista de productos");
                    //System.out.println(listaDeProductos.get(0).get);

                    //listaDeProductos.remove(indice);
                    listaDeProductos.remove(producto);

                    //System.out.println("lista de productos");
                    //System.out.println(listaDeProductos.get(0).getNombre());

                }
            }

            //indice = indice + 1;

        }

        List<ProductoDTO> listaDeProductosFinal = modelMapper.map(listaDeProductos, new TypeToken<List<ProductoDTO>>() {}.getType());
        
        //return listaDeProductosFinal;
        //return listaProductosNOSubastados;
        return listaDeProductosFinal;

    }


    @Override
	public List<ProductoDTO> getProductosEnSubasta(){

        List<ProductoDTO> listaProductosSubastados = new ArrayList<ProductoDTO>();

        //recorremos las subastas para ver cuales estan abiertas
        //y traemos los productos de estas subastas abiertas
        List<SubastaEntity> listaSubastas = this.servicioAccesoBaseDatos.getSubastas();
        
        //recorremos las subastas para traer los productos activos en subasta
        for (SubastaEntity subasta : listaSubastas) {

            Integer idProducto = subasta.getId_producto_ofertado();
            Boolean estadoSubasta = subasta.getEstado_subasta();
            if(estadoSubasta){
                ProductoDTO productoGet = getProductoByIdService(idProducto);
                listaProductosSubastados.add(productoGet);
            }
            
        }
        
        return listaProductosSubastados;
		
	}
    
}
