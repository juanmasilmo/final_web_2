# Documentación de la API REST

**Base URL:** `http://localhost:4000`  
**Prefijo de clientes:** `/api/clientes`

---

## Formato de respuesta

Todas las respuestas siguen este formato:

```json
{
  "success": true | false,
  "data": { ... } | [ ... ],
  "message": "...",
  "errors": [ "..." ],
  "total": 8
}
```

---

## GET /api/clientes

Obtiene todos los clientes.

**Archivo que recibe:** `clienteRoutes.ts`  
**Handler:** `clienteController.getAll`  
**Servicio:** `clienteService.getAllClientes`  
**Model:** `clienteModel.getAllClientes`  
**SQL:** `SELECT ... FROM clientes ORDER BY apellido, nombre`

### Request
```
GET /api/clientes
Headers: ninguno requerido
Body: ninguno
```

### Response 200
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Juan",
      "apellido": "García",
      "dni": "12345678",
      "fechaNacimiento": "1990-05-15",
      "email": "juan.garcia@email.com",
      "edad": 34,
      "createdAt": "2024-08-20T10:00:00.000Z",
      "updatedAt": "2024-08-20T10:00:00.000Z"
    }
  ],
  "total": 1
}
```

---

## GET /api/clientes/:id

Obtiene un cliente por ID.

**Archivo que recibe:** `clienteRoutes.ts`  
**Handler:** `clienteController.getById`  
**Servicio:** `clienteService.getClienteById`  
**SQL:** `SELECT ... FROM clientes WHERE id = ?`

### Request
```
GET /api/clientes/1
```

### Response 200
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Juan",
    ...
  }
}
```

### Response 404
```json
{
  "success": false,
  "message": "Cliente no encontrado"
}
```

---

## POST /api/clientes

Crea un nuevo cliente.

**Archivo que recibe:** `clienteRoutes.ts`  
**Handler:** `clienteController.create`  
**Servicio:** `clienteService.createCliente`  
**SQL:** `INSERT INTO clientes (...) VALUES (...)`

### Request
```
POST /api/clientes
Content-Type: application/json

{
  "nombre": "Pedro",
  "apellido": "Fernández",
  "dni": "87654321",
  "fechaNacimiento": "1995-03-20",
  "email": "pedro@email.com"
}
```

### Response 201
```json
{
  "success": true,
  "data": {
    "id": 9,
    "nombre": "Pedro",
    "apellido": "Fernández",
    "dni": "87654321",
    "fechaNacimiento": "1995-03-20",
    "email": "pedro@email.com",
    "edad": 29,
    "createdAt": "2024-08-20T15:30:00.000Z",
    "updatedAt": "2024-08-20T15:30:00.000Z"
  },
  "message": "Cliente creado exitosamente"
}
```

### Response 400 (validación)
```json
{
  "success": false,
  "message": "Datos inválidos",
  "errors": [
    "El nombre es obligatorio",
    "El DNI debe contener entre 7 y 8 dígitos numéricos"
  ]
}
```

### Response 409 (conflicto)
```json
{
  "success": false,
  "message": "Ya existe un cliente con ese DNI"
}
```

---

## PUT /api/clientes/:id

Actualiza un cliente existente.

**Handler:** `clienteController.update`  
**SQL:** `UPDATE clientes SET ... WHERE id = ?`

### Request
```
PUT /api/clientes/1
Content-Type: application/json

{
  "nombre": "Juan Carlos",
  "apellido": "García",
  "dni": "12345678",
  "fechaNacimiento": "1990-05-15",
  "email": "juancarlos@email.com"
}
```

### Response 200
```json
{
  "success": true,
  "data": { ... },
  "message": "Cliente actualizado exitosamente"
}
```

### Response 404
```json
{
  "success": false,
  "message": "Cliente no encontrado"
}
```

---

## DELETE /api/clientes/:id

Elimina un cliente.

**Handler:** `clienteController.remove`  
**SQL:** `DELETE FROM clientes WHERE id = ?`

### Request
```
DELETE /api/clientes/1
```

### Response 200
```json
{
  "success": true,
  "message": "Cliente eliminado exitosamente"
}
```

### Response 404
```json
{
  "success": false,
  "message": "Cliente no encontrado"
}
```

---

## Códigos HTTP utilizados

| Código | Nombre | Cuándo |
|--------|--------|--------|
| 200 | OK | GET exitoso, PUT exitoso, DELETE exitoso |
| 201 | Created | POST exitoso (recurso creado) |
| 400 | Bad Request | Datos de entrada inválidos |
| 404 | Not Found | Cliente no encontrado |
| 409 | Conflict | DNI o email ya existen |
| 500 | Internal Server Error | Error inesperado del servidor |

---

## CORS

```
Frontend (http://localhost:3000)
        ↓
HTTP Request con header Origin
        ↓
CORS Middleware (configurado en app.ts)
        ↓
Agrega: Access-Control-Allow-Origin: http://localhost:3000
Agrega: Access-Control-Allow-Methods: GET, POST, PUT, DELETE
        ↓
Express procesa la petición
```

Sin CORS configurado, el navegador rechaza las respuestas del backend.
