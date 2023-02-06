package unicauca.edu.co.backendauctionlogin.services;

import unicauca.edu.co.backendauctionlogin.models.Person;
import unicauca.edu.co.backendauctionlogin.services.DTO.PersonDTO;
import unicauca.edu.co.backendauctionlogin.services.DTO.ResponseBodyInfo;

import java.util.List;

public interface IPersonService {
    public List<PersonDTO> findAll();

    public PersonDTO findById(Long id);

    public ResponseBodyInfo save(PersonDTO personDTO);

    public ResponseBodyInfo update(Long id, PersonDTO personDTO);

    public void deleteById(Long id);

    public ResponseBodyInfo login(PersonDTO personDTO);
}
