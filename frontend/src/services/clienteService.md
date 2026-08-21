# clienteService.ts (frontend) — Documentación

## 1. Propósito

Centralizar todas las llamadas HTTP a la API REST del backend.

## 2. Responsabilidad

- Hacer fetch() a los endpoints del backend
- Manejar errores de red y respuestas no-ok
- Devolver datos tipados a los componentes

## 3. Quién lo llama

```
ClientesPage (app/clientes/page.tsx) → clienteService.ts
ClienteForm.tsx → clienteService.ts
```

## 4. Endpoints que consume

| Función             | Método | Endpoint                  |
|---------------------|--------|---------------------------|
| `getAllClientes()`  | GET    | /api/clientes             |
| `getClienteById()`  | GET    | /api/clientes/:id         |
| `createCliente()`   | POST   | /api/clientes             |
| `updateCliente()`   | PUT    | /api/clientes/:id         |
| `deleteCliente()`   | DELETE | /api/clientes/:id         |

## 5. Variable de entorno

`NEXT_PUBLIC_API_URL`: URL base de la API. Por defecto `http://localhost:4000`.

## 6. Motivo de diseño

Si la URL de la API cambia (ej. se despliega en producción), solo se cambia en `.env`, no en los componentes.
