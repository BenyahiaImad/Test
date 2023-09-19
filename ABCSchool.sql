-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 19 sep. 2023 à 16:52
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ABCSchool`
--

-- --------------------------------------------------------

--
-- Structure de la table `Employees`
--

CREATE TABLE `Employees` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `department` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Employees`
--

INSERT INTO `Employees` (`id`, `lastName`, `firstName`, `dateCreated`, `department`) VALUES
('07a83f5e-255d-433f-b4c6-09521b69315d', 'BENYAHIA', 'Imad Eddine', '2023-09-19 13:12:55', 'Systeme Informatique'),
('422b533c-77b7-4e9b-a0cd-83504d588d5f', 'BENYAHIA', 'Rabeh', '2023-09-18 13:18:24', 'Direction Generale');

-- --------------------------------------------------------

--
-- Structure de la table `Presences`
--

CREATE TABLE `Presences` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `checkInTime` datetime NOT NULL,
  `checkOutTime` datetime DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `timeDifference` int(11) DEFAULT NULL,
  `IdEmployee` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Presences`
--

INSERT INTO `Presences` (`id`, `checkInTime`, `checkOutTime`, `comment`, `timeDifference`, `IdEmployee`) VALUES
('3060ac0b-1020-483f-9cc9-c49472d37134', '2023-09-19 13:38:04', '2023-09-19 13:41:43', 'presented finished', 3, '07a83f5e-255d-433f-b4c6-09521b69315d');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Presences`
--
ALTER TABLE `Presences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IdEmployee` (`IdEmployee`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Presences`
--
ALTER TABLE `Presences`
  ADD CONSTRAINT `presences_ibfk_1` FOREIGN KEY (`IdEmployee`) REFERENCES `Employees` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
