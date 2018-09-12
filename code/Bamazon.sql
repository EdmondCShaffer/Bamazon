CREATE DATABASE Bamazon;

USE Bamazon;


CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product, price, quantity)
VALUES ("Xbox One", 325.50, 100);

INSERT INTO products (product, price, quantity)
VALUES ("Ps4", 300.00, 50);

INSERT INTO products (product, price, quantity)
VALUES ("Wii U", 205.75, 73);

INSERT INTO products (product, price, quantity)
VALUES ("Iphone x", 780.88, 44);

INSERT INTO products (product, price, quantity)
VALUES ("Note 9", 1100.99, 96);

