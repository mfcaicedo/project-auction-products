package unicauca.edu.co.backendauctionlogin.respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unicauca.edu.co.backendauctionlogin.models.Person;

@Repository
public interface IRepositoryPerson extends JpaRepository<Person, Long> {

    //query para buscar por login y contraseña
    public Person findByLoginAndPassword(String login, String password);


}
