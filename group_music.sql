CREATE DATABASE  IF NOT EXISTS `group_music` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `group_music`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: group_music
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chatmessages`
--

DROP TABLE IF EXISTS `chatmessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatmessages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` longtext NOT NULL,
  `senderId` int NOT NULL,
  `senderName` varchar(100) NOT NULL,
  `groupId` int NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `msgSenderId_idx` (`senderId`),
  KEY `chatMessagegroupId_idx` (`groupId`),
  CONSTRAINT `chatMessagegroupId` FOREIGN KEY (`groupId`) REFERENCES `groupsdata` (`id`) ON DELETE CASCADE,
  CONSTRAINT `msgSenderId` FOREIGN KEY (`senderId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatmessages`
--

LOCK TABLES `chatmessages` WRITE;
/*!40000 ALTER TABLE `chatmessages` DISABLE KEYS */;
INSERT INTO `chatmessages` VALUES (45,'Hi all',23,'ownerstatustest',24,'2024-08-07 22:46:38'),(46,'this is owNerstatustest',23,'ownerstatustest',24,'2024-08-07 22:47:01'),(47,'Hi ownerstatustest',22,'statustestmem',24,'2024-08-07 22:47:23'),(48,'Hi all this is 3rd member',11,'3rd member',24,'2024-08-07 22:47:42'),(49,'admin has left',22,'statustestmem',24,'2024-08-07 22:48:32'),(50,'yes he has left',11,'3rd member',24,'2024-08-07 22:48:39'),(51,'I am back now',23,'ownerstatustest',24,'2024-08-07 22:49:00'),(52,'long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test long message test',22,'statustestmem',24,'2024-08-07 22:50:21'),(53,'it works fine',11,'3rd member',24,'2024-08-07 22:51:28'),(54,'cool',23,'ownerstatustest',24,'2024-08-07 22:51:35'),(55,'aight!!!',22,'statustestmem',24,'2024-08-07 22:51:47'),(56,'bye! need to go',22,'statustestmem',24,'2024-08-07 22:54:33'),(57,'bye!',11,'3rd member',24,'2024-08-07 22:54:48'),(58,'hey everyone',22,'doraemon',7,'2024-08-07 23:08:12'),(59,'hi',23,'ahd100',7,'2024-08-07 23:08:46'),(60,'hey',23,'ownerstatustest',24,'2024-08-10 15:12:36'),(61,'hi',22,'statustestmem',24,'2024-08-10 15:13:02'),(62,'how are you doing',23,'ownerstatustest',24,'2024-08-10 15:13:10'),(63,'doing good',22,'statustestmem',24,'2024-08-10 15:13:18'),(64,'wbu?',22,'statustestmem',24,'2024-08-10 15:13:22'),(65,'I am good...!!',23,'ownerstatustest',24,'2024-08-10 15:13:31'),(69,'hi',22,'testduplicategroupowner',23,'2024-08-20 21:05:03'),(70,'kaisa hai ye',22,'statustestmem',24,'2024-08-20 22:27:12'),(71,'my favourite',23,'ownerstatustest',24,'2024-08-20 22:27:20'),(72,'next sun',22,'statustestmem',24,'2024-08-20 22:27:29'),(73,'hi bois!!',23,'ownerstatustest',24,'2024-08-27 21:31:22'),(74,'hey everyone',11,'3rd member',24,'2024-08-27 21:31:35'),(75,'hey there',22,'statustestmem',24,'2024-08-27 21:31:47'),(76,'Hi',22,'statustestmem',24,'2024-08-31 13:34:25'),(77,'hey',23,'ownerstatustest',24,'2024-09-11 22:36:01'),(78,'hey there',22,'statustestmem',24,'2024-09-11 22:36:14');
/*!40000 ALTER TABLE `chatmessages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupmusicdetails`
--

DROP TABLE IF EXISTS `groupmusicdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupmusicdetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `musicId` varchar(100) NOT NULL,
  `groupId` int NOT NULL,
  `playing` int NOT NULL,
  `artistId` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `groupMusicGroupId_idx` (`groupId`),
  CONSTRAINT `groupMusicGroupId` FOREIGN KEY (`groupId`) REFERENCES `groupsdata` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupmusicdetails`
--

LOCK TABLES `groupmusicdetails` WRITE;
/*!40000 ALTER TABLE `groupmusicdetails` DISABLE KEYS */;
INSERT INTO `groupmusicdetails` VALUES (3,'1WaqQIJ0iENGWZ1QmYvYNK',1,0,''),(4,'34Fh4HXZmnuBdtgejWUZg2',12,0,''),(5,'7e6qTHVfRdaYsio90s1fHC',9,1,'6CXEwIaXYfVJ84biCxqc9k'),(6,'23YpzkTDtU78GK6vpgRbkM',6,0,'6Mv8GjQa7LKUGCAqa9qqdb'),(7,'1sxh0eqIb8ulYypPuq6ZRu',7,0,''),(8,'4r8JqkhpTb5tzSKKHnVJIJ',8,0,''),(9,'4eu27jAU2bbnyHUC3G75U8',23,0,''),(10,'6FjbAnaPRPwiP3sciEYctO',22,0,''),(11,'6ND2THVLeOyEyS8uxwBwil',21,0,''),(12,'56YL27bYDkVZPWf3FazjLk',20,0,''),(13,'6K6etxmlu4Y7J3dR77MK3N',13,0,''),(14,'5PUXKVVVQ74C3gl5vKy9Li',2,0,''),(15,'4cFwhwH5ydnHgB0Tv3lZsm',4,0,''),(16,'5c3mUtkS8FvumKaVkcpB0H',3,0,''),(17,'2vPrBucKCfKmafHhSfJ2pt',5,0,''),(21,'0dLbrlAVPPjpPqnYfmJsWk',24,0,'2oSONSC9zQ4UonDKnLqksx');
/*!40000 ALTER TABLE `groupmusicdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupsdata`
--

DROP TABLE IF EXISTS `groupsdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupsdata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `groupName` varchar(100) NOT NULL,
  `groupSecretCode` varchar(250) NOT NULL,
  `ownerId` int NOT NULL,
  `displayName` varchar(200) NOT NULL,
  `dateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `songImage` longtext,
  `songName` varchar(150) DEFAULT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `groupSecretCode_UNIQUE` (`groupSecretCode`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId_idx` (`ownerId`),
  CONSTRAINT `userIdOwner` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupsdata`
--

LOCK TABLES `groupsdata` WRITE;
/*!40000 ALTER TABLE `groupsdata` DISABLE KEYS */;
INSERT INTO `groupsdata` VALUES (1,'group1','abc#abc1',22,'aditya b','2024-03-30 17:43:28','https://i.scdn.co/image/ab67616d0000b2735960a3f9af07c54eda5c6b3b','Tauba Tauba (From \"Bad Newz\")',0),(2,'group2','TVHLedP0',22,'aditya','2024-03-30 17:43:37','https://i.scdn.co/image/ab67616d0000b2734a60872ae145776164540a7f','Heeriye (feat. Arijit Singh)',0),(3,'group3','Yllspz2&',22,'bhardwaj','2024-03-30 17:43:10','https://i.scdn.co/image/ab67616d0000b27387b32c2a464cd54ec95d301e','Baby Doll',0),(4,'group4','}%f9wnQf',22,'ayushi','2024-03-30 17:43:25','https://i.scdn.co/image/ab67616d0000b27345ba33de8115217429c19c1f','O Saki Saki (From \"Batla House\")',0),(5,'group5','ii5N9(Sf',22,'aditya123','2024-03-30 17:13:38','https://i.scdn.co/image/ab67616d0000b27383e569e0fa43464cb8525561','Pyaar Hota Kayi Baar Hai (From \"Tu Jhoothi Main Makkaar\")',0),(6,'family','!jKZqXX]',23,'abcd','2024-03-30 17:43:38','https://i.scdn.co/image/ab67616d0000b273e96d61e51493c6f6b8e99345','Ishq Jaisa Kuch (From \"Fighter\")',0),(7,'friends','R6#bfpNN',23,'ahd100','2024-03-30 17:43:38','https://i.scdn.co/image/ab67616d0000b2732e3ef294a52273479125a63c','Bhaag D.K. Bose, Aandhi Aayi',0),(8,'group6','MZ4[>VAe',23,'sflwhfo','2024-03-30 17:43:38','https://i.scdn.co/image/ab67616d0000b2731da0a37c5bad81580d49ef05','Tujhe Bhula Diya',0),(9,'group10','mdbI5539',23,'bhardwaj','2024-03-30 17:43:38','https://i.scdn.co/image/ab67616d0000b2730acb5a72549287bf33b51b71','Ik Junoon (Paint It Red)',0),(12,'xyzxyx','nRWeBiQG',22,'kjdfrfrr','2024-03-30 17:43:38','https://i.scdn.co/image/ab67616d0000b273c3be0e4563f5564640effc13','Dekhha Tenu (From \"Mr. And Mrs. Mahi\")',0),(13,'xyzxyx','Tyih7dro',22,'kjdfrfrr','2024-03-30 17:43:38','https://i.scdn.co/image/ab67616d0000b27307ef76001ec0e627d79a6dd1','August Diaries',0),(20,'testGroup','rYEWAWi$',22,'aditya bhardwazz','2024-04-07 15:44:38','https://i.scdn.co/image/ab67616d0000b27381de56ec415dc9f74554cdc2','Premika Ne Pyar Se',0),(21,'group5','Pj*#*rKy',22,'myself','2024-04-16 22:40:14','https://i.scdn.co/image/ab67616d0000b273db03bb0f2565033ed5234fb6','Jaanam (From \"Bad Newz\")',0),(22,'test group space','YEGM&o8N',22,'testing123','2024-05-19 20:37:44','https://i.scdn.co/image/ab67616d0000b273e810a88d506b30bdc0935247','Raabta',0),(23,'group1','K#5CuPvH',22,'testduplicategroupowner','2024-06-08 14:48:37','https://i.scdn.co/image/ab67616d0000b273707ea5b8023ac77d31756ed4','Badtameez Dil',0),(24,'teststatusupdate','iGBf$&dE',23,'ownerstatustest','2024-07-06 16:59:00','https://i.scdn.co/image/ab67616d0000b273e23347d1b3a9da365c1addfc','Tera Hone Laga Hoon',0);
/*!40000 ALTER TABLE `groupsdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `groupId` int NOT NULL,
  `displayName` varchar(100) NOT NULL,
  `status` int NOT NULL,
  `dateJoined` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId_idx` (`userId`),
  KEY `groupId_idx` (`groupId`),
  CONSTRAINT `groupId` FOREIGN KEY (`groupId`) REFERENCES `groupsdata` (`id`) ON DELETE CASCADE,
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (3,11,2,'harry',0,'2024-03-30 17:44:23'),(4,11,7,'abcd',0,'2024-03-30 17:44:23'),(29,22,9,'srfrfldsn',0,'2024-03-30 17:44:23'),(31,22,6,'frgrtg',0,'2024-03-30 17:44:23'),(33,11,1,'monster',0,'2024-04-12 22:58:16'),(34,23,1,'abcd##abcd',0,'2024-04-12 22:59:10'),(37,11,5,'truDuplicate1',0,'2024-04-16 22:43:08'),(38,11,21,'truDuplicate2',1,'2024-04-16 22:43:41'),(43,22,7,'doraemon',0,'2024-05-26 14:48:58'),(44,23,23,'testduplicategroupmember',0,'2024-06-08 14:58:01'),(45,23,22,'trial',0,'2024-07-06 16:53:42'),(46,22,24,'statustestmem',1,'2024-07-06 16:59:30'),(47,22,8,'sdcdvhrguy',0,'2024-07-20 16:12:14'),(48,11,24,'3rd member',0,'2024-07-21 14:19:54'),(49,23,21,'3rrrd member',0,'2024-07-21 14:25:38');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
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
  `emailId` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailId_UNIQUE` (`emailId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Adi','aditya123@gmail.com','adityA@1234'),(11,'aditya','aditya.bhardwaj20022111@gmail.com','$2b$10$vh4G9jDYeiXOCu.SmqHv/e930G650R3FOTRvCMNvQGHSz9S8.SZqu'),(22,'aditya bhardwaj','adibhardwaj444@gmail.com','$2b$10$BNUUxA5v85tYj5zkrAK6o.k9aJbI9L1IgE53Q1FZU8wnIvjoe1H16'),(23,'bhardwaj aditya','aditya.bhardwaj2020@vitstudent.ac.in','$2b$10$dr7ZEV7/Oc4daU58P9qj4OH9S2f8qAz1CC.yxRAL.L1j9wYYEfB2.');
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

-- Dump completed on 2024-09-14 13:10:36
