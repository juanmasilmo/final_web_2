-- seed.sql
-- --------
-- Datos de prueba para la tabla clientes.
-- Ejecutar DESPUÉS de schema.sql.
-- Ejecutar con: mysql -u root -p final_web_2 < database/seed.sql

USE final_web_2;

-- Limpiar datos existentes antes de insertar (útil para re-ejecutar)
DELETE FROM clientes;
-- Reiniciar el AUTO_INCREMENT para que los IDs empiecen desde 1
ALTER TABLE clientes AUTO_INCREMENT = 1;

INSERT INTO clientes (nombre, apellido, dni, fecha_nacimiento, email) VALUES
  ('Juan',     'García',    '12345678', '1990-05-15', 'juan.garcia@email.com'),
  ('María',    'López',     '23456789', '1985-11-20', 'maria.lopez@email.com'),
  ('Carlos',   'Martínez',  '34567890', '1992-03-08', 'carlos.martinez@email.com'),
  ('Ana',      'Rodríguez', '4567890',  '1988-07-22', 'ana.rodriguez@email.com'),
  ('Pedro',    'Fernández', '5678901',  '1995-12-01', 'pedro.fernandez@email.com'),
  ('Laura',    'Sánchez',   '6789012',  '1991-09-14', 'laura.sanchez@email.com'),
  ('Diego',    'Pérez',     '7890123',  '1987-04-30', 'diego.perez@email.com'),
  ('Sofía',    'González',  '8901234',  '1993-06-17', 'sofia.gonzalez@email.com');
