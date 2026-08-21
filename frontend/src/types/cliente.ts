/**
 * cliente.ts (types - frontend)
 * -----------------------------
 * Responsabilidad: Definir los tipos TypeScript del dominio "Cliente" en el frontend.
 *
 * Estos tipos deben ser compatibles con los que devuelve la API del backend.
 * Si el backend cambia la estructura de la respuesta, este archivo debe actualizarse.
 *
 * Quién lo usa: clienteService.ts, componentes de clientes
 */

/**
 * Cliente: representa el objeto que devuelve la API del backend.
 * Incluye `edad` calculada (campo derivado, no almacenado en BD).
 */
export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string; // "YYYY-MM-DD"
  email: string;
  edad: number; // calculado por el backend
  createdAt: string;
  updatedAt: string;
}

/**
 * ClienteFormData: datos que el usuario ingresa en el formulario.
 * No incluye id, edad, createdAt, updatedAt (son generados/calculados).
 */
export interface ClienteFormData {
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string; // "YYYY-MM-DD"
  email: string;
}

/**
 * ApiResponse: estructura genérica de respuesta de la API.
 * El backend siempre responde con este formato.
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  total?: number;
}
