package org.example.ecommercebackend.controller;

import org.example.ecommercebackend.model.Producto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductoController {

    @GetMapping("/productos")
    public List<Producto> listar() {
        return List.of(
                new Producto("Laptop LOQ RTX 3050", "Lenovo", 3199, 9, "Laptop", true, 5),
                new Producto("Laptop Victus RTX 3050", "HP", 3199, 22, "Laptop", true, 6),
                new Producto("ROG Strix G16", "Asus", 8999, 0, "Laptop", true, 2),
                new Producto("Laptop V16 RTX 3050", "Asus", 3899, 13, "Laptop", true, 4),
                new Producto("Legion 5 OLED", "Lenovo", 5299, 24, "Laptop", true, 3),

                new Producto("Monitor Odyssey G5 27", "Samsung", 1199, 15, "Monitor", true, 10),
                new Producto("Monitor Gamer 24 144Hz", "LG", 899, 10, "Monitor", true, 8),
                new Producto("Monitor TUF 165Hz", "Asus", 999, 12, "Monitor", true, 5),

                new Producto("Mouse G502 Hero", "Logitech", 199, 20, "Mouse", true, 15),
                new Producto("Mouse DeathAdder V2", "Razer", 189, 15, "Mouse", true, 12),
                new Producto("Mouse Pulsefire", "HyperX", 149, 10, "Mouse", true, 9),

                new Producto("Teclado Alloy Origins", "HyperX", 299, 18, "Teclado", true, 7),
                new Producto("Teclado BlackWidow", "Razer", 399, 12, "Teclado", true, 4),
                new Producto("Teclado G Pro", "Logitech", 359, 15, "Teclado", true, 6),

                new Producto("Audífonos G733", "Logitech", 499, 10, "Audifonos", true, 8),
                new Producto("Cloud II", "HyperX", 349, 20, "Audifonos", true, 10),
                new Producto("BlackShark V2", "Razer", 399, 15, "Audifonos", true, 5),

                new Producto("SSD NVMe 1TB", "Kingston", 299, 8, "Almacenamiento", true, 20),
                new Producto("SSD 512GB", "Crucial", 179, 10, "Almacenamiento", true, 18),
                new Producto("USB 128GB", "SanDisk", 59, 5, "Almacenamiento", true, 25),

                new Producto("Webcam C920", "Logitech", 249, 10, "Accesorios", true, 7),
                new Producto("Router Archer C6", "TP-Link", 189, 12, "Redes", true, 9),
                new Producto("Smartwatch Redmi Watch", "Xiaomi", 229, 18, "Wearables", true, 11),
                new Producto("Tablet Galaxy Tab A9", "Samsung", 799, 10, "Tablet", true, 6),
                new Producto("Laptop Nitro 5", "Acer", 3499, 14, "Laptop", true, 4)
        );
    }
}