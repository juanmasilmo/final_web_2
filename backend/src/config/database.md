# database.ts — Documentación

## 1. Propósito

Configura y exporta el pool de conexiones a MySQL que utilizan todos los models del backend.

## 2. Responsabilidad

Centralizar la configuración de la base de datos. Es la única fuente de verdad para la conexión a MySQL. Ningún otro archivo crea conexiones directamente.

## 3. Quién lo llama

```
clienteModel.ts → database.ts
```

## 4. Qué archivos llama

No llama a otros archivos propios del proyecto. Utiliza:
- `mysql2/promise`: librería de conexión
- `dotenv`: para leer variables de entorno

## 5. Flujo de datos

**Recibe:** Variables de entorno `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`  
**Devuelve:** `pool` — instancia de `mysql2.Pool` lista para ejecutar consultas

## 6. Flujo de ejecución

1. Al importar el módulo, `dotenv.config()` carga las variables de entorno
2. `mysql.createPool(...)` crea el pool con la configuración
3. El pool queda disponible para ser importado por los models
4. Cuando un model ejecuta una consulta, el pool asigna una conexión disponible
5. Tras la consulta, la conexión regresa al pool

## 7. Comunicación con otros archivos

```typescript
import { pool } from '../config/database';
// Los models usan pool.query() para ejecutar SQL
```

## 8. Comunicación con la base de datos

El pool mantiene hasta 10 conexiones simultáneas a MySQL. Cada `pool.query()` toma una conexión disponible, ejecuta el SQL y la devuelve.

## 9. Motivo de diseño

Centralizar la conexión evita duplicación de código y facilita cambiar la configuración en un único lugar. Un pool es mejor que una sola conexión porque permite múltiples consultas concurrentes sin bloquear.
