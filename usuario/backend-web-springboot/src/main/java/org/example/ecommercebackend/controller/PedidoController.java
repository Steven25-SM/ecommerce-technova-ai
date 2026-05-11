package org.example.ecommercebackend.controller;

import org.example.ecommercebackend.model.*;
import org.example.ecommercebackend.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoRepository pedidoRepository;
    private final CarritoRepository carritoRepository;
    private final ProductoRepository productoRepository;

    public PedidoController(PedidoRepository pedidoRepository,
                            CarritoRepository carritoRepository,
                            ProductoRepository productoRepository) {
        this.pedidoRepository   = pedidoRepository;
        this.carritoRepository  = carritoRepository;
        this.productoRepository = productoRepository;
    }

    // GET /pedidos/{usuarioId} — historial de pedidos del usuario
    @GetMapping("/{usuarioId}")
    public List<Pedido> obtener(@PathVariable Long usuarioId) {
        return pedidoRepository.findByUsuarioId(usuarioId);
    }

    // POST /pedidos/checkout — crear pedido desde el carrito
    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody Map<String, Object> body) {
        Long usuarioId       = Long.valueOf(body.get("usuarioId").toString());
        String direccion     = body.get("direccionEnvio").toString();
        String metodoPago    = body.get("metodoPago").toString();

        // Obtenemos el carrito del usuario
        List<CarritoItem> carrito = carritoRepository.findByUsuarioId(usuarioId);

        if (carrito.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "El carrito está vacío"));
        }

        // Calculamos el total
        double total = carrito.stream()
                .mapToDouble(item -> item.getProducto().getPrecio() * item.getCantidad())
                .sum();

        // Creamos el pedido
        Pedido pedido = new Pedido();
        pedido.setUsuarioId(usuarioId);
        pedido.setTotal(total);
        pedido.setEstado("PENDIENTE");
        pedido.setDireccionEnvio(direccion);
        pedido.setMetodoPago(metodoPago);
        pedido.setFecha(LocalDateTime.now());

        // Generamos número de orden único
        pedido.setNumeroOrden("TN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        Pedido pedidoGuardado = pedidoRepository.save(pedido);

        // Creamos los items del pedido desde el carrito
        List<PedidoItem> items = new ArrayList<>(carrito.stream().map(carritoItem -> {
            PedidoItem pi = new PedidoItem();
            pi.setPedido(pedidoGuardado);
            pi.setProducto(carritoItem.getProducto());
            pi.setCantidad(carritoItem.getCantidad());
            pi.setPrecioUnitario(carritoItem.getProducto().getPrecio());
            return pi;
        }).toList());

        pedidoGuardado.setItems(items);
        pedidoRepository.save(pedidoGuardado);

        // Vaciamos el carrito después del checkout
        carritoRepository.deleteByUsuarioId(usuarioId);

        return ResponseEntity.ok(Map.of(
                "mensaje", "Pedido creado exitosamente",
                "numeroOrden", pedidoGuardado.getNumeroOrden(),
                "total", total
        ));
    }
}