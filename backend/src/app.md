# app.ts — Documentación

## 1. Propósito

Configurar la aplicación Express: middlewares globales, CORS, rutas y manejo de errores.

## 2. Responsabilidad

Ser el punto de composición de la aplicación. Registra en orden:
1. CORS
2. `express.json()` (parseo del body)
3. Rutas de la API
4. Middleware de errores

## 3. Quién lo usa

```
server.ts → app.ts
```

## 4. Qué archivos registra

```
app.ts → clienteRoutes.ts
app.ts → errorHandler.ts
```

## 5. Configuración CORS

```
Frontend (localhost:3000)
       ↓
HTTP Request con Origin: http://localhost:3000
       ↓
CORS Middleware (en app.ts)
       ↓
Agrega headers: Access-Control-Allow-Origin, Access-Control-Allow-Methods
       ↓
Express procesa la petición
```

Sin CORS configurado, el navegador rechaza las peticiones del frontend hacia el backend.

## 6. Motivo de diseño

Separar `app.ts` de `server.ts` permite importar la app en tests sin iniciar el servidor HTTP.
