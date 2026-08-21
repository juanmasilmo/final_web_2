/**
 * clienteService.ts (frontend)
 * ----------------------------
 * Responsabilidad: Centralizar todas las llamadas HTTP a la API de clientes.
 *
 * Este archivo es la única capa del frontend que se comunica con el backend.
 * Los componentes NO hacen fetch() directamente: llaman a este service.
 *
 * Ventaja: si la URL de la API o la estructura de los endpoints cambia,
 * solo se modifica aquí, no en cada componente.
 *
 * Quién lo llama: componentes de la página /clientes
 * Qué llama: API REST del backend (http://localhost:4000/api/clientes)
 *
 * Flujo:
 *   Componente → clienteService → HTTP → Express API → respuesta
 */

import { Cliente, ClienteFormData, ApiResponse } from '../types/cliente';

/**
 * URL base de la API.
 * Se configura mediante variable de entorno NEXT_PUBLIC_API_URL.
 * El prefijo NEXT_PUBLIC_ es obligatorio en Next.js para exponer
 * variables al bundle del cliente (browser).
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const API_CLIENTES = `${API_BASE_URL}/api/clientes`;

/**
 * Función auxiliar para manejar respuestas de fetch.
 * Lanza un error con el mensaje del servidor si la respuesta no es ok.
 */
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data: ApiResponse<T> = await response.json();

  if (!response.ok) {
    // Construir mensaje de error legible para el usuario
    const errorMessage = data.errors?.join(', ') || data.message || 'Error en la petición';
    throw new Error(errorMessage);
  }

  return data;
}

/**
 * Obtener todos los clientes.
 * GET /api/clientes
 */
export async function getAllClientes(): Promise<Cliente[]> {
  const response = await fetch(API_CLIENTES);
  const result = await handleResponse<Cliente[]>(response);
  return result.data || [];
}

/**
 * Obtener un cliente por ID.
 * GET /api/clientes/:id
 */
export async function getClienteById(id: number): Promise<Cliente> {
  const response = await fetch(`${API_CLIENTES}/${id}`);
  const result = await handleResponse<Cliente>(response);
  if (!result.data) throw new Error('Cliente no encontrado');
  return result.data;
}

/**
 * Crear un nuevo cliente.
 * POST /api/clientes
 * Body: ClienteFormData
 */
export async function createCliente(data: ClienteFormData): Promise<Cliente> {
  const response = await fetch(API_CLIENTES, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await handleResponse<Cliente>(response);
  if (!result.data) throw new Error('Error al crear el cliente');
  return result.data;
}

/**
 * Actualizar un cliente existente.
 * PUT /api/clientes/:id
 * Body: ClienteFormData
 */
export async function updateCliente(id: number, data: ClienteFormData): Promise<Cliente> {
  const response = await fetch(`${API_CLIENTES}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await handleResponse<Cliente>(response);
  if (!result.data) throw new Error('Error al actualizar el cliente');
  return result.data;
}

/**
 * Eliminar un cliente.
 * DELETE /api/clientes/:id
 */
export async function deleteCliente(id: number): Promise<void> {
  const response = await fetch(`${API_CLIENTES}/${id}`, {
    method: 'DELETE',
  });
  await handleResponse<null>(response);
}
