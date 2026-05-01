package org.example.ecommercebackend.repository;

import org.example.ecommercebackend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // Query dinámica: filtra por categoría, marca y rango de precio
    // Los parámetros son opcionales — si vienen null, no filtra por ese campo
    // LOWER() para que la búsqueda no distinga mayúsculas/minúsculas
    @Query("""
        SELECT p FROM Producto p
        WHERE (:categoria IS NULL OR LOWER(p.categoria) = LOWER(:categoria))
        AND   (:marca     IS NULL OR LOWER(p.marca)     = LOWER(:marca))
        AND   (:precioMin IS NULL OR p.precio           >= :precioMin)
        AND   (:precioMax IS NULL OR p.precio           <= :precioMax)
        AND   p.disponible = true
        """)
    List<Producto> filtrar(
            @Param("categoria") String categoria,
            @Param("marca")     String marca,
            @Param("precioMin") Double precioMin,
            @Param("precioMax") Double precioMax
    );
}