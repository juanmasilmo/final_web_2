# cliente.ts (types) — Documentación

## 1. Propósito

Definir los tipos TypeScript del dominio "Cliente" usados en todo el backend.

## 2. Responsabilidad

Ser la fuente única de definición de tipos. Evitar definiciones duplicadas y garantizar consistencia entre capas.

## 3. Quién lo llama

```
clienteModel.ts     → types/cliente.ts
clienteService.ts   → types/cliente.ts
clienteController.ts → types/cliente.ts
```

## 4. Qué archivos llama

Ninguno. Es un módulo de solo tipos, sin dependencias.

## 5. Flujo de datos

| Tipo               | Dirección   | Descripción                              |
|--------------------|-------------|------------------------------------------|
| `ClienteDB`        | BD → App    | Fila cruda de MySQL (snake_case, Dates)  |
| `ClienteDTO`       | App → API   | Objeto transformado para el frontend     |
| `CreateClienteDTO` | API → App   | Body del POST /api/clientes              |
| `UpdateClienteDTO` | API → App   | Body del PUT /api/clientes/:id           |

## 6. Flujo de ejecución

No ejecuta código. Es un módulo de declaración de tipos de TypeScript (solo compile-time).

## 7. Comunicación con otros archivos

```typescript
import { ClienteDB, ClienteDTO, CreateClienteDTO } from '../types/cliente';
```

## 8. Motivo de diseño

Separar los tipos en un archivo dedicado permite:
- Cambiar la estructura de BD sin afectar directamente la API (se actualiza `ClienteDB` y la función `toDTO`)
- Que el compilador detecte errores de tipo en todas las capas
- Documentar explícitamente qué datos circulan en cada etapa
