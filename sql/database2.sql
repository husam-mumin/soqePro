-- DROP DATABASE IF EXISTS soqepro;
DROP VIEW IF EXISTS fullusers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS permissions;

CREATE TABLE IF NOT EXISTS permissions(
id SERIAL PRIMARY KEY, 
name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
ID SERIAL PRIMARY KEY, 
username VARCHAR(50) UNIQUE NOT NULL,
password VARCHAR(80) NOT NULL,
createAt TIMESTAMP DEFAULT now(),
lastLogin TIMESTAMP,
phone VARCHAR(20),
permission INT,
CONSTRAINT fk_permission FOREIGN KEY(permission) REFERENCES permissions(id)
);

CREATE TABLE IF NOT EXISTS authKey_user(
userId int,
authKey CHAR(40),
CONSTRAINT fk_user FOREIGN KEY(userid) REFERENCES users(id)
);

INSERT INTO permissions(name) values ('owner'), ('admin'), ('seller'), ('counter');
INSERT INTO users(username, password, phone, permission) VALUES ('hossam', 'hossam12', '0916766352', 2);
INSERT INTO users(username, password, phone, permission) VALUES ('muasd', '1245321', '123434123', 1);

CREATE VIEW  fullusers AS SELECT username, password, phone, name, createat FROM users join  permissions on permissions.id = users.permission;

SELECT * FROM fullusers;
SELECT * FROM permissions;

DROP TABLE IF EXISTS category;
CREATE TABLE category(
id SERIAL PRIMARY KEY,
name VARCHAR(60) NOT NULL
);
DROP TABLE IF EXISTS brand;

CREATE TABLE brand(
id SERIAL PRIMARY KEY, 
name VARCHAR(50)
);

DROP TABLE IF EXISTS provider;

CREATE TABLE provider(
id SERIAL PRIMARY KEY,
name VARCHAR(50),
phone VARCHAR(15), 
description TEXT
);

DROP TABLE IF EXISTS product_group;
CREATE TABLE product_group(
id SERIAL PRIMARY KEY,
name VARCHAR(60) NOT NULL,
category_id int,
brand_id INT,
entry_at TIMESTAMP DEFAULT now(),
provider_id INT,
cost NUMERIC(6, 2),
CONSTRAINT fk_brand_id FOREIGN KEY(brand_id) REFERENCES brand(id),
CONSTRAINT fk_category FOREIGN KEY(category_Id) REFERENCES category(id),
CONSTRAINT fk_provider_id FOREIGN KEY(provider_id) REFERENCES provider(id)
);

DROP TABLE IF EXISTS color;
CREATE TABLE color(
id SERIAL PRIMARY KEY,
name VARCHAR(30),
HEX CHAR(7)
);

DROP TABLE IF EXISTS size_GROUP;
CREATE TABLE size_GROUP(
id SERIAL PRIMARY KEY,
name VARCHAR(30)
);


DROP TABLE IF EXISTS size;
CREATE TABLE size(
id SERIAL PRIMARY KEY,
size VARCHAR(10),
size_group_id INT,
CONSTRAINT fk_size_group FOREIGN KEY(size_group_id) REFERENCES size_GROUP(id)
);


DROP TABLE IF EXISTS product;
CREATE TABLE product(
id SERIAL PRIMARY KEY,
product_group_id INT, 
color_id INT,
size_id INT,
Product_code VARCHAR(30),
price NUMERIC(6, 2),
quantity INT,
CONSTRAINT fk_product_group_id FOREIGN KEY(product_group_id) REFERENCES product_group(id),
CONSTRAINT fk_color_id FOREIGN KEY(color_id) REFERENCES color(id),
CONSTRAINT fk_size_id FOREIGN KEY(size_id) REFERENCES size(id)
);


