# ClienteModal.tsx — Documentación

## 1. Propósito

Modal/overlay que contiene el formulario de clientes.

## 2. Responsabilidad

Mostrar u ocultar el formulario en un overlay. Gestionar el título según modo (crear/editar).

## 3. Quién lo usa

```
app/clientes/page.tsx → ClienteModal.tsx
```

## 4. Qué usa

```
ClienteModal.tsx → ClienteForm.tsx
```

## 5. Props

| Prop           | Tipo                      | Descripción                     |
|----------------|---------------------------|---------------------------------|
| `isOpen`       | `boolean`                 | Controla visibilidad            |
| `clienteEditar`| `Cliente \| null`         | Modo edición si existe          |
| `onSuccess`    | `(c: Cliente) => void`    | Callback éxito                  |
| `onClose`      | `() => void`              | Cerrar modal                    |
