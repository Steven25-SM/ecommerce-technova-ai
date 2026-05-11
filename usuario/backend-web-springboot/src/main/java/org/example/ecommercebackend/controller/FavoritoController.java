package org.example.ecommercebackend.controller;

import org.example.ecommercebackend.model.Favorito;
import org.example.ecommercebackend.model.Producto;
import org.example.ecommercebackend.repository.FavoritoRepository;
import org.example.ecommercebackend.repository.ProductoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/favoritos")
@CrossOrigin(origins = "*")
public class FavoritoController {

    private final FavoritoRepository favoritoRepository;
    private final ProductoRepository productoRepository;

    public FavoritoController(FavoritoRepository favoritoRepository,
                              ProductoRepository productoRepository) {
        this.favoritoRepository = favoritoRepository;
        this.productoRepository = productoRepository;
    }

    // GET /favoritos/{usuarioId} — obtener favoritos del usuario
    @GetMapping("/{usuarioId}")
    public List<Favorito> obtener(@PathVariable Long usuarioId) {
        return favoritoRepository.findByUsuarioId(usuarioId);
    }

    // POST /favoritos/toggle — agregar o quitar favorito
    // Si ya es favorito lo quita, si no lo agrega
    @PostMapping("/toggle")
    public ResponseEntity<?> toggle(@RequestBody Map<String, Long> body) {
        Long usuarioId  = body.get("usuarioId");
        Long productoId = body.get("productoId");

        Optional<Favorito> existente = favoritoRepository
                .findByUsuarioIdAndProductoId(usuarioId, productoId);

        if (existente.isPresent()) {
            // Ya es favorito → lo quitamos
            favoritoRepository.deleteByUsuarioIdAndProductoId(usuarioId, productoId);
            return ResponseEntity.ok(Map.of("mensaje", "Eliminado de favoritos", "esFavorito", false));
        }

        // No es favorito → lo agregamos
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Favorito favorito = new Favorito();
        favorito.setUsuarioId(usuarioId);
        favorito.setProducto(producto);
        favoritoRepository.save(favorito);

        return ResponseEntity.ok(Map.of("mensaje", "Agregado a favoritos", "esFavorito", true));
    }
}