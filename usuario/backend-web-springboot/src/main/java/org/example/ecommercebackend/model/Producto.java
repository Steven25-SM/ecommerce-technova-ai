package org.example.ecommercebackend.model;

public class Producto {

    private String nombre;
    private String marca;
    private double precio;
    private int descuento;
    private String categoria;
    private boolean disponible;
    private int stock;

    public Producto(String nombre, String marca, double precio, int descuento,
                    String categoria, boolean disponible, int stock) {
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.descuento = descuento;
        this.categoria = categoria;
        this.disponible = disponible;
        this.stock = stock;
    }

    public String getNombre() {
        return nombre;
    }

    public String getMarca() {
        return marca;
    }

    public double getPrecio() {
        return precio;
    }

    public int getDescuento() {
        return descuento;
    }

    public String getCategoria() {
        return categoria;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public int getStock() {
        return stock;
    }
}