-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.24 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura para tabla lab.budgets
CREATE TABLE IF NOT EXISTS `budgets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL DEFAULT '0',
  `rate_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lab.debits
CREATE TABLE IF NOT EXISTS `debits` (
  `id` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lab.expenses
CREATE TABLE IF NOT EXISTS `expenses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(13,2) DEFAULT NULL,
  `notes` text,
  `date` date DEFAULT NULL,
  `subject` mediumtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `ref` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lab.expenses_dues
CREATE TABLE IF NOT EXISTS `expenses_dues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expense_id` int(11) NOT NULL,
  `amount` decimal(13,2) DEFAULT NULL,
  `taxes` decimal(13,2) DEFAULT NULL,
  `paid_date` date DEFAULT NULL,
  `estimated_date` date DEFAULT NULL,
  `subject` mediumtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lab.fees
CREATE TABLE IF NOT EXISTS `fees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(4) DEFAULT NULL,
  `categ` varchar(50) DEFAULT NULL,
  `sport` varchar(50) DEFAULT NULL,
  `value` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lab.invoices
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ref` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `amount` decimal(13,2) DEFAULT NULL,
  `notes` text,
  `date` date DEFAULT NULL,
  `subject` mediumtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lab.invoices_dues
CREATE TABLE IF NOT EXISTS `invoices_dues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_id` int(11) NOT NULL,
  `amount` decimal(13,2) DEFAULT NULL,
  `taxes` decimal(13,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `subject` mediumtext,
  `date` date DEFAULT NULL,
  `expiration` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lab.memberships
CREATE TABLE IF NOT EXISTS `memberships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `date_up` date NOT NULL,
  `date_down` date DEFAULT NULL,
  `type` char(50) NOT NULL,
  `notes` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lab.players
CREATE TABLE IF NOT EXISTS `players` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `doc_type` varchar(50) NOT NULL,
  `doc_num` varchar(50) NOT NULL,
  `born_date` date NOT NULL,
  `gengre` char(1) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `tel_1` varchar(50) DEFAULT NULL,
  `tel_2` varchar(50) DEFAULT NULL,
  `sport` varchar(50) DEFAULT NULL,
  `authorized` date DEFAULT NULL,
  `os_name` varchar(255) DEFAULT NULL,
  `os_num` varchar(255) DEFAULT NULL,
  `courses` text,
  `notes` text,
  `year` int(11) DEFAULT NULL,
  `fee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `doc_num` (`doc_num`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lab.rates
CREATE TABLE IF NOT EXISTS `rates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `value` int(11) NOT NULL,
  `date_up` date DEFAULT NULL,
  `date_down` date DEFAULT NULL,
  `player_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lab.signings
CREATE TABLE IF NOT EXISTS `signings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) DEFAULT NULL,
  `date_up` date DEFAULT NULL,
  `date_down` date DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lab.subscriptions
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `player_id` int(9) unsigned NOT NULL,
  `date_up` date NOT NULL,
  `date_down` date DEFAULT NULL,
  `method` char(2) NOT NULL,
  `card_num` varchar(255) DEFAULT NULL,
  `card_expiry` varchar(4) DEFAULT NULL,
  `card_operator` varchar(50) DEFAULT NULL,
  `card_type` char(2) DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lab.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first` varchar(255) DEFAULT NULL,
  `last` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
