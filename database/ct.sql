-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-09-2021 a las 04:25:14
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ct`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuestionarios`
--

CREATE TABLE `cuestionarios` (
  `idcuestionarios` int(11) NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `usuarioCreador` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cuestionarios`
--

INSERT INTO `cuestionarios` (`idcuestionarios`, `fechaCreacion`, `usuarioCreador`, `descripcion`, `estado`) VALUES
(1, '2021-09-14 23:14:02', 'Ariel._.', 'c1', 'Habilitado'),
(2, '2021-09-14 23:34:55', 'ariel3259', 'c1(Clon)', 'Habilitado'),
(3, '2021-09-14 23:34:57', 'ariel3259', 'c1(Clon)(Clon)', 'Habilitado'),
(4, '2021-09-15 00:35:56', 'ariel3259', '2', 'Habilitado'),
(5, '2021-09-15 00:35:59', 'ariel3259', '3', 'Habilitado'),
(6, '2021-09-15 00:36:03', 'ariel3259', '4', 'Habilitado'),
(7, '2021-09-15 00:36:05', 'ariel3259', '4(Clon)', 'Habilitado'),
(8, '2021-09-15 00:36:07', 'ariel3259', '4(Clon)(Clon)', 'Habilitado'),
(9, '2021-09-15 00:36:08', 'ariel3259', '4(Clon)(Clon)(Clon)', 'Habilitado'),
(10, '2021-09-15 00:36:10', 'ariel3259', '4(Clon)(Clon)', 'Habilitado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `idcuestionarios` int(11) NOT NULL,
  `idpreguntas` int(11) NOT NULL,
  `idusuarios` int(11) NOT NULL,
  `respuestas` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enlaces`
--

CREATE TABLE `enlaces` (
  `idcuestionarios` int(11) NOT NULL,
  `idpreguntas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `enlaces`
--

INSERT INTO `enlaces` (`idcuestionarios`, `idpreguntas`) VALUES
(1, 1),
(1, 10),
(1, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntarespuesta`
--

CREATE TABLE `preguntarespuesta` (
  `idrespuestas` int(11) NOT NULL,
  `idpreguntas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `idpreguntas` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`idpreguntas`, `descripcion`, `estado`, `categoria`) VALUES
(1, '|1', 'Habilitado', 'Deporte'),
(2, '2', 'Habilitado', 'Deporte'),
(3, '3', 'Habilitado', 'Deporte'),
(4, '4', 'Habilitado', 'Deporte'),
(5, '5', 'Habilitado', 'Deporte'),
(6, '6', 'Habilitado', 'Deporte'),
(7, '7', 'Habilitado', 'Deporte'),
(8, '8', 'Habilitado', 'Deporte'),
(9, '9', 'Habilitado', 'Deporte'),
(10, '10', 'Habilitado', 'Deporte'),
(11, '11', 'Habilitado', 'Deporte');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `idrespuesta` int(11) NOT NULL,
  `respuestas` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `user` varchar(100) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `uid` varchar(50) DEFAULT NULL,
  `fullName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idUser`, `user`, `rol`, `password`, `uid`, `fullName`) VALUES
(1, 'Ariel._.', 'user', NULL, 'HoOthx12wDXDEj0ddJJWbHOx0DI2', NULL),
(2, 'Ariel Santangelo', 'user', NULL, '5IIez835r7gSRgP7O92yGqYLR8n2', NULL),
(3, 'ariel3259', 'user', '$2a$08$HmlZt0/VKwjijYlfAXG4veSeqMB9IiDQLtqSal2BYgiG/bZp7gt8a', NULL, 'ariel e.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cuestionarios`
--
ALTER TABLE `cuestionarios`
  ADD PRIMARY KEY (`idcuestionarios`);

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`idcuestionarios`,`idpreguntas`,`idusuarios`),
  ADD KEY `idpreguntas` (`idpreguntas`),
  ADD KEY `idusuarios` (`idusuarios`);

--
-- Indices de la tabla `enlaces`
--
ALTER TABLE `enlaces`
  ADD UNIQUE KEY `idcuestionarios` (`idcuestionarios`,`idpreguntas`),
  ADD KEY `idpreguntas` (`idpreguntas`);

--
-- Indices de la tabla `preguntarespuesta`
--
ALTER TABLE `preguntarespuesta`
  ADD PRIMARY KEY (`idrespuestas`,`idpreguntas`),
  ADD KEY `idpreguntas` (`idpreguntas`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`idpreguntas`),
  ADD UNIQUE KEY `descripcion` (`descripcion`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`idrespuesta`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `user` (`user`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD UNIQUE KEY `fullName` (`fullName`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD CONSTRAINT `encuestas_ibfk_1` FOREIGN KEY (`idcuestionarios`) REFERENCES `enlaces` (`idcuestionarios`),
  ADD CONSTRAINT `encuestas_ibfk_2` FOREIGN KEY (`idpreguntas`) REFERENCES `enlaces` (`idpreguntas`),
  ADD CONSTRAINT `encuestas_ibfk_3` FOREIGN KEY (`idusuarios`) REFERENCES `users` (`idUser`);

--
-- Filtros para la tabla `enlaces`
--
ALTER TABLE `enlaces`
  ADD CONSTRAINT `enlaces_ibfk_1` FOREIGN KEY (`idcuestionarios`) REFERENCES `cuestionarios` (`idcuestionarios`),
  ADD CONSTRAINT `enlaces_ibfk_2` FOREIGN KEY (`idpreguntas`) REFERENCES `preguntas` (`idpreguntas`);

--
-- Filtros para la tabla `preguntarespuesta`
--
ALTER TABLE `preguntarespuesta`
  ADD CONSTRAINT `preguntarespuesta_ibfk_1` FOREIGN KEY (`idpreguntas`) REFERENCES `preguntas` (`idpreguntas`),
  ADD CONSTRAINT `preguntarespuesta_ibfk_2` FOREIGN KEY (`idrespuestas`) REFERENCES `respuestas` (`idrespuesta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
