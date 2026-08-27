-- schema.sql
-- ----------
-- Script para crear la base de datos y la tabla de clientes desde cero.
-- Ejecutar con: mysql -u root -p < database/schema.sql

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS clientes_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE clientes_db;

-- Eliminar la tabla si existe (útil para recrearla limpiamente)
DROP TABLE IF EXISTS clientes;

CCREATE TABLE clientes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  dni VARCHAR(8) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  email VARCHAR(150) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT uq_clientes_dni UNIQUE (dni),
  CONSTRAINT uq_clientes_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_clientes_apellido_nombre ON clientes (apellido, nombre);
