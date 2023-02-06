package unicauca.edu.co.backendauctionlogin.services;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unicauca.edu.co.backendauctionlogin.models.Person;
import unicauca.edu.co.backendauctionlogin.respositories.IRepositoryPerson;
import unicauca.edu.co.backendauctionlogin.services.DTO.PersonDTO;
import unicauca.edu.co.backendauctionlogin.services.DTO.ResponseBodyInfo;

import java.util.List;
import java.util.Optional;

@Service
public class PersonImplService implements IPersonService {

    @Autowired
    private IRepositoryPerson repositoryPerson;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<PersonDTO> findAll() {
        List<Person> personsEntity = repositoryPerson.findAll();
        List<PersonDTO> personsDTO = modelMapper.map(personsEntity, new TypeToken<List<PersonDTO>>() {}.getType());
        return personsDTO;
    }

    @Override
    public PersonDTO findById(Long id) {
        Optional<Person> objPersonEntity = repositoryPerson.findById(id);
        PersonDTO personDTO = modelMapper.map(objPersonEntity.get(), PersonDTO.class);
        return personDTO;
    }

    @Override
    public ResponseBodyInfo save(PersonDTO personDTO) {
        ResponseBodyInfo responseBodyInfo = new ResponseBodyInfo();
        //Validar que nombres y apellidos sean mayores a 5 caracteres y menores a 50
        if((personDTO.getName().length() < 5 || personDTO.getName().length() > 50)
                && (personDTO.getLastName().length() < 5 || personDTO.getLastName().length() > 50)
        ) {
            responseBodyInfo.setMessage("El nombre y el apellido debe tener entre 5 y 50 caracteres");
            responseBodyInfo.setTypeError("errorName");
            responseBodyInfo.setSuccess(false);
            return responseBodyInfo;
        }
        //Validar que el login y contraseña deben ser mayores a 10 y menores a 20.
        if((personDTO.getLogin().length() < 10 || personDTO.getLogin().length() > 20) &&
                (personDTO.getPassword().length() < 10 || personDTO.getPassword().length() > 20)
        ){
            responseBodyInfo.setMessage("El login y la contraseña debe tener entre 10 y 20 caracteres");
            responseBodyInfo.setTypeError("errorLogin");
            responseBodyInfo.setSuccess(false);
            return responseBodyInfo;
        }
        //Validar que el correo tenga un formato valido (aplica solo para clientes)
        if (personDTO.getRol().equals("CLIENTE")) {
            //Validar que el teléfono debe ser de 10 dígitos y empezar con 5.
            if(!personDTO.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")){
                responseBodyInfo.setMessage("El correo no tiene un formato valido");
                responseBodyInfo.setTypeError("errorEmail");
                responseBodyInfo.setSuccess(false);
                return responseBodyInfo;
            }
            if(!personDTO.getCellphone().matches("^[5][0-9]{9}$")){
                responseBodyInfo.setMessage("El teléfono debe ser de 10 dígitos y empezar con 5");
                responseBodyInfo.setTypeError("errorPhone");
                responseBodyInfo.setSuccess(false);
                return responseBodyInfo;
            }
        }

        Person personEntity = modelMapper.map(personDTO, Person.class);
        Person objPersonEntity = repositoryPerson.save(personEntity);
        //Armo el objeto de respuesta
        responseBodyInfo.setData(modelMapper.map(objPersonEntity, PersonDTO.class));
        responseBodyInfo.setMessage("Persona creada exitosamente");
        responseBodyInfo.setTypeError("success");
        responseBodyInfo.setSuccess(true);
        return responseBodyInfo;
    }

    @Override
    public ResponseBodyInfo update(Long id, PersonDTO personDTO) {
        ResponseBodyInfo responseBodyInfo = new ResponseBodyInfo();
        //Validar que nombres y apellidos sean mayores a 5 caracteres y menores a 50
        if((personDTO.getName().length() < 5 || personDTO.getName().length() > 50)
                && (personDTO.getLastName().length() < 5 || personDTO.getLastName().length() > 50)
        ) {
            responseBodyInfo.setMessage("El nombre y el apellido debe tener entre 5 y 50 caracteres");
            responseBodyInfo.setTypeError("errorName");
            responseBodyInfo.setSuccess(false);
            return responseBodyInfo;
        }
        //Validar que el login y contraseña deben ser mayores a 10 y menores a 20.
        if((personDTO.getLogin().length() < 10 || personDTO.getLogin().length() > 20) &&
                (personDTO.getPassword().length() < 10 || personDTO.getPassword().length() > 20)
        ){
            responseBodyInfo.setMessage("El login y la contraseña debe tener entre 10 y 20 caracteres");
            responseBodyInfo.setTypeError("errorLogin");
            responseBodyInfo.setSuccess(false);
            return responseBodyInfo;
        }
        //Validar que el correo tenga un formato valido
        if(!personDTO.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")){
            responseBodyInfo.setMessage("El correo no tiene un formato valido");
            responseBodyInfo.setTypeError("errorEmail");
            responseBodyInfo.setSuccess(false);
            return responseBodyInfo;
        }
        //Validar que el teléfono debe ser de 10 dígitos y empezar con 5.
        if(!personDTO.getCellphone().matches("^[5][0-9]{9}$")){
            responseBodyInfo.setMessage("El teléfono debe ser de 10 dígitos y empezar con 5");
            responseBodyInfo.setTypeError("errorPhone");
            responseBodyInfo.setSuccess(false);
            return responseBodyInfo;
        }

        Person personEntity = modelMapper.map(personDTO, Person.class);
        Person objPersonEntity = repositoryPerson.save(personEntity);
        //Armo el objeto de respuesta
        responseBodyInfo.setData(modelMapper.map(objPersonEntity, PersonDTO.class));
        responseBodyInfo.setMessage("Persona actualizada exitosamente");
        responseBodyInfo.setTypeError("success");
        responseBodyInfo.setSuccess(true);
        return responseBodyInfo;
    }

    @Override
    public void deleteById(Long id) {
        repositoryPerson.deleteById(id);
    }

    @Override
    public ResponseBodyInfo login(PersonDTO personDTO) {
        ResponseBodyInfo responseBodyInfo = new ResponseBodyInfo();
        Person personEntity = modelMapper.map(personDTO, Person.class);
        Person objPersonEntity = repositoryPerson.findByLoginAndPassword(personEntity.getLogin(), personEntity.getPassword());
        if(objPersonEntity != null && (personEntity.getRol() == objPersonEntity.getRol())) {
            responseBodyInfo.setData(modelMapper.map(objPersonEntity, PersonDTO.class));
            responseBodyInfo.setMessage("Login exitoso");
            responseBodyInfo.setTypeError("success");
            responseBodyInfo.setSuccess(true);
            return responseBodyInfo;
        }else if(objPersonEntity != null && (personEntity.getRol() != objPersonEntity.getRol())){
            responseBodyInfo.setMessage("Se permite el acceso solo para el rol: " + personEntity.getRol());
            responseBodyInfo.setTypeError("errorRol");
            responseBodyInfo.setSuccess(false);
            return responseBodyInfo;
        }else{
            responseBodyInfo.setMessage("Usuario o contraseña incorrectos");
            responseBodyInfo.setTypeError("errorLogin");
            responseBodyInfo.setSuccess(false);
            return responseBodyInfo;
        }
    }
}
