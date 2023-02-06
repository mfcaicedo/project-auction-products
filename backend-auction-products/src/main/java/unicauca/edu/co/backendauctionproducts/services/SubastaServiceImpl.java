package unicauca.edu.co.backendauctionproducts.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unicauca.edu.co.backendauctionproducts.models.SubastaEntity;
import unicauca.edu.co.backendauctionproducts.repositories.UsuarioRepository;
import unicauca.edu.co.backendauctionproducts.services.DTO.SubastaDTO;

@Service
public class SubastaServiceImpl implements ISubastaService{


    @Autowired
    private UsuarioRepository servicioAccesoBaseDatos;

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
    public SubastaDTO close(Integer codigo){

        SubastaEntity objSubastaEntity= this.servicioAccesoBaseDatos.closeSubasta(codigo);
        SubastaDTO subastaDTO=this.modelMapper.map(objSubastaEntity, SubastaDTO.class);

        return subastaDTO;
    }
    
}
