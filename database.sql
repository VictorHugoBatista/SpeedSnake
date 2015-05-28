/*
SQLyog Community v10.0 
MySQL - 5.6.13-log : Database - speedsnake
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`speedsnake` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `speedsnake`;

/*Table structure for table `ranking` */

DROP TABLE IF EXISTS `ranking`;

CREATE TABLE `ranking` (
  `Name` varchar(3) DEFAULT NULL,
  `Score` tinyint(3) unsigned DEFAULT NULL,
  `Level` tinyint(3) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `ranking` */

insert  into `ranking`(`Name`,`Score`,`Level`) values ('VHB',56,6),('bad',83,9),('pow',36,4),('aws',111,12),('hsv',67,7);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
