# clienteModel.ts — Documentación

## 1. Propósito

Ejecutar todas las consultas SQL de la tabla `clientes`. Es la única capa del sistema que interactúa directamente con MySQL.

## 2. Responsabilidad

Traducir operaciones de negocio (crear, leer, actualizar, eliminar) a consultas SQL específicas. No decide qué hacer ni cómo transformar los datos: solo ejecuta el SQL que le piden.

## 3. Quién lo llama

```
clienteService.ts → clienteModel.ts
```

## 4. Qué archivos llama

```
clienteModel.ts → database.ts (pool)
```

## 5. Flujo de datos

**Recibe:** Parámetros simples (id, data con los campos del cliente)  
**Devuelve:** Filas de MySQL como `ClienteDB` o valores escalares (`number`, `boolean`)

## 6. Flujo de ejecución — Ejemplo: `createCliente(data)`

1. `clienteService` llama `clienteModel.createCliente(data)`
2. Se ejecuta `pool.query(INSERT INTO clientes ...)`
3. MySQL inserta la fila y devuelve `ResultSetHeader`
4. Se extrae `result.insertId` (el nuevo ID autogenerado)
5. Se devuelve el `insertId` al service

## 7. Comunicación con otros archivos

```typescript
import { pool } from '../config/database'; // Conexión MySQL
import { ClienteDB, CreateClienteDTO } from '../types/cliente'; // Tipos
```

## 8. Comunicación con la base de datos

| Función              | SQL                                           | Tabla    |
|----------------------|-----------------------------------------------|----------|
| `getAllClientes()`   | `SELECT ... FROM clientes ORDER BY ...`       | clientes |
| `getClienteById()`  | `SELECT ... FROM clientes WHERE id = ?`       | clientes |
| `getClienteByDni()` | `SELECT ... FROM clientes WHERE dni = ?`      | clientes |
| `getClienteByEmail()`| `SELECT ... FROM clientes WHERE email = ?`   | clientes |
| `createCliente()`   | `INSERT INTO clientes (...) VALUES (?,...)`   | clientes |
| `updateCliente()`   | `UPDATE clientes SET ... WHERE id = ?`        | clientes |
| `deleteCliente()`   | `DELETE FROM clientes WHERE id = ?`           | clientes |

## 9. Motivo de diseño

Aislar las consultas SQL en el Model permite:
- Cambiar la BD (ej. PostgreSQL) sin modificar el Service ni el Controller
- Centralizar toda la lógica SQL en un único archivo
- Testear las consultas de forma independiente
