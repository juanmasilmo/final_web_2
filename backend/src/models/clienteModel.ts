/**
 * clienteModel.ts
 * ---------------
 * Responsabilidad: Ejecutar las consultas SQL contra la tabla `clientes`.
 *
 * El Model es la única capa que habla directamente con MySQL.
 * NO contiene lógica de negocio. Solo traduce operaciones a SQL.
 *
 * Quién lo llama: clienteService.ts
 * Qué utiliza: pool de database.ts para ejecutar consultas
 *
 * Flujo:
 *   clienteService.ts → clienteModel.ts → database.ts → MySQL
 */

import { pool } from '../config/database';
import { ClienteDB, CreateClienteDTO, UpdateClienteDTO } from '../types/cliente';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

/**
 * Obtener todos los clientes de la tabla.
 * @returns Array de filas ClienteDB
 */
export async function getAllClientes(): Promise<ClienteDB[]> {
  // SELECT * devuelve todas las columnas. En proyectos más grandes
  // se seleccionarían solo los campos necesarios.
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, nombre, apellido, dni, fecha_nacimiento, email, created_at, updated_at FROM clientes ORDER BY apellido, nombre'
  );
  return rows as ClienteDB[];
}

/**
 * Obtener un cliente por su ID.
 * @param id - ID del cliente
 * @returns ClienteDB si existe, null si no
 */
export async function getClienteById(id: number): Promise<ClienteDB | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, nombre, apellido, dni, fecha_nacimiento, email, created_at, updated_at FROM clientes WHERE id = ?',
    [id]
  );
  // Si no hay filas, el cliente no existe
  if (rows.length === 0) return null;
  return rows[0] as ClienteDB;
}

/**
 * Buscar cliente por DNI (para validar unicidad).
 * @param dni - DNI a buscar
 * @param excludeId - ID a excluir (útil en updates para no conflictuar consigo mismo)
 * @returns ClienteDB si existe, null si no
 */
export async function getClienteByDni(dni: string, excludeId?: number): Promise<ClienteDB | null> {
  let query = 'SELECT id FROM clientes WHERE dni = ?';
  const params: (string | number)[] = [dni];

  if (excludeId !== undefined) {
    query += ' AND id != ?';
    params.push(excludeId);
  }

  const [rows] = await pool.query<RowDataPacket[]>(query, params);
  if (rows.length === 0) return null;
  return rows[0] as ClienteDB;
}

/**
 * Buscar cliente por email (para validar unicidad).
 * @param email - email a buscar
 * @param excludeId - ID a excluir (útil en updates)
 * @returns ClienteDB si existe, null si no
 */
export async function getClienteByEmail(email: string, excludeId?: number): Promise<ClienteDB | null> {
  let query = 'SELECT id FROM clientes WHERE email = ?';
  const params: (string | number)[] = [email];

  if (excludeId !== undefined) {
    query += ' AND id != ?';
    params.push(excludeId);
  }

  const [rows] = await pool.query<RowDataPacket[]>(query, params);
  if (rows.length === 0) return null;
  return rows[0] as ClienteDB;
}

/**
 * Insertar un nuevo cliente en la tabla.
 * @param data - datos del nuevo cliente
 * @returns ID del cliente recién insertado
 */
export async function createCliente(data: CreateClienteDTO): Promise<number> {
  // Convertimos la fecha de string "YYYY-MM-DD" al formato que MySQL espera.
  // mysql2 acepta strings ISO directamente para campos DATE.
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO clientes (nombre, apellido, dni, fecha_nacimiento, email) VALUES (?, ?, ?, ?, ?)',
    [data.nombre, data.apellido, data.dni, data.fechaNacimiento, data.email]
  );
  // insertId contiene el ID autogenerado por AUTO_INCREMENT
  return result.insertId;
}

/**
 * Actualizar un cliente existente.
 * @param id - ID del cliente a actualizar
 * @param data - nuevos datos
 * @returns true si se actualizó al menos 1 fila, false si no existía
 */
export async function updateCliente(id: number, data: UpdateClienteDTO): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE clientes SET nombre = ?, apellido = ?, dni = ?, fecha_nacimiento = ?, email = ? WHERE id = ?',
    [data.nombre, data.apellido, data.dni, data.fechaNacimiento, data.email, id]
  );
  // affectedRows indica cuántas filas fueron modificadas
  return result.affectedRows > 0;
}

/**
 * Eliminar un cliente por ID.
 * @param id - ID del cliente a eliminar
 * @returns true si se eliminó, false si no existía
 */
export async function deleteCliente(id: number): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM clientes WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}
