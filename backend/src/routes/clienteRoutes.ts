/**
 * clienteRoutes.ts
 * ----------------
 * Responsabilidad: Definir las rutas HTTP de la API de clientes
 * y mapearlas a los handlers del Controller.
 *
 * El Router NO contiene lógica de negocio.
 * Solo define: método HTTP + path + qué función del Controller ejecutar.
 *
 * Quién lo registra: app.ts
 * Qué utiliza: clienteController.ts
 *
 * Endpoints definidos:
 *   GET    /api/clientes       → controller.getAll
 *   GET    /api/clientes/:id   → controller.getById
 *   POST   /api/clientes       → controller.create
 *   PUT    /api/clientes/:id   → controller.update
 *   DELETE /api/clientes/:id   → controller.remove
 */

import { Router } from 'express';
import * as clienteController from '../controllers/clienteController';

const router = Router();

// Listar todos los clientes
router.get('/', clienteController.getAll);

// Obtener un cliente específico
router.get('/:id', clienteController.getById);

// Crear un nuevo cliente
router.post('/', clienteController.create);

// Actualizar un cliente existente
router.put('/:id', clienteController.update);

// Eliminar un cliente
router.delete('/:id', clienteController.remove);

export default router;
