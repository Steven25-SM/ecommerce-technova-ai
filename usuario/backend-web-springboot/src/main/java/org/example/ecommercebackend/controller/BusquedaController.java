package org.example.ecommercebackend.controller;

import org.example.ecommercebackend.model.Producto;
import org.example.ecommercebackend.repository.ProductoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/busqueda")
@CrossOrigin(origins = "*")
public class BusquedaController {

    private final ProductoRepository productoRepository;

    public BusquedaController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // GET /busqueda?q=logitech — busca por nombre, marca o categoría
    @GetMapping
    public List<Producto> buscar(@RequestParam String q) {
        return productoRepository.buscar(q);
    }
}