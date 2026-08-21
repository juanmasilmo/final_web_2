# clienteRoutes.ts — Documentación

## 1. Propósito

Definir el mapeo entre endpoints HTTP y handlers del Controller.

## 2. Responsabilidad

Declarar qué método HTTP + ruta corresponde a qué función del Controller. Sin lógica de negocio ni de presentación.

## 3. Quién lo registra

```
app.ts → clienteRoutes.ts
```

## 4. Qué archivos llama

```
clienteRoutes.ts → clienteController.ts
```

## 5. Rutas definidas

| Método | Ruta   | Handler Controller  |
|--------|--------|---------------------|
| GET    | /      | `getAll`            |
| GET    | /:id   | `getById`           |
| POST   | /      | `create`            |
| PUT    | /:id   | `update`            |
| DELETE | /:id   | `remove`            |

Nota: La ruta base `/api/clientes` la define `app.ts` al registrar este router.

## 6. Motivo de diseño

Separar las rutas del Controller facilita agregar middlewares por ruta (ej. autenticación) sin modificar el Controller.
