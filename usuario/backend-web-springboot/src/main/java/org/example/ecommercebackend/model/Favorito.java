package org.example.ecommercebackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "favorito")
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    public Favorito() {}

    public Long getId() { return id; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }
}