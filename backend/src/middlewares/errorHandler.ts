/**
 * errorHandler.ts
 * ---------------
 * Responsabilidad: Middleware global de manejo de errores de Express.
 *
 * Cuando cualquier controller llama a next(error), Express lo envía aquí.
 * Este middleware traduce los errores a respuestas HTTP apropiadas.
 *
 * Ventaja: centraliza la lógica de respuesta de errores en un único lugar,
 * evitando código repetido en cada controller.
 *
 * Quién lo registra: app.ts (debe ser el ÚLTIMO middleware registrado)
 * Quién lo llama: Cualquier handler que invoca next(error)
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Interfaz para errores con código de negocio.
 * Los servicios lanzan errores con `code` para indicar el tipo de fallo.
 */
interface AppError extends Error {
  code?: string;
  statusCode?: number;
}

/**
 * Middleware de errores de Express.
 * Firma obligatoria de 4 parámetros: (err, req, res, next)
 */
export function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction): void {
  // Log del error para debugging (en producción se usaría un logger como Winston)
  console.error('[ErrorHandler]', err.message, err.stack);

  // Determinar el código HTTP según el tipo de error de negocio
  let statusCode = err.statusCode || 500;
  let message = 'Error interno del servidor';

  switch (err.code) {
    case 'NOT_FOUND':
      statusCode = 404;
      message = err.message;
      break;
    case 'CONFLICT':
      statusCode = 409;
      message = err.message;
      break;
    case 'BAD_REQUEST':
      statusCode = 400;
      message = err.message;
      break;
    default:
      // Para errores 500, no exponer el mensaje interno al cliente
      // por razones de seguridad (puede contener info sensible de MySQL)
      if (statusCode === 500) {
        message = 'Error interno del servidor. Por favor, intente nuevamente.';
      } else {
        message = err.message;
      }
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Solo incluir el código de error en desarrollo
    ...(process.env.NODE_ENV === 'development' && { errorCode: err.code }),
  });
}
