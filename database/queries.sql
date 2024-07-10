-- Create Products table

CREATE TABLE `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(1010) DEFAULT NULL,
  `price` decimal(5,2) NOT NULL,
  `ingredients` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Create Users table

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `join_date` datetime DEFAULT NULL,
  `role` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'User',
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `shipping_info` json DEFAULT NULL,
  `contact_number` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Create Orders table

CREATE TABLE `orders` (
  `id` char(36) NOT NULL,
  `reference_number` int NOT NULL AUTO_INCREMENT,
  `status` varchar(100) NOT NULL,
  `date_time` date NOT NULL,
  `products` json NOT NULL,
  `shipping_info` json NOT NULL,
  `contact_number` int NOT NULL,
  `user_id` char(36) NOT NULL,
  `total_price` decimal(5,2) NOT NULL,
  `delivery_fee` decimal(5,2) NOT NULL,
  `grand_total` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_unique` (`reference_number`),
  CONSTRAINT `orders_users_FK` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Create Ingredients table

CREATE TABLE `ingredients` (
  `id` char(36) NOT NULL,
  `category` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;