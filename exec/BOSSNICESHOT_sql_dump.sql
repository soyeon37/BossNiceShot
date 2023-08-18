-- --------------------------------------------------------
-- 호스트:                          i9a309.p.ssafy.io
-- 서버 버전:                        10.3.38-MariaDB-0ubuntu0.20.04.1 - Ubuntu 20.04
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- ssafy_web 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `ssafy_web` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `ssafy_web`;

-- 테이블 ssafy_web.chat_room 구조 내보내기
CREATE TABLE IF NOT EXISTS `chat_room` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `room_name` varchar(255) NOT NULL,
  `application_deadline` datetime NOT NULL,
  `capacity` int(11) NOT NULL,
  `description` text NOT NULL,
  `field` int(11) NOT NULL,
  `tee_box` enum('BLACK','RED','WHITE') NOT NULL,
  `tee_up_time` datetime NOT NULL,
  `title` varchar(50) NOT NULL,
  `member_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6x6htd2o9ba2r2wcrs72qau17` (`member_id`),
  CONSTRAINT `FK6x6htd2o9ba2r2wcrs72qau17` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 ssafy_web.companion 구조 내보내기
CREATE TABLE IF NOT EXISTS `companion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `capacity` int(11) NOT NULL,
  `description` text NOT NULL,
  `field` int(11) NOT NULL,
  `tee_box` enum('BLACK','NONE','RED','WHITE') NOT NULL,
  `tee_up_time` datetime NOT NULL,
  `title` varchar(50) NOT NULL,
  `member_id` varchar(255) DEFAULT NULL,
  `companion_user_count` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKektyd9uqdwad8k1w7mqjah2y7` (`member_id`),
  CONSTRAINT `FKektyd9uqdwad8k1w7mqjah2y7` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 ssafy_web.companion_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `companion_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  `companion_id` bigint(20) NOT NULL,
  `member_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK65vuq98v9h4khqccrx2o5erub` (`companion_id`),
  KEY `FKgoxlclqekreqxuyfmukwdkxqd` (`member_id`),
  CONSTRAINT `FK65vuq98v9h4khqccrx2o5erub` FOREIGN KEY (`companion_id`) REFERENCES `companion` (`id`),
  CONSTRAINT `FKgoxlclqekreqxuyfmukwdkxqd` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 ssafy_web.follow 구조 내보내기
CREATE TABLE IF NOT EXISTS `follow` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `followee_id` varchar(255) DEFAULT NULL,
  `follower_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9t49cux0sxqh5usjf96sm03uv` (`followee_id`),
  KEY `FKtps7gpodlrhxlji90u6r3mlng` (`follower_id`),
  CONSTRAINT `FK9t49cux0sxqh5usjf96sm03uv` FOREIGN KEY (`followee_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKtps7gpodlrhxlji90u6r3mlng` FOREIGN KEY (`follower_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 ssafy_web.member 구조 내보내기
CREATE TABLE IF NOT EXISTS `member` (
  `id` varchar(255) NOT NULL,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `average_score` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `introduction` text DEFAULT NULL,
  `is_kakao` bit(1) DEFAULT b'0',
  `level` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `tee_box` enum('BLACK','NONE','RED','WHITE') DEFAULT NULL,
  `top_score` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 ssafy_web.member_roles 구조 내보내기
CREATE TABLE IF NOT EXISTS `member_roles` (
  `member_id` varchar(255) NOT NULL,
  `roles` enum('ROLE_ADMIN','ROLE_USER') DEFAULT NULL,
  KEY `FKet63dfllh4o5qa9qwm7f5kx9x` (`member_id`),
  CONSTRAINT `FKet63dfllh4o5qa9qwm7f5kx9x` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 ssafy_web.notification_application 구조 내보내기
CREATE TABLE IF NOT EXISTS `notification_application` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `applicant_id` varchar(255) DEFAULT NULL,
  `member_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs3dc9rifc7ws8ug4yyxdf3mrj` (`applicant_id`),
  KEY `FK4gk67svps9ylwmf3lxxdbg3x1` (`member_id`),
  CONSTRAINT `FK4gk67svps9ylwmf3lxxdbg3x1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKs3dc9rifc7ws8ug4yyxdf3mrj` FOREIGN KEY (`applicant_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 ssafy_web.notification_coaching 구조 내보내기
CREATE TABLE IF NOT EXISTS `notification_coaching` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `coaching_id` bigint(20) DEFAULT NULL,
  `followee_id` varchar(255) DEFAULT NULL,
  `follower_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrrh679rk46bug9h8eg2ma2r60` (`coaching_id`),
  KEY `FKnchv0nkrhq07p8bhplx766pnj` (`followee_id`),
  KEY `FKfe05414sg04dfp9txjknq1qgf` (`follower_id`),
  CONSTRAINT `FKfe05414sg04dfp9txjknq1qgf` FOREIGN KEY (`follower_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKnchv0nkrhq07p8bhplx766pnj` FOREIGN KEY (`followee_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKrrh679rk46bug9h8eg2ma2r60` FOREIGN KEY (`coaching_id`) REFERENCES `study` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 ssafy_web.notification_companion 구조 내보내기
CREATE TABLE IF NOT EXISTS `notification_companion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `followee_id` varchar(255) DEFAULT NULL,
  `follower_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK39jj7ire3qlsdqhatb2m2hlll` (`followee_id`),
  KEY `FK4l8ha414v7lyo2bj8ni1fn9im` (`follower_id`),
  CONSTRAINT `FK39jj7ire3qlsdqhatb2m2hlll` FOREIGN KEY (`followee_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FK4l8ha414v7lyo2bj8ni1fn9im` FOREIGN KEY (`follower_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 ssafy_web.notification_learning 구조 내보내기
CREATE TABLE IF NOT EXISTS `notification_learning` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `followee_id` varchar(255) DEFAULT NULL,
  `follower_id` varchar(255) DEFAULT NULL,
  `learning_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1pprjcc5skmm47awwcci8difg` (`followee_id`),
  KEY `FK9ga7kq8r31kb1jrnyw8pe3mdo` (`follower_id`),
  KEY `FK6eva6k3xucls6kd7m8bqjhj7r` (`learning_id`),
  CONSTRAINT `FK1pprjcc5skmm47awwcci8difg` FOREIGN KEY (`followee_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FK6eva6k3xucls6kd7m8bqjhj7r` FOREIGN KEY (`learning_id`) REFERENCES `study` (`id`),
  CONSTRAINT `FK9ga7kq8r31kb1jrnyw8pe3mdo` FOREIGN KEY (`follower_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 ssafy_web.notification_result 구조 내보내기
CREATE TABLE IF NOT EXISTS `notification_result` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `member_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKeija5extj2kruu052bt7w3two` (`member_id`),
  CONSTRAINT `FKeija5extj2kruu052bt7w3two` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 ssafy_web.study 구조 내보내기
CREATE TABLE IF NOT EXISTS `study` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `capacity` int(11) NOT NULL,
  `description` text NOT NULL,
  `locked` bit(1) NOT NULL,
  `password` int(11) DEFAULT NULL,
  `reserved_time` datetime NOT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT NULL,
  `title` varchar(30) NOT NULL,
  `type` enum('COACHING','LEARNING') DEFAULT NULL,
  `member_id` varchar(255) DEFAULT NULL,
  `study_user_count` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf561xlrfo0qtpl3vwkxiw4cs8` (`member_id`),
  CONSTRAINT `FKf561xlrfo0qtpl3vwkxiw4cs8` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 ssafy_web.study_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `study_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` varchar(255) NOT NULL,
  `study_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf8j638hqfe8j8mhg1b0qtxd84` (`member_id`),
  KEY `FKc4ftmuoc0u0ghw43dxth2m8we` (`study_id`),
  CONSTRAINT `FKc4ftmuoc0u0ghw43dxth2m8we` FOREIGN KEY (`study_id`) REFERENCES `study` (`id`),
  CONSTRAINT `FKf8j638hqfe8j8mhg1b0qtxd84` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
