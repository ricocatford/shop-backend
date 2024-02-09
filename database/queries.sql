-- Select database
USE shop;
-- Create Products table
CREATE TABLE products ( 
    id CHAR(36), 
    name VARCHAR(255), 
    description VARCHAR(1010), 
    price INT
);
-- Create Users table
CREATE TABLE users ( 
    id CHAR(36),
    name VARCHAR(24),
    password CHAR(255),
    email VARCHAR(255),
    join_date DATETIME,
    role VARCHAR(24)
);
