/**
 * cliente.ts (types)
 * ------------------
 * Responsabilidad: Definir los tipos TypeScript del dominio "Cliente".
 *
 * Este archivo centraliza las interfaces de datos para que todos los
 * archivos del backend (model, service, controller) usen los mismos tipos.
 *
 * Flujo:
 *   clienteModel.ts, clienteService.ts, clienteController.ts → types/cliente.ts
 */

/**
 * ClienteDB: representa la fila tal como viene de MySQL.
 * Los campos coinciden exactamente con las columnas de la tabla `clientes`.
 * Nota: NO incluye `edad` porque no se almacena en BD.
 */
export interface ClienteDB {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  fecha_nacimiento: Date;
  email: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * ClienteDTO: el objeto que devuelve la API al frontend.
 * Incluye `edad` calculada y usa camelCase para consistencia con JS/TS.
 */
export interface ClienteDTO {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string; // ISO string: "YYYY-MM-DD"
  email: string;
  edad: number; // campo calculado, no almacenado en BD
  createdAt: string;
  updatedAt: string;
}

/**
 * CreateClienteDTO: datos necesarios para crear un nuevo cliente.
 * El frontend envía estos campos en el body del POST.
 */
export interface CreateClienteDTO {
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string; // "YYYY-MM-DD"
  email: string;
}

/**
 * UpdateClienteDTO: datos para actualizar un cliente existente.
 * Todos los campos son requeridos en el PUT (reemplazo completo).
 */
export interface UpdateClienteDTO {
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string; // "YYYY-MM-DD"
  email: string;
}
