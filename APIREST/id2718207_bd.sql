-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 29, 2017 at 08:16 PM
-- Server version: 10.1.20-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id2718207_bd`
--

-- --------------------------------------------------------

--
-- Table structure for table `juegos`
--

CREATE TABLE `juegos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `juegos`
--

INSERT INTO `juegos` (`id`, `nombre`) VALUES
(1, 'Adivina el numero'),
(2, 'Agilidad aritmetica'),
(3, 'Agudeza visual'),
(4, 'Anagrama'),
(5, 'Piedra, papel o tijera');

-- --------------------------------------------------------

--
-- Table structure for table `jugadas`
--

CREATE TABLE `jugadas` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idJuego` int(11) NOT NULL,
  `momento` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `gano` int(11) NOT NULL,
  `puntos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `jugadas`
--

INSERT INTO `jugadas` (`id`, `idUsuario`, `idJuego`, `momento`, `gano`, `puntos`) VALUES
(1, 1, 2, '1509239502564', 1, 6),
(2, 3, 3, '1509239505564', 0, 0),
(3, 4, 4, '1509259502564', 1, 3),
(4, 9, 5, '1509239552564', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `resumenjugadas`
--

CREATE TABLE `resumenjugadas` (
  `id` int(11) NOT NULL,
  `jugadorId` int(11) NOT NULL,
  `puntos` int(11) NOT NULL,
  `jugadas` int(11) NOT NULL,
  `ganadas` int(11) NOT NULL,
  `perdidas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `resumenjugadas`
--

INSERT INTO `resumenjugadas` (`id`, `jugadorId`, `puntos`, `jugadas`, `ganadas`, `perdidas`) VALUES
(1, 1, 20, 5, 2, 3),
(2, 3, 10, 2, 1, 1),
(3, 4, 100, 3, 1, 2),
(4, 9, 50, 4, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `idRol` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `idRol`, `idUsuario`) VALUES
(1, 1, 1),
(2, 2, 3),
(3, 3, 4),
(7, 3, 9);

-- --------------------------------------------------------

--
-- Table structure for table `tiposroles`
--

CREATE TABLE `tiposroles` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tiposroles`
--

INSERT INTO `tiposroles` (`id`, `descripcion`) VALUES
(1, 'administrador'),
(2, 'comprador'),
(3, 'vendedor');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `apellido` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `alias` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `habilitado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `password`, `alias`, `habilitado`) VALUES
(1, 'Elias', 'Rodriguez', 'a@a.com', 'a', 'virtualElias', 1),
(3, 'John', 'Salchichon', 'johns@gmail.com', 'a', 'johnyTolengo', 1),
(4, 'Pruebas', 'PruebaAs', 'a@b.coms', 'as', 'virtualPruebas', 0),
(9, 'Alexis', 'Roman', 'artear@once.com', '4', 'Tomy4', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jugadas`
--
ALTER TABLE `jugadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idJuego` (`idJuego`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `resumenjugadas`
--
ALTER TABLE `resumenjugadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idJugador` (`jugadorId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRol` (`idRol`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `tiposroles`
--
ALTER TABLE `tiposroles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `juegos`
--
ALTER TABLE `juegos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `jugadas`
--
ALTER TABLE `jugadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `resumenjugadas`
--
ALTER TABLE `resumenjugadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tiposroles`
--
ALTER TABLE `tiposroles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `jugadas`
--
ALTER TABLE `jugadas`
  ADD CONSTRAINT `jugadas_ibfk_1` FOREIGN KEY (`idJuego`) REFERENCES `juegos` (`id`),
  ADD CONSTRAINT `jugadas_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `resumenjugadas`
--
ALTER TABLE `resumenjugadas`
  ADD CONSTRAINT `resumenjugadas_ibfk_1` FOREIGN KEY (`jugadorId`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `tiposroles` (`id`),
  ADD CONSTRAINT `roles_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
