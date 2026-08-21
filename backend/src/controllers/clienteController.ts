/**
 * clienteController.ts
 * --------------------
 * Responsabilidad: Recibir peticiones HTTP, extraer datos, llamar al Service
 * y construir la respuesta HTTP adecuada.
 *
 * El Controller NO contiene lógica de negocio ni consultas SQL.
 * Es el punto de entrada de cada petición que llega desde el Router.
 *
 * Quién lo llama: clienteRoutes.ts
 * Qué utiliza: clienteService.ts
 *
 * Flujo:
 *   clienteRoutes.ts → clienteController.ts → clienteService.ts
 */

import { Request, Response, NextFunction } from 'express';
import * as clienteService from '../services/clienteService';
import { CreateClienteDTO, UpdateClienteDTO } from '../types/cliente';

// ============================================================
// VALIDACIONES DE INPUT
// ============================================================

/**
 * Valida que los campos de un cliente sean correctos.
 * Devuelve un array de mensajes de error (vacío si todo está bien).
 */
function validarCamposCliente(data: Partial<CreateClienteDTO>): string[] {
  const errores: string[] = [];

  if (!data.nombre || data.nombre.trim().length === 0) {
    errores.push('El nombre es obligatorio');
  } else if (data.nombre.trim().length > 100) {
    errores.push('El nombre no puede superar 100 caracteres');
  }

  if (!data.apellido || data.apellido.trim().length === 0) {
    errores.push('El apellido es obligatorio');
  } else if (data.apellido.trim().length > 100) {
    errores.push('El apellido no puede superar 100 caracteres');
  }

  if (!data.dni || data.dni.trim().length === 0) {
    errores.push('El DNI es obligatorio');
  } else if (!/^\d{7,8}$/.test(data.dni.trim())) {
    errores.push('El DNI debe contener entre 7 y 8 dígitos numéricos');
  }

  if (!data.fechaNacimiento || data.fechaNacimiento.trim().length === 0) {
    errores.push('La fecha de nacimiento es obligatoria');
  } else {
    const fecha = new Date(data.fechaNacimiento);
    if (isNaN(fecha.getTime())) {
      errores.push('La fecha de nacimiento no es válida');
    } else if (fecha > new Date()) {
      errores.push('La fecha de nacimiento no puede ser futura');
    }
  }

  if (!data.email || data.email.trim().length === 0) {
    errores.push('El email es obligatorio');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errores.push('El email no tiene un formato válido');
  } else if (data.email.trim().length > 150) {
    errores.push('El email no puede superar 150 caracteres');
  }

  return errores;
}

// ============================================================
// HANDLERS DE RUTAS
// ============================================================

/**
 * GET /api/clientes
 * Obtiene todos los clientes con edad calculada.
 */
export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const clientes = await clienteService.getAllClientes();
    res.status(200).json({
      success: true,
      data: clientes,
      total: clientes.length,
    });
  } catch (error) {
    // Pasar al middleware de errores
    next(error);
  }
}

/**
 * GET /api/clientes/:id
 * Obtiene un cliente por ID.
 */
export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Convertir el parámetro de string a número
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      res.status(400).json({ success: false, message: 'El ID debe ser un número positivo' });
      return;
    }

    const cliente = await clienteService.getClienteById(id);
    res.status(200).json({ success: true, data: cliente });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/clientes
 * Crea un nuevo cliente.
 * Body esperado: { nombre, apellido, dni, fechaNacimiento, email }
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Extraer y limpiar datos del body
    const data: CreateClienteDTO = {
      nombre: (req.body.nombre || '').trim(),
      apellido: (req.body.apellido || '').trim(),
      dni: (req.body.dni || '').trim(),
      fechaNacimiento: (req.body.fechaNacimiento || '').trim(),
      email: (req.body.email || '').trim().toLowerCase(),
    };

    // Validar antes de llamar al service
    const errores = validarCamposCliente(data);
    if (errores.length > 0) {
      res.status(400).json({ success: false, message: 'Datos inválidos', errors: errores });
      return;
    }

    const nuevoCliente = await clienteService.createCliente(data);
    // 201 Created: recurso creado exitosamente
    res.status(201).json({ success: true, data: nuevoCliente, message: 'Cliente creado exitosamente' });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/clientes/:id
 * Actualiza un cliente existente.
 * Body esperado: { nombre, apellido, dni, fechaNacimiento, email }
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      res.status(400).json({ success: false, message: 'El ID debe ser un número positivo' });
      return;
    }

    const data: UpdateClienteDTO = {
      nombre: (req.body.nombre || '').trim(),
      apellido: (req.body.apellido || '').trim(),
      dni: (req.body.dni || '').trim(),
      fechaNacimiento: (req.body.fechaNacimiento || '').trim(),
      email: (req.body.email || '').trim().toLowerCase(),
    };

    const errores = validarCamposCliente(data);
    if (errores.length > 0) {
      res.status(400).json({ success: false, message: 'Datos inválidos', errors: errores });
      return;
    }

    const clienteActualizado = await clienteService.updateCliente(id, data);
    res.status(200).json({ success: true, data: clienteActualizado, message: 'Cliente actualizado exitosamente' });
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/clientes/:id
 * Elimina un cliente por ID.
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      res.status(400).json({ success: false, message: 'El ID debe ser un número positivo' });
      return;
    }

    await clienteService.deleteCliente(id);
    res.status(200).json({ success: true, message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
}
