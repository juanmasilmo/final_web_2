/**
 * clienteService.ts
 * -----------------
 * Responsabilidad: Contener la lógica de negocio del dominio "Cliente".
 *
 * El Service actúa como intermediario entre el Controller y el Model.
 * Aquí se toman las decisiones de negocio:
 *   - Validar que el DNI no esté duplicado
 *   - Calcular la edad a partir de la fecha de nacimiento
 *   - Transformar los datos de BD (ClienteDB) al formato de API (ClienteDTO)
 *
 * Quién lo llama: clienteController.ts
 * Qué utiliza: clienteModel.ts
 *
 * Flujo:
 *   clienteController.ts → clienteService.ts → clienteModel.ts
 */

import * as clienteModel from '../models/clienteModel';
import { ClienteDB, ClienteDTO, CreateClienteDTO, UpdateClienteDTO } from '../types/cliente';

// ============================================================
// FUNCIÓN AUXILIAR: Cálculo correcto de edad
// ============================================================

/**
 * Calcula la edad exacta en años a partir de una fecha de nacimiento.
 *
 * El cálculo NO es simplemente (añoActual - añoNacimiento).
 * Debe verificarse si la persona ya cumplió años durante el año actual.
 *
 * Ejemplo:
 *   Hoy: 2024-03-15
 *   Nacimiento: 1990-07-20
 *   Resultado: 33 (no 34, porque todavía no cumplió en 2024)
 *
 * @param fechaNacimiento - Fecha de nacimiento (Date o string ISO)
 * @returns Edad en años completos
 */
function calcularEdad(fechaNacimiento: Date | string): number {
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();

  let edad = hoy.getFullYear() - nacimiento.getFullYear();

  // Verificar si el cumpleaños ya ocurrió este año
  // Si el mes actual es anterior al mes de nacimiento → no cumplió
  // Si es el mismo mes pero el día actual es anterior → tampoco cumplió
  const mesDiff = hoy.getMonth() - nacimiento.getMonth();
  if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}

// ============================================================
// FUNCIÓN AUXILIAR: Transformar ClienteDB → ClienteDTO
// ============================================================

/**
 * Convierte una fila de MySQL (ClienteDB) al formato de respuesta de la API (ClienteDTO).
 *
 * Transformaciones:
 *   - snake_case → camelCase (fecha_nacimiento → fechaNacimiento)
 *   - Fecha Date → string ISO "YYYY-MM-DD"
 *   - Calcula y agrega el campo `edad`
 *
 * @param cliente - Fila cruda de MySQL
 * @returns ClienteDTO listo para enviar al frontend
 */
function toDTO(cliente: ClienteDB): ClienteDTO {
  // toISOString() devuelve "YYYY-MM-DDTHH:mm:ss.sssZ"
  // Con slice(0, 10) tomamos solo la parte de la fecha: "YYYY-MM-DD"
  const fechaNacimiento = new Date(cliente.fecha_nacimiento).toISOString().slice(0, 10);

  return {
    id: cliente.id,
    nombre: cliente.nombre,
    apellido: cliente.apellido,
    dni: cliente.dni,
    fechaNacimiento,
    email: cliente.email,
    edad: calcularEdad(cliente.fecha_nacimiento),
    createdAt: new Date(cliente.created_at).toISOString(),
    updatedAt: new Date(cliente.updated_at).toISOString(),
  };
}

// ============================================================
// SERVICIOS PÚBLICOS
// ============================================================

/**
 * Obtener todos los clientes con edad calculada.
 */
export async function getAllClientes(): Promise<ClienteDTO[]> {
  const clientes = await clienteModel.getAllClientes();
  // Mapear cada fila DB a DTO (incluye cálculo de edad)
  return clientes.map(toDTO);
}

/**
 * Obtener un cliente por ID.
 * @throws Error con code 'NOT_FOUND' si no existe
 */
export async function getClienteById(id: number): Promise<ClienteDTO> {
  const cliente = await clienteModel.getClienteById(id);
  if (!cliente) {
    const error = new Error('Cliente no encontrado') as Error & { code: string };
    error.code = 'NOT_FOUND';
    throw error;
  }
  return toDTO(cliente);
}

/**
 * Crear un nuevo cliente.
 * Valida unicidad de DNI y email antes de insertar.
 * @throws Error con code 'CONFLICT' si DNI o email ya existen
 */
export async function createCliente(data: CreateClienteDTO): Promise<ClienteDTO> {
  // Verificar que el DNI no esté registrado
  const clienteConMismoDni = await clienteModel.getClienteByDni(data.dni);
  if (clienteConMismoDni) {
    const error = new Error('Ya existe un cliente con ese DNI') as Error & { code: string };
    error.code = 'CONFLICT';
    throw error;
  }

  // Verificar que el email no esté registrado
  const clienteConMismoEmail = await clienteModel.getClienteByEmail(data.email);
  if (clienteConMismoEmail) {
    const error = new Error('Ya existe un cliente con ese email') as Error & { code: string };
    error.code = 'CONFLICT';
    throw error;
  }

  // Insertar en BD y obtener el ID generado
  const nuevoId = await clienteModel.createCliente(data);

  // Recuperar el cliente recién creado para incluir created_at y updated_at
  const clienteCreado = await clienteModel.getClienteById(nuevoId);
  if (!clienteCreado) {
    throw new Error('Error al recuperar el cliente creado');
  }

  return toDTO(clienteCreado);
}

/**
 * Actualizar un cliente existente.
 * Valida existencia y unicidad de DNI/email antes de actualizar.
 * @throws Error con code 'NOT_FOUND' si no existe
 * @throws Error con code 'CONFLICT' si DNI o email ya los usa otro cliente
 */
export async function updateCliente(id: number, data: UpdateClienteDTO): Promise<ClienteDTO> {
  // Verificar que el cliente existe
  const clienteExistente = await clienteModel.getClienteById(id);
  if (!clienteExistente) {
    const error = new Error('Cliente no encontrado') as Error & { code: string };
    error.code = 'NOT_FOUND';
    throw error;
  }

  // Verificar DNI único excluyendo al cliente actual
  const clienteConMismoDni = await clienteModel.getClienteByDni(data.dni, id);
  if (clienteConMismoDni) {
    const error = new Error('Ya existe otro cliente con ese DNI') as Error & { code: string };
    error.code = 'CONFLICT';
    throw error;
  }

  // Verificar email único excluyendo al cliente actual
  const clienteConMismoEmail = await clienteModel.getClienteByEmail(data.email, id);
  if (clienteConMismoEmail) {
    const error = new Error('Ya existe otro cliente con ese email') as Error & { code: string };
    error.code = 'CONFLICT';
    throw error;
  }

  await clienteModel.updateCliente(id, data);

  // Recuperar el cliente actualizado
  const clienteActualizado = await clienteModel.getClienteById(id);
  if (!clienteActualizado) {
    throw new Error('Error al recuperar el cliente actualizado');
  }

  return toDTO(clienteActualizado);
}

/**
 * Eliminar un cliente por ID.
 * @throws Error con code 'NOT_FOUND' si no existe
 */
export async function deleteCliente(id: number): Promise<void> {
  const eliminado = await clienteModel.deleteCliente(id);
  if (!eliminado) {
    const error = new Error('Cliente no encontrado') as Error & { code: string };
    error.code = 'NOT_FOUND';
    throw error;
  }
}
