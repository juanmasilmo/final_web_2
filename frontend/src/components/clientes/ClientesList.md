# ClientesList.tsx — Documentación

## 1. Propósito

Mostrar la tabla de clientes con sus datos y acciones.

## 2. Responsabilidad

- Renderizar la tabla de clientes
- Formatear fechas y mostrar edad
- Invocar callbacks de editar y eliminar

## 3. Quién lo usa

```
app/clientes/page.tsx → ClientesList.tsx
```

## 4. Props

| Prop        | Tipo                          | Descripción                       |
|-------------|-------------------------------|-----------------------------------|
| `clientes`  | `Cliente[]`                   | Array de clientes a mostrar       |
| `onEditar`  | `(c: Cliente) => void`        | Callback al hacer click en Editar |
| `onEliminar`| `(id: number) => void`        | Callback al confirmar eliminación |
| `cargando`  | `boolean`                     | Muestra spinner de carga          |

## 5. Columnas

Nombre | Apellido | DNI | Fecha Nac. | Email | Edad | Acciones

## 6. Nota sobre edad

La edad se muestra directamente desde `cliente.edad`, que es calculada por el backend.
El frontend NO calcula la edad.
