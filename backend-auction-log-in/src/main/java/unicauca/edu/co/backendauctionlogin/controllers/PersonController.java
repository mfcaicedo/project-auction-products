package unicauca.edu.co.backendauctionlogin.controllers;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import unicauca.edu.co.backendauctionlogin.models.Person;
import unicauca.edu.co.backendauctionlogin.services.DTO.PersonDTO;
import unicauca.edu.co.backendauctionlogin.services.DTO.ResponseBodyInfo;
import unicauca.edu.co.backendauctionlogin.services.IPersonService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"},
        methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class PersonController {
    @Autowired
    private IPersonService personService;
    @Autowired
    private ModelMapper modelMapper;

    @RequestMapping(value = "/persons", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<PersonDTO> index(){
       List<PersonDTO> personsDTO = this.personService.findAll();
       return personsDTO;
    }

    @RequestMapping(value = "persons/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public PersonDTO show(@PathVariable Long id){
        PersonDTO personDTO = personService.findById(id);
        return personDTO;
    }

    @RequestMapping(value = "/persons", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public ResponseBodyInfo store(@RequestBody PersonDTO person){
        ResponseBodyInfo responseBodyInfo = personService.save(person);
        return responseBodyInfo;
    }

    @RequestMapping(value = "persons/{id}", method = RequestMethod.PUT, produces = "application/json")
    @ResponseBody
    public ResponseBodyInfo update(@PathVariable long id, @RequestBody PersonDTO person){
        ResponseBodyInfo responseBodyInfo = personService.update(id, person);
        return responseBodyInfo;
    }

    @RequestMapping(value = "persons/{id}", method = RequestMethod.DELETE, produces = "application/json")
    @ResponseBody
    public void deleteById(@PathVariable long id){
        this.personService.deleteById(id);
    }

    //Serviciopara validar el login
    @RequestMapping(value = "auth/login", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public ResponseBodyInfo login(@RequestBody PersonDTO person){
        ResponseBodyInfo responseBodyInfo = personService.login(person);
        return responseBodyInfo;
    }

}
