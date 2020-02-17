-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.19 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para tkrs9qzdk0
DROP DATABASE IF EXISTS `tkrs9qzdk0`;
CREATE DATABASE IF NOT EXISTS `tkrs9qzdk0` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `tkrs9qzdk0`;

-- Volcando estructura para tabla tkrs9qzdk0.budgets
DROP TABLE IF EXISTS `budgets`;
CREATE TABLE IF NOT EXISTS `budgets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL DEFAULT '0',
  `rate_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla tkrs9qzdk0.debits
DROP TABLE IF EXISTS `debits`;
CREATE TABLE IF NOT EXISTS `debits` (
  `id` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla tkrs9qzdk0.dues
DROP TABLE IF EXISTS `dues`;
CREATE TABLE IF NOT EXISTS `dues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group` varchar(50) DEFAULT NULL,
  `month` int(2) DEFAULT NULL,
  `year` int(2) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `notes` text,
  `categ` varchar(50) DEFAULT NULL,
  `sport` varchar(50) DEFAULT NULL,
  `value` float DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla tkrs9qzdk0.expenses
DROP TABLE IF EXISTS `expenses`;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla tkrs9qzdk0.expenses_dues
DROP TABLE IF EXISTS `expenses_dues`;
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
-- Volcando estructura para tabla tkrs9qzdk0.fees
DROP TABLE IF EXISTS `fees`;
CREATE TABLE IF NOT EXISTS `fees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `month` int(2) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `title` text,
  `ref` varchar(50) DEFAULT NULL,
  `notes` text,
  `categ` varchar(50) DEFAULT NULL,
  `sport` varchar(50) DEFAULT NULL,
  `value` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=361 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para procedimiento tkrs9qzdk0.init
DROP PROCEDURE IF EXISTS `init`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `init`()
BEGIN

select * from players;
select * from fees;
SELECT id, `group`, month, year, active, notes, categ, sport, value FROM dues WHERE deleted_at IS NULL;
select * from debits;
select * from invoices;
select * from expenses;
select * from subscriptions;
select * from notes;
select * from memberships;
select * from signings;
select * from rates;
SELECT id, player_id, fee_id FROM players_fees WHERE deleted_at IS NULL;

END//
DELIMITER ;

-- Volcando estructura para tabla tkrs9qzdk0.invoices
DROP TABLE IF EXISTS `invoices`;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla tkrs9qzdk0.invoices_dues
DROP TABLE IF EXISTS `invoices_dues`;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla tkrs9qzdk0.memberships
DROP TABLE IF EXISTS `memberships`;
CREATE TABLE IF NOT EXISTS `memberships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `date_up` date NOT NULL,
  `date_down` date DEFAULT NULL,
  `type` char(50) NOT NULL,
  `notes` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla tkrs9qzdk0.notes
DROP TABLE IF EXISTS `notes`;
CREATE TABLE IF NOT EXISTS `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_up` date DEFAULT NULL,
  `title` text COLLATE utf8_unicode_ci,
  `type` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `text` text COLLATE utf8_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla tkrs9qzdk0.players
DROP TABLE IF EXISTS `players`;
CREATE TABLE IF NOT EXISTS `players` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) unsigned DEFAULT '1',
  `sticker` varchar(50) DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `doc_type` varchar(50) DEFAULT NULL,
  `doc_num` varchar(50) DEFAULT NULL,
  `born_date` date DEFAULT NULL,
  `gengre` char(1) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `tel_1` varchar(50) DEFAULT NULL,
  `tel_2` varchar(50) DEFAULT NULL,
  `sport` varchar(50) DEFAULT NULL,
  `authorized` date DEFAULT NULL,
  `os_name` varchar(255) DEFAULT NULL,
  `os_num` varchar(255) DEFAULT NULL,
  `courses` text,
  `notes` text,
  `fee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `doc_num` (`doc_num`)
) ENGINE=InnoDB AUTO_INCREMENT=318 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla tkrs9qzdk0.players_fees
DROP TABLE IF EXISTS `players_fees`;
CREATE TABLE IF NOT EXISTS `players_fees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) DEFAULT NULL,
  `fee_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `player_id_fee_id` (`player_id`,`fee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla tkrs9qzdk0.rates
DROP TABLE IF EXISTS `rates`;
CREATE TABLE IF NOT EXISTS `rates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `value` int(11) NOT NULL,
  `date_up` date DEFAULT NULL,
  `date_down` date DEFAULT NULL,
  `player_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla tkrs9qzdk0.signings
DROP TABLE IF EXISTS `signings`;
CREATE TABLE IF NOT EXISTS `signings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) DEFAULT NULL,
  `date_up` date DEFAULT NULL,
  `date_down` date DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla tkrs9qzdk0.subscriptions
DROP TABLE IF EXISTS `subscriptions`;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla tkrs9qzdk0.users
DROP TABLE IF EXISTS `users`;
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
