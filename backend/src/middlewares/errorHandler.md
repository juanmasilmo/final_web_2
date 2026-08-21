# errorHandler.ts — Documentación

## 1. Propósito

Capturar todos los errores no manejados de la aplicación y devolver respuestas HTTP coherentes.

## 2. Responsabilidad

- Interceptar errores lanzados con `next(error)` en los controllers
- Mapear códigos de error de negocio (`NOT_FOUND`, `CONFLICT`) a códigos HTTP (404, 409)
- Evitar exponer mensajes internos de MySQL al cliente
- Log de errores para debugging

## 3. Quién lo registra

```
app.ts → errorHandler (último middleware)
```

## 4. Quién lo activa

```
clienteController.ts → next(error) → errorHandler
```

## 5. Mapeo de códigos

| Código de negocio | HTTP Status | Cuándo se usa                    |
|-------------------|-------------|----------------------------------|
| `NOT_FOUND`       | 404         | Cliente no encontrado            |
| `CONFLICT`        | 409         | DNI o email ya existen           |
| `BAD_REQUEST`     | 400         | Datos de entrada inválidos       |
| Sin código        | 500         | Error inesperado del servidor    |

## 6. Motivo de diseño

Sin este middleware, cada controller tendría que manejar errores por separado. Centralizarlo evita duplicación y garantiza respuestas consistentes.
