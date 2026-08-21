# Documentación de la Base de Datos

## Información general

| Campo | Valor |
|-------|-------|
| Motor | MySQL 8+ |
| Base de datos | `clientes_db` |
| Charset | `utf8mb4` |
| Collation | `utf8mb4_unicode_ci` |
| Script de creación | `database/schema.sql` |
| Script de datos | `database/seed.sql` |

---

## Tabla: clientes

### Definición de columnas

| Columna | Tipo | Null | Default | Extra | Descripción |
|---------|------|------|---------|-------|-------------|
| `id` | `INT UNSIGNED` | NO | - | AUTO_INCREMENT, PK | Identificador único |
| `nombre` | `VARCHAR(100)` | NO | - | - | Nombre del cliente |
| `apellido` | `VARCHAR(100)` | NO | - | - | Apellido del cliente |
| `dni` | `VARCHAR(8)` | NO | - | UNIQUE | DNI (7-8 dígitos) |
| `fecha_nacimiento` | `DATE` | NO | - | - | Fecha de nacimiento |
| `email` | `VARCHAR(150)` | NO | - | UNIQUE | Email del cliente |
| `created_at` | `TIMESTAMP` | NO | CURRENT_TIMESTAMP | - | Fecha de creación |
| `updated_at` | `TIMESTAMP` | NO | CURRENT_TIMESTAMP | ON UPDATE | Fecha de actualización |

### Por qué no se almacena la edad

La edad es un **dato derivado**: se puede calcular a partir de `fecha_nacimiento`. Si se almacenara, quedaría desactualizada automáticamente cada año. En su lugar, se calcula en tiempo de consulta en `clienteService.ts`.

---

## Restricciones e índices

### Restricciones de integridad

| Nombre | Columna | Tipo | Descripción |
|--------|---------|------|-------------|
| `PRIMARY KEY` | `id` | PK | Clave primaria autoincremental |
| `uq_clientes_dni` | `dni` | UNIQUE | Un DNI solo puede aparecer una vez |
| `uq_clientes_email` | `email` | UNIQUE | Un email solo puede aparecer una vez |

### Índices

| Nombre | Columnas | Motivo |
|--------|----------|--------|
| `PRIMARY` | `id` | Búsqueda por ID (O(log n)) |
| `uq_clientes_dni` | `dni` | Verificación de unicidad en INSERT/UPDATE |
| `uq_clientes_email` | `email` | Verificación de unicidad en INSERT/UPDATE |
| `idx_clientes_apellido_nombre` | `apellido, nombre` | Ordenamiento del listado |

---

## Consultas principales

### Listar todos los clientes
```sql
SELECT id, nombre, apellido, dni, fecha_nacimiento, email, created_at, updated_at 
FROM clientes 
ORDER BY apellido, nombre;
```

### Obtener cliente por ID
```sql
SELECT id, nombre, apellido, dni, fecha_nacimiento, email, created_at, updated_at 
FROM clientes 
WHERE id = ?;
```

### Verificar DNI único
```sql
SELECT id FROM clientes WHERE dni = ?;
-- En UPDATE, agregar: AND id != ? (excluir el cliente actual)
```

### Verificar email único
```sql
SELECT id FROM clientes WHERE email = ?;
-- En UPDATE, agregar: AND id != ?
```

### Insertar cliente
```sql
INSERT INTO clientes (nombre, apellido, dni, fecha_nacimiento, email) 
VALUES (?, ?, ?, ?, ?);
```

### Actualizar cliente
```sql
UPDATE clientes 
SET nombre = ?, apellido = ?, dni = ?, fecha_nacimiento = ?, email = ? 
WHERE id = ?;
```

### Eliminar cliente
```sql
DELETE FROM clientes WHERE id = ?;
```

---

## Configuración de conexión

La conexión se configura mediante variables de entorno en el backend:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=clientes_db
DB_USER=root
DB_PASSWORD=tu_password
```

El archivo `backend/src/config/database.ts` usa `mysql2/promise` para crear un pool de conexiones.

---

## Cómo inicializar la base de datos

```bash
# 1. Crear la base de datos y la tabla
mysql -u root -p < database/schema.sql

# 2. Insertar datos de prueba
mysql -u root -p clientes_db < database/seed.sql
```

O desde MySQL Workbench: abrir y ejecutar `schema.sql`, luego `seed.sql`.
