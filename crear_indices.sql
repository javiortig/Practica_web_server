DROP DATABASE `practica_web_server`;

CREATE DATABASE `practica_web_server`;

use practica_web_server;

CREATE UNIQUE INDEX email ON companies (email);

CREATE UNIQUE INDEX email ON users (email);

CREATE UNIQUE INDEX title ON webpages (title);

#  Deletes despues de cada jest

use practica_web_server;

DELETE FROM webpages WHERE title = 'Telepizza Echeverría';
delete from users where email = 'telepizza@gmail.com';
delete from users where email = 'Juan@gmail.com';
delete from users where email = 'Adri@gmail.com';

delete from reviews;