-- MySQL dump 10.13  Distrib 8.4.0, for Linux (aarch64)
--
-- Host: localhost    Database: pencaucu
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `final_predictions`
--

DROP TABLE IF EXISTS `final_predictions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `final_predictions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `winning_team_id` int NOT NULL,
  `runner_up_team_id` int NOT NULL,
  `points` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `winning_team_id` (`winning_team_id`),
  KEY `runner_up_team_id` (`runner_up_team_id`),
  CONSTRAINT `final_predictions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `final_predictions_ibfk_2` FOREIGN KEY (`winning_team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `final_predictions_ibfk_3` FOREIGN KEY (`runner_up_team_id`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `final_predictions`
--

LOCK TABLES `final_predictions` WRITE;
/*!40000 ALTER TABLE `final_predictions` DISABLE KEYS */;
INSERT INTO `final_predictions` VALUES (18,56,8,19,0),(19,75,20,13,15);
/*!40000 ALTER TABLE `final_predictions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `team_one_score` int DEFAULT NULL,
  `team_two_score` int DEFAULT NULL,
  `phase` varchar(50) NOT NULL,
  `team_one_id` int NOT NULL,
  `team_two_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team_one_id` (`team_one_id`),
  KEY `team_two_id` (`team_two_id`),
  CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`team_one_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`team_two_id`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES (75,'2024-06-20 18:00:00',3,4,'Grupo A',8,11),(76,'2024-06-21 18:00:00',2,2,'Grupo A',9,10),(77,'2024-06-24 18:00:00',4,4,'Grupo A',9,11),(78,'2024-06-25 19:00:00',3,4,'Grupo A',8,10),(79,'2024-06-29 16:00:00',3,4,'Grupo A',8,9),(80,'2024-06-29 21:00:00',NULL,NULL,'Grupo A',10,11),(81,'2024-06-22 16:00:00',2,4,'Grupo B',13,14),(82,'2024-06-22 19:00:00',6,5,'Grupo B',12,15),(83,'2024-06-26 19:00:00',NULL,NULL,'Grupo B',13,15),(84,'2024-06-26 22:00:00',NULL,NULL,'Grupo B',12,14),(85,'2024-06-30 21:00:00',NULL,NULL,'Grupo B',14,15),(86,'2024-06-30 21:00:00',NULL,NULL,'Grupo B',12,13),(87,'2024-06-23 16:00:00',32,2,'Grupo C',16,19),(88,'2024-06-23 19:00:00',32,2,'Grupo C',17,18),(89,'2024-06-27 19:00:00',NULL,NULL,'Grupo C',16,18),(90,'2024-06-27 22:00:00',NULL,NULL,'Grupo C',17,19),(91,'2024-07-01 22:00:00',NULL,NULL,'Grupo C',18,19),(92,'2024-07-01 22:00:00',NULL,NULL,'Grupo C',16,17),(93,'2024-06-24 16:00:00',2,3,'Grupo D',21,22),(94,'2024-06-24 19:00:00',2,3,'Grupo D',20,23),(95,'2024-06-28 19:00:00',NULL,NULL,'Grupo D',21,23),(96,'2024-06-28 22:00:00',NULL,NULL,'Grupo D',20,22),(97,'2024-07-02 22:00:00',NULL,NULL,'Grupo D',22,23),(98,'2024-07-02 19:00:00',NULL,NULL,'Grupo D',20,21),(107,'2024-06-29 12:28:00',3,3,'Semifinal',10,16);
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predictions`
--

DROP TABLE IF EXISTS `predictions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `predictions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `match_id` int NOT NULL,
  `team_one_score` int NOT NULL,
  `team_two_score` int NOT NULL,
  `points` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `match_id` (`match_id`),
  CONSTRAINT `predictions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `predictions_ibfk_2` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predictions`
--

LOCK TABLES `predictions` WRITE;
/*!40000 ALTER TABLE `predictions` DISABLE KEYS */;
INSERT INTO `predictions` VALUES (18,56,77,3,3,0),(19,56,78,3,4,4),(20,56,79,2,2,0),(21,75,79,3,4,4),(22,75,89,3,3,0);
/*!40000 ALTER TABLE `predictions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'ADMIN'),(1,'USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (8,'Argentina'),(9,'Perú'),(10,'Chile'),(11,'Canadá'),(12,'México'),(13,'Ecuador'),(14,'Venezuela'),(15,'Jamaica'),(16,'Estados Unidos'),(17,'Uruguay'),(18,'Panamá'),(19,'Bolivia'),(20,'Brasil'),(21,'Colombia'),(22,'Paraguay'),(23,'Costa Rica'),(25,'prueba2'),(27,'prueba3'),(30,'prueba453232');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role_id` int NOT NULL,
  `career` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (56,'Nicolas','Nicolas','$2a$10$K0UAWZIBCjDI47/toRFsnOeIRzNdON2P9646iNZBxQFmbRI9JVxWG','2024-06-25 00:45:27',1,'Informatica'),(74,'admin','admin','$2a$10$oRE/05f02leqHPMaEKA7NevNW33J7I8sT3Lv3AawknBjPUuIoL4ei','2024-06-25 22:08:02',2,NULL),(75,'Vicky','Vicky','$2a$10$O2CVSpaE7YVjpVs8Tg7bIukn168.15lHT0B7eOFbKG2QHZ//MnOFS','2024-06-26 04:49:26',1,'Traductorado');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-26 21:56:17
