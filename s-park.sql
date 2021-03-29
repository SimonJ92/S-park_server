-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 06, 2020 at 09:10 AM
-- Server version: 5.7.28
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `s-park`
--
CREATE DATABASE IF NOT EXISTS `s-park` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `s-park`;

-- --------------------------------------------------------

--
-- Table structure for table `parkingspot`
--

CREATE TABLE IF NOT EXISTS `parkingspot` (
  `CameraId` int(11) NOT NULL,
  `SpotNumber` int(11) NOT NULL,
  `IsTaken` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`CameraId`,`SpotNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `camera`
--

CREATE TABLE IF NOT EXISTS `camera` (
  `CameraId` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` double NOT NULL DEFAULT '0',
  `longitude` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`CameraId`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `parkingspot`
--
DROP procedure  IF EXISTS `add_constraint`;
DELIMITER $$
CREATE PROCEDURE `add_constraint`()
Begin

IF NOT EXISTS (SELECT NULL FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
  WHERE CONSTRAINT_SCHEMA = DATABASE()
    AND CONSTRAINT_TYPE = 'FOREIGN KEY'
    AND CONSTRAINT_NAME =   'CameraReference') THEN
  ALTER TABLE `parkingspot`
    ADD CONSTRAINT `CameraReference` FOREIGN KEY (`CameraId`) REFERENCES `camera` (`CameraId`) ON DELETE CASCADE ON UPDATE CASCADE;
END IF ;
END$$

DELIMITER ;

CALL add_constraint();

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
