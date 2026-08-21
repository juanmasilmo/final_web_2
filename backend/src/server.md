# server.ts — Documentación

## 1. Propósito

Punto de entrada del backend. Inicia el servidor HTTP en el puerto configurado.

## 2. Responsabilidad

Llamar a `app.listen()` para que Express empiece a recibir peticiones HTTP.

## 3. Quién lo ejecuta

El comando `pnpm dev` (ts-node-dev src/server.ts) o `pnpm start` (node dist/server.js).

## 4. Qué archivos usa

```
server.ts → app.ts
```

## 5. Variable de entorno

`PORT`: el puerto donde escucha el servidor. Default: 4000.

## 6. Motivo de diseño

Separar el inicio del servidor de la configuración de la app es una convención estándar de Express que facilita el testing.
