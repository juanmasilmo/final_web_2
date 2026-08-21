# page.tsx (Clientes) — Documentación

## 1. Propósito

Página principal de gestión de clientes. Orquesta el CRUD completo.

## 2. Responsabilidad

- Cargar el listado de clientes al montar
- Gestionar el estado global de la página (clientes, modal, errores)
- Coordinar operaciones CRUD actualizando el estado local

## 3. Quién lo renderiza

Next.js App Router (ruta `/clientes`)

## 4. Qué usa

```
ClientesPage → clienteService (HTTP)
ClientesPage → ClientesList (render)
ClientesPage → ClienteModal → ClienteForm
```

## 5. Flujo — Listar clientes

1. Componente monta
2. `useEffect` llama `cargarClientes()`
3. `clienteService.getAllClientes()` hace GET /api/clientes
4. Backend responde con array de clientes (con edad)
5. `setClientes(data)` actualiza el estado
6. React re-renderiza `ClientesList` con los nuevos datos

## 6. Flujo — Eliminar cliente

1. Usuario hace click en "Eliminar" en ClientesList
2. `window.confirm()` pide confirmación
3. `handleEliminar(id)` llama `clienteService.deleteCliente(id)`
4. DELETE /api/clientes/:id
5. Si OK → `setClientes(prev => prev.filter(c => c.id !== id))`
6. Mostrar mensaje de éxito

## 7. Optimización

Tras crear/editar/eliminar, NO se recarga el listado completo desde la API.
Se actualiza directamente el estado local para evitar una petición extra.
