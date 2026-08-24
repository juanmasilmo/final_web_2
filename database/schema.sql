-- schema.sql
-- ----------
-- Script para crear la base de datos y la tabla de clientes desde cero.
-- Ejecutar con: mysql -u root -p < database/schema.sql

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS final_web_2
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE final_web_2;

-- Eliminar la tabla si existe (útil para recrearla limpiamente)
DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes (
  -- Clave primaria autoincremental
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

  -- Datos personales
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,

  -- DNI: único, entre 7 y 8 dígitos.
  -- UNIQUE garantiza que no haya dos clientes con el mismo DNI.
  dni VARCHAR(8) NOT NULL,

  -- Fecha de nacimiento: se usa para CALCULAR la edad (no se almacena)
  fecha_nacimiento DATE NOT NULL,

  -- Email: único y con longitud máxima razonable
  email VARCHAR(150) NOT NULL,

  -- Timestamps automáticos
  -- created_at: se asigna automáticamente al insertar
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- updated_at: se actualiza automáticamente al modificar la fila
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Restricciones de unicidad
  CONSTRAINT uq_clientes_dni UNIQUE (dni),
  CONSTRAINT uq_clientes_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Índices adicionales para mejorar búsquedas frecuentes
-- Índice en apellido+nombre para la búsqueda ordenada del listado
CREATE INDEX idx_clientes_apellido_nombre ON clientes (apellido, nombre);
