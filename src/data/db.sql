DROP DATABASE IF EXISTS hospital;

CREATE DATABASE hospital;
USE hospital;


CREATE TABLE pacientes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    localidad VARCHAR(200),
    fecha_de_nacimiento DATE
);


INSERT INTO pacientes (nombre, localidad, fecha_de_nacimiento) 
VALUES 
  ('Pedro', 'Madrid', '1990-01-01'),
  ('Ana', 'Barcelona', '1995-02-02'),
  ('Juan', 'Valencia', '1980-03-03');

CREATE TABLE medicos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    especialidad VARCHAR(200),
    perfil VARCHAR(200)
);

INSERT INTO medicos (nombre, especialidad, perfil) 
VALUES 
  ('Rafael', 'traumatologia', 'ESPECIALISTA'),
  ('David', 'pediatria', 'RESIDENTE'),
  ('Carlos', 'cirugia', 'ESPECIALISTA');