/**
 * database.ts
 * -----------
 * Responsabilidad: Configurar y exportar el pool de conexiones a MySQL.
 *
 * Este archivo centraliza la conexión a la base de datos.
 * Los models importan `pool` desde aquí para ejecutar consultas SQL.
 * De esta forma, la lógica de conexión está en un único lugar.
 *
 * Flujo:
 *   clienteModel.ts → database.ts → MySQL
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

/**
 * Pool de conexiones MySQL.
 * Un pool reutiliza conexiones en lugar de abrir/cerrar una por petición.
 * Esto mejora el rendimiento y evita errores de "demasiadas conexiones".
 */
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'clientes_db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Sia777',
  // waitForConnections: el pool espera si todas las conexiones están ocupadas
  waitForConnections: true,
  // connectionLimit: máximo de conexiones simultáneas permitidas
  connectionLimit: 10,
  // queueLimit: 0 = sin límite de peticiones en cola
  queueLimit: 0,
});
