# clienteService.ts — Documentación

## 1. Propósito

Contener toda la lógica de negocio del dominio "Cliente": validaciones de unicidad, cálculo de edad y transformación de datos.

## 2. Responsabilidad

- Verificar unicidad de DNI y email antes de crear/actualizar
- Calcular la edad correctamente a partir de `fecha_nacimiento`
- Transformar `ClienteDB` (formato MySQL) → `ClienteDTO` (formato API)
- Lanzar errores con códigos semánticos (`NOT_FOUND`, `CONFLICT`) para que el middleware los traduzca a HTTP

## 3. Quién lo llama

```
clienteController.ts → clienteService.ts
```

## 4. Qué archivos llama

```
clienteService.ts → clienteModel.ts
```

## 5. Flujo de datos

**Recibe:** DTOs de entrada (`CreateClienteDTO`, `UpdateClienteDTO`, id)  
**Devuelve:** `ClienteDTO` (con `edad` calculada) o void

## 6. Flujo de ejecución — Ejemplo: `createCliente(data)`

1. Verificar DNI único → `clienteModel.getClienteByDni(data.dni)`
2. Si existe → lanzar error `CONFLICT`
3. Verificar email único → `clienteModel.getClienteByEmail(data.email)`
4. Si existe → lanzar error `CONFLICT`
5. Insertar → `clienteModel.createCliente(data)`
6. Recuperar registro creado → `clienteModel.getClienteById(nuevoId)`
7. Transformar a DTO → `toDTO(cliente)` (incluye `calcularEdad`)
8. Devolver `ClienteDTO` al controller

## 7. Cálculo de edad

```typescript
function calcularEdad(fechaNacimiento: Date): number {
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mesDiff = hoy.getMonth() - nacimiento.getMonth();
  if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--; // Todavía no cumplió años este año
  }
  return edad;
}
```

## 8. Motivo de diseño

El Service existe para que:
- El Controller no contenga lógica de negocio (solo HTTP)
- El Model no decida qué hacer con los datos (solo SQL)
- La lógica de negocio esté en un único lugar, testeable de forma independiente
