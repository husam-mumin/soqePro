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
phone VARCHAR(20),
permission INT,
CONSTRAINT fk_permission FOREIGN KEY(permission) REFERENCES permissions(id)
);

CREATE TABLE IF NOT EXISTS authKey_user(
userId int,
authKey CHAR(40)
);

INSERT INTO permissions(name) values ('owner'), ('admin'), ('seller'), ('counter');
INSERT INTO users(username, password, phone, permission) VALUES ('hossam', 'hossam12', '0916766352', 2);
INSERT INTO users(username, password, phone, permission) VALUES ('muasd', '1245321', '123434123', 1);

CREATE VIEW  fullusers AS SELECT username, password, phone, name, createat FROM users join  permissions on permissions.id = users.permission;

SELECT * FROM fullusers;
SELECT * FROM permissions;

