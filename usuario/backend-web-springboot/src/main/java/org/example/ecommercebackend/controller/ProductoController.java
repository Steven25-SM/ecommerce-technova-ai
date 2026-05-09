package org.example.ecommercebackend.controller;

import org.example.ecommercebackend.model.Producto;
import org.example.ecommercebackend.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping("/productos")
    public List<Producto> listar() {
        return productoRepository.findAll();
    }

    @PostMapping("/productos")
    public Producto crear(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    @PutMapping("/productos/{id}")
    public Producto actualizar(@PathVariable Long id, @RequestBody Producto producto) {
        producto.setId(id);
        return productoRepository.save(producto);
    }

    @PatchMapping("/productos/{id}/deshabilitar")
    public Producto deshabilitar(@PathVariable Long id) {
        Producto p = productoRepository.findById(id).orElseThrow();
        p.setDisponible(false);
        return productoRepository.save(p);
    }
}