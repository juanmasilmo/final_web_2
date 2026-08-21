/**
 * app.ts
 * ------
 * Responsabilidad: Configurar la aplicación Express.
 *
 * Este archivo crea la instancia de Express, registra middlewares
 * globales (CORS, JSON parser, rutas) y el middleware de errores.
 *
 * Es el "armado" de la aplicación.
 * server.ts se encarga de "arrancarla" (listen).
 *
 * Quién lo usa: server.ts
 * Qué registra: CORS, express.json, clienteRoutes, errorHandler
 *
 * Separar app.ts de server.ts permite testear la app sin iniciar
 * el servidor HTTP real (útil para tests de integración).
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clienteRoutes from './routes/clienteRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

// ============================================================
// CORS: Cross-Origin Resource Sharing
// ============================================================
// El frontend (Next.js en localhost:3000) y el backend (Express en localhost:4000)
// son orígenes distintos. Sin CORS, el navegador bloquea las peticiones.
// El middleware de CORS agrega los headers necesarios para permitirlas.
app.use(cors({
  // En desarrollo, permitir el origen del frontend.
  // En producción, cambiar a la URL real del frontend.
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ============================================================
// MIDDLEWARES GLOBALES
// ============================================================

// Parsear el body de las peticiones como JSON
// Sin esto, req.body estaría undefined en POST y PUT
app.use(express.json());

// Parsear el body de formularios URL-encoded (por si se usa algún form HTML)
app.use(express.urlencoded({ extended: true }));

// ============================================================
// RUTAS
// ============================================================

// Prefijo /api/clientes para todas las rutas de clienteRoutes
app.use('/api/clientes', clienteRoutes);

// Ruta de verificación de salud del servidor
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ============================================================
// MIDDLEWARE DE ERRORES
// ============================================================
// DEBE ir al final, después de todas las rutas
// Express identifica el middleware de errores por tener 4 parámetros
app.use(errorHandler);

export default app;
