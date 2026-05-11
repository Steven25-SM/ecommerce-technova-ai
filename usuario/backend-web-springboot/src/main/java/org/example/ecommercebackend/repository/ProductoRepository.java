package org.example.ecommercebackend.repository;

import org.example.ecommercebackend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    @Query("SELECT p FROM Producto p WHERE (:categoria IS NULL OR LOWER(p.categoria) = LOWER(:categoria)) AND (:marca IS NULL OR LOWER(p.marca) = LOWER(:marca)) AND (:precioMin IS NULL OR p.precio >= :precioMin) AND (:precioMax IS NULL OR p.precio <= :precioMax) AND p.disponible = true")
    List<Producto> filtrar(
            @Param("categoria") String categoria,
            @Param("marca") String marca,
            @Param("precioMin") Double precioMin,
            @Param("precioMax") Double precioMax
    );

    @Query("""
    SELECT p FROM Producto p
    WHERE p.disponible = true
    AND (
        LOWER(p.nombre)    LIKE LOWER(CONCAT('%', :q, '%')) OR
        LOWER(p.marca)     LIKE LOWER(CONCAT('%', :q, '%')) OR
        LOWER(p.categoria) LIKE LOWER(CONCAT('%', :q, '%'))
    )
    ORDER BY
        CASE WHEN LOWER(p.nombre) LIKE LOWER(CONCAT('%', :q, '%')) THEN 0 ELSE 1 END
    """)
    List<Producto> buscar(@Param("q") String q);
}