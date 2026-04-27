package org.example.ecommercebackend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.ecommercebackend.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}