package unicauca.edu.co.backendauctionproducts.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unicauca.edu.co.backendauctionproducts.models.Product;

@Repository
public interface IRepositoryProduct extends JpaRepository<Product, Long> {
}
