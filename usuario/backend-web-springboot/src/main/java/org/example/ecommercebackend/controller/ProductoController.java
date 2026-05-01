package org.example.ecommercebackend.controller;

import org.example.ecommercebackend.model.Producto;
import org.example.ecommercebackend.repository.ProductoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoRepository repository;

    public ProductoController(ProductoRepository repository) {
        this.repository = repository;
    }

    // GET /productos — devuelve todos (solo los disponibles)
    @GetMapping
    public List<Producto> listar() {
        return repository.findAll()
                .stream()
                .filter(p -> Boolean.TRUE.equals(p.getDisponible()))
                .toList();
    }

    // GET /productos/filtrar?categoria=Laptop&marca=Lenovo&precioMin=100&precioMax=2000
    // Todos los parámetros son opcionales — si no los mandas, no filtra por ese campo
    @GetMapping("/filtrar")
    public List<Producto> filtrar(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) Double precioMin,
            @RequestParam(required = false) Double precioMax
    ) {
        return repository.filtrar(categoria, marca, precioMin, precioMax);
    }
}