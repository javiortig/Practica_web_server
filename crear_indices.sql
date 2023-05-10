DROP DATABASE `practica_web_server`;

CREATE DATABASE `practica_web_server`;

use practica_web_server;

CREATE UNIQUE INDEX email ON companies (email);

CREATE UNIQUE INDEX email ON users (email);