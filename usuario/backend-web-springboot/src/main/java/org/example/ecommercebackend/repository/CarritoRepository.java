package org.example.ecommercebackend.repository;

import org.example.ecommercebackend.model.CarritoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;


public interface CarritoRepository extends JpaRepository<CarritoItem, Long> {
    // Trae todos los items del carrito de un usuario
    List<CarritoItem> findByUsuarioId(Long usuarioId);
    // Busca un item específico de un usuario
    Optional<CarritoItem> findByUsuarioIdAndProductoId(Long usuarioId, Long productoId);
    // Elimina todos los items del carrito de un usuario (al hacer checkout)

    @Transactional  // ← agrega esto
    void deleteByUsuarioId(Long usuarioId);
}