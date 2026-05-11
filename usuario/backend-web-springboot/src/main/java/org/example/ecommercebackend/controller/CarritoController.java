package org.example.ecommercebackend.controller;

import org.example.ecommercebackend.model.CarritoItem;
import org.example.ecommercebackend.model.Producto;
import org.example.ecommercebackend.repository.CarritoRepository;
import org.example.ecommercebackend.repository.ProductoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/carrito")
@CrossOrigin(origins = "*")
public class CarritoController {

    private final CarritoRepository carritoRepository;
    private final ProductoRepository productoRepository;

    public CarritoController(CarritoRepository carritoRepository,
                             ProductoRepository productoRepository) {
        this.carritoRepository = carritoRepository;
        this.productoRepository = productoRepository;
    }

    // GET /carrito/{usuarioId} — obtener carrito del usuario
    @GetMapping("/{usuarioId}")
    public List<CarritoItem> obtener(@PathVariable Long usuarioId) {
        return carritoRepository.findByUsuarioId(usuarioId);
    }

    // POST /carrito/agregar — agregar producto al carrito
    // Si ya existe, incrementa la cantidad
    @PostMapping("/agregar")
    public ResponseEntity<?> agregar(@RequestBody Map<String, Long> body) {
        Long usuarioId  = body.get("usuarioId");
        Long productoId = body.get("productoId");

        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Optional<CarritoItem> existente = carritoRepository
                .findByUsuarioIdAndProductoId(usuarioId, productoId);

        if (existente.isPresent()) {
            // Ya está en el carrito → incrementamos cantidad
            CarritoItem item = existente.get();
            item.setCantidad(item.getCantidad() + 1);
            carritoRepository.save(item);
            return ResponseEntity.ok(Map.of("mensaje", "Cantidad actualizada"));
        }

        // No existe → lo creamos con cantidad 1
        CarritoItem item = new CarritoItem();
        item.setUsuarioId(usuarioId);
        item.setProducto(producto);
        item.setCantidad(1);
        carritoRepository.save(item);

        return ResponseEntity.ok(Map.of("mensaje", "Producto agregado al carrito"));
    }

    // PUT /carrito/actualizar/{itemId} — cambiar cantidad
    @PutMapping("/actualizar/{itemId}")
    public ResponseEntity<?> actualizar(@PathVariable Long itemId,
                                        @RequestBody Map<String, Integer> body) {
        Integer cantidad = body.get("cantidad");

        CarritoItem item = carritoRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));

        if (cantidad <= 0) {
            // Si la cantidad es 0 o menos, eliminamos el item
            carritoRepository.delete(item);
            return ResponseEntity.ok(Map.of("mensaje", "Producto eliminado del carrito"));
        }

        item.setCantidad(cantidad);
        carritoRepository.save(item);
        return ResponseEntity.ok(Map.of("mensaje", "Cantidad actualizada"));
    }

    // DELETE /carrito/eliminar/{itemId} — eliminar item del carrito
    @DeleteMapping("/eliminar/{itemId}")
    public ResponseEntity<?> eliminar(@PathVariable Long itemId) {
        carritoRepository.deleteById(itemId);
        return ResponseEntity.ok(Map.of("mensaje", "Producto eliminado del carrito"));
    }
}