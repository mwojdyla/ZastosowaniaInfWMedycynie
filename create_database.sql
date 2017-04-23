DROP DATABASE IF EXISTS pharmacy_db;

CREATE DATABASE pharmacy_db
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;
CREATE USER IF NOT EXISTS 'pharmaceutist'@'localhost'
  IDENTIFIED BY 'pharmacy_pw';
GRANT ALL PRIVILEGES ON *.* TO 'pharmaceutist'@'localhost';
FLUSH PRIVILEGES;
