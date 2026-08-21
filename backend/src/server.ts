/**
 * server.ts
 * ---------
 * Responsabilidad: Iniciar el servidor HTTP de Express.
 *
 * Este archivo es el punto de entrada del backend.
 * Importa la app configurada desde app.ts y la pone a escuchar
 * en el puerto definido en las variables de entorno.
 *
 * Separar server.ts de app.ts es una buena práctica porque permite:
 *   - Testear app.ts sin iniciar el puerto real
 *   - Cambiar el mecanismo de inicio sin modificar la configuración
 *
 * Ejecución: pnpm dev (ts-node-dev) o pnpm start (node dist/server.js)
 */

import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`📋 API de clientes disponible en http://localhost:${PORT}/api/clientes`);
  console.log(`🏥 Health check en http://localhost:${PORT}/health`);
});
