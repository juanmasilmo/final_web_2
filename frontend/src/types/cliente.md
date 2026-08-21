# cliente.ts (types - frontend) — Documentación

## 1. Propósito

Definir los tipos TypeScript del dominio "Cliente" usados en el frontend.

## 2. Responsabilidad

Garantizar consistencia de tipos entre la API del backend y los componentes del frontend.

## 3. Quién lo usa

```
clienteService.ts → types/cliente.ts
ClienteForm.tsx   → types/cliente.ts
ClientesList.tsx  → types/cliente.ts
ClientesPage.tsx  → types/cliente.ts
ClienteModal.tsx  → types/cliente.ts
```

## 4. Tipos definidos

| Tipo               | Uso                                              |
|--------------------|--------------------------------------------------|
| `Cliente`          | Objeto que devuelve la API (incluye `edad`)      |
| `ClienteFormData`  | Datos del formulario (sin id, edad, timestamps)  |
| `ApiResponse<T>`   | Wrapper genérico de respuesta de la API          |

## 5. Motivo de diseño

Separar tipos permite cambiar la estructura sin afectar componentes directamente.
