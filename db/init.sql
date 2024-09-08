-- Creates and seeds the SQL database

-- Create database
CREATE DATABASE IF NOT EXISTS demo;
USE demo;

-- Create a new user and grant necessary permissions
CREATE USER IF NOT EXISTS 'demo'@'localhost' IDENTIFIED BY 'example-pass';
GRANT ALL PRIVILEGES ON demo.* TO 'demo'@'localhost';
FLUSH PRIVILEGES;

-- Table for users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('admin', 'normal') DEFAULT 'normal',
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for contact messages
CREATE TABLE IF NOT EXISTS contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Verify the user privileges
SHOW GRANTS FOR 'demo'@'localhost';
