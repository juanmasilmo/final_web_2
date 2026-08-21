# clienteController.ts — Documentación

## 1. Propósito

Recibir peticiones HTTP, extraer y validar los datos del request, llamar al Service y construir la respuesta HTTP.

## 2. Responsabilidad

- Parsear parámetros de URL y body del request
- Validar formato de los datos de entrada
- Llamar al método correspondiente de `clienteService`
- Construir el JSON de respuesta con el código HTTP correcto
- Pasar errores al middleware con `next(error)`

## 3. Quién lo llama

```
clienteRoutes.ts → clienteController.ts
```

## 4. Qué archivos llama

```
clienteController.ts → clienteService.ts
```

## 5. Flujo de datos

**Recibe:** `Request` de Express (params, body, query)  
**Devuelve:** `Response` JSON al cliente HTTP

## 6. Endpoints y flujo

| Método | Ruta              | Handler     | Código éxito |
|--------|-------------------|-------------|---------------|
| GET    | /api/clientes     | `getAll`    | 200           |
| GET    | /api/clientes/:id | `getById`   | 200           |
| POST   | /api/clientes     | `create`    | 201           |
| PUT    | /api/clientes/:id | `update`    | 200           |
| DELETE | /api/clientes/:id | `remove`    | 200           |

## 7. Validaciones implementadas

- `nombre` y `apellido`: obligatorios, máx 100 chars
- `dni`: obligatorio, 7-8 dígitos numéricos
- `fechaNacimiento`: obligatoria, fecha válida, no futura
- `email`: obligatorio, formato válido, máx 150 chars

## 8. Motivo de diseño

El Controller no contiene lógica de negocio. Si la validación de "unicidad de DNI" cambia, se modifica solo en el Service, no en el Controller.
