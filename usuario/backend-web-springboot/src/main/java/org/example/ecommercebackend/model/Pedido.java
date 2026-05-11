package org.example.ecommercebackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id")
    private Long usuarioId;

    private Double total;
    private String estado;

    @Column(name = "direccion_envio")
    private String direccionEnvio;

    @Column(name = "metodo_pago")
    private String metodoPago;

    @Column(name = "numero_orden", unique = true)
    private String numeroOrden;

    private LocalDateTime fecha;

    // Un pedido tiene muchos items
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<PedidoItem> items;

    public Pedido() {}

    public Long getId() { return id; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getDireccionEnvio() { return direccionEnvio; }
    public void setDireccionEnvio(String direccionEnvio) { this.direccionEnvio = direccionEnvio; }
    public String getMetodoPago() { return metodoPago; }
    public void setMetodoPago(String metodoPago) { this.metodoPago = metodoPago; }
    public String getNumeroOrden() { return numeroOrden; }
    public void setNumeroOrden(String numeroOrden) { this.numeroOrden = numeroOrden; }
    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
    public List<PedidoItem> getItems() { return items; }
    public void setItems(List<PedidoItem> items) { this.items = items; }
}