package org.example.ecommercebackend.model;

import jakarta.persistence.*;

@Entity
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String marca;
    private String categoria;
    private Double precio;
    private Integer stock;
    private String descripcion;
    private String imagenUrl;
    private Boolean destacado;
    private Integer descuento;
    private Boolean disponible;

    public Producto() {
    }

    public Producto(String nombre, String marca, String categoria,
                    Double precio, Integer stock, String descripcion,
                    String imagenUrl, Boolean destacado,
                    Integer descuento, Boolean disponible) {
        this.nombre = nombre;
        this.marca = marca;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
        this.descripcion = descripcion;
        this.imagenUrl = imagenUrl;
        this.destacado = destacado;
        this.descuento = descuento;
        this.disponible = disponible;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getMarca() {
        return marca;
    }

    public String getCategoria() {
        return categoria;
    }

    public Double getPrecio() {
        return precio;
    }

    public Integer getStock() {
        return stock;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public Boolean getDestacado() {
        return destacado;
    }

    public Integer getDescuento() {
        return descuento;
    }

    public Boolean getDisponible() {
        return disponible;
    }
}