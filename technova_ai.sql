-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-04-2026 a las 18:16:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `technova_ai`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` bigint(20) NOT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `descuento` int(11) DEFAULT NULL,
  `destacado` bit(1) DEFAULT NULL,
  `disponible` bit(1) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `categoria`, `descripcion`, `descuento`, `destacado`, `disponible`, `imagen_url`, `marca`, `nombre`, `precio`, `stock`) VALUES
(1, 'Laptop', 'Laptop gamer Ryzen 5 16GB RAM', 10, b'1', b'1', '/images/laptop-LOQ15.jpg', 'Lenovo', 'Laptop Lenovo LOQ 15', 3299.9, 12),
(2, 'Laptop', 'Laptop Intel i5 RTX 3050', 15, b'1', b'1', '/images/laptop-victus15.jpg', 'HP', 'HP Victus 15', 3499.9, 10),
(3, 'Laptop', 'Laptop gaming 144Hz', 5, b'0', b'1', '/images/laptop-ASUS15.jpg', 'ASUS', 'ASUS TUF F15', 3899.9, 8),
(4, 'Laptop', 'Laptop gamer Nitro', 8, b'0', b'1', '/images/laptop-ACER5.jpg', 'Acer', 'Acer Nitro 5', 3599.9, 6),
(5, 'Audifonos', 'Audífonos inalámbricos gaming', 0, b'1', b'1', '/images/audifono-logitech.jpg', 'Logitech', 'Logitech G435', 249.9, 20),
(6, 'Audifonos', 'Audio envolvente 7.1', 10, b'0', b'1', '/images/auricular-hyperxcloud.jpg', 'HyperX', 'HyperX Cloud II', 299.9, 15),
(7, 'Audifonos', 'Audífonos ligeros', 5, b'0', b'1', '/images/audifono-razerkrakenX.jpg', 'Razer', 'Razer Kraken X', 199.9, 18),
(8, 'Audifonos', 'Bluetooth y batería larga', 0, b'0', b'1', '/images/auricular-bluetoothSony.jpg', 'Sony', 'Sony WH-CH520', 179.9, 22),
(9, 'Teclado', 'Teclado mecánico RGB', 10, b'1', b'1', '/images/teclado-redragon.jpg', 'Redragon', 'Redragon K552', 159.9, 25),
(10, 'Teclado', 'Teclado gamer RGB', 5, b'0', b'1', '/images/teclado-logitechG213.jpg', 'Logitech', 'Logitech G213', 189.9, 16),
(11, 'Teclado', 'Membrana RGB', 0, b'0', b'1', '/images/teclado-razer.jpg', 'Razer', 'Razer Cynosa V2', 219.9, 14),
(12, 'Mouse', 'Mouse gaming RGB', 0, b'1', b'1', '/images/mouse-logitechG203.jpg', 'Logitech', 'Logitech G203', 99.9, 30),
(13, 'Mouse', 'Sensor HERO', 10, b'0', b'1', '/images/mouse-logitechG502.jpg', 'Logitech', 'Logitech G502', 229.9, 18),
(14, 'Mouse', 'Ergonómico gaming', 5, b'0', b'1', '/images/mouse-deathadder.jpg', 'Razer', 'Razer DeathAdder', 179.9, 17),
(15, 'Monitor', 'Monitor IPS 75Hz', 10, b'1', b'1', '/images/monitor-lg24.jpg', 'LG', 'LG 24 IPS', 699.9, 9),
(16, 'Monitor', 'Gaming 165Hz', 15, b'1', b'1', '/images/monitor-OdysseyG3.jpg', 'Samsung', 'Samsung Odyssey G3', 999.9, 7),
(17, 'Monitor', 'Full HD 27 pulgadas', 0, b'0', b'1', '/images/monitor-AOC27.jpg', 'AOC', 'AOC 27', 899.9, 6),
(18, 'Almacenamiento', 'SSD SATA', 0, b'0', b'1', '/images/SSD-KingstonA400.jpg', 'Kingston', 'Kingston SSD 480GB', 159.9, 40),
(19, 'Almacenamiento', 'SSD NVMe', 10, b'1', b'1', '/images/SSD-samsung1TB.jpg', 'Samsung', 'Samsung SSD 1TB', 329.9, 25),
(20, 'Almacenamiento', 'Disco duro interno', 5, b'0', b'1', '/images/ssd-blue1TB.jpg', 'Western Digital', 'WD Blue 1TB', 229.9, 20),
(21, 'Router', 'Router dual band', 0, b'0', b'1', '/images/router-TP-LINK.jpg', 'TP-Link', 'TP-Link Archer C6', 149.9, 14),
(22, 'Webcam', 'Full HD webcam', 10, b'0', b'1', '/images/camara-logitechC920.jpg', 'Logitech', 'Logitech C920', 289.9, 10),
(23, 'Microfono', 'Micrófono USB', 5, b'0', b'1', '/images/microfono-hyperX.jpg', 'HyperX', 'HyperX SoloCast', 249.9, 11),
(24, 'Accesorio', 'Base refrigerante', 0, b'0', b'1', '/images/laptop-coolerbase.jpg', 'Cooler Master', 'Laptop Cooler Base', 89.9, 25),
(25, 'Accesorio', 'USB Hub 3.0', 0, b'0', b'1', '/images/usb-HUB3.0.jpg', 'UGREEN', 'USB Hub 4 Puertos', 59.9, 35),
(26, 'Accesorio', 'Mochila para laptop 15.6', 0, b'0', b'1', '/images/mochila-laptop.jpg', 'Targus', 'Mochila Laptop', 129.9, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
