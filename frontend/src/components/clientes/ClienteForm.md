# ClienteForm.tsx — Documentación

## 1. Propósito

Formulario de creación y edición de clientes.

## 2. Responsabilidad

- Gestionar el estado de los campos del formulario
- Validar los datos antes de enviar (frontend validation)
- Llamar a clienteService para crear o actualizar
- Mostrar errores al usuario

## 3. Quién lo usa

```
ClienteModal.tsx → ClienteForm.tsx
```

## 4. Qué llama

```
ClienteForm.tsx → clienteService.ts → API Backend
```

## 5. Flujo — Crear cliente

1. Usuario llena el formulario
2. Click en "Crear Cliente"
3. `handleSubmit()` se ejecuta
4. `validar()` verifica los campos
5. Si hay errores → mostrar bajo cada campo
6. Si no → `clienteService.createCliente(form)`
7. Si la API responde OK → `onSuccess(cliente)` notifica al padre
8. Si la API responde error → mostrar `errorGeneral`

## 6. Props

| Prop           | Tipo                      | Descripción                         |
|----------------|---------------------------|-------------------------------------|
| `clienteEditar`| `Cliente \| null`         | Si existe, activa modo edición      |
| `onSuccess`    | `(c: Cliente) => void`    | Callback tras éxito                 |
| `onCancel`     | `() => void`              | Callback para cancelar              |

## 7. Validaciones frontend

- Nombre: obligatorio
- Apellido: obligatorio
- DNI: obligatorio, 7-8 dígitos
- Fecha: obligatoria, no futura
- Email: obligatorio, formato válido
