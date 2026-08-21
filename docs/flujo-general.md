# Flujo General de Datos

## Flujo Completo: Agregar un Cliente

### 1. Interacción del usuario

```
Usuario abre /clientes
  → hace click en "+ Nuevo Cliente"
  → se abre ClienteModal
  → llena el formulario (ClienteForm)
  → hace click en "Crear Cliente"
```

### 2. Frontend → clienteService

```typescript
// ClienteForm.tsx
const resultado = await clienteService.createCliente(form);
// form = { nombre, apellido, dni, fechaNacimiento, email }
```

### 3. clienteService → HTTP

```typescript
// clienteService.ts
const response = await fetch('http://localhost:4000/api/clientes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

### 4. Express → Router

```
// Express recibe POST /api/clientes
// app.ts tiene registrado:
app.use('/api/clientes', clienteRoutes);

// clienteRoutes.ts tiene:
router.post('/', clienteController.create);
```

### 5. Router → Controller

```typescript
// clienteController.ts
export async function create(req, res, next) {
  const data = { nombre, apellido, ... } // del req.body
  const errores = validarCamposCliente(data);
  if (errores.length > 0) → res.status(400)...
  const nuevoCliente = await clienteService.createCliente(data);
  res.status(201).json({ success: true, data: nuevoCliente });
}
```

### 6. Controller → Service

```typescript
// clienteService.ts
export async function createCliente(data) {
  // Verificar DNI único
  const existeDni = await clienteModel.getClienteByDni(data.dni);
  if (existeDni) throw Error('CONFLICT')
  
  // Verificar email único
  const existeEmail = await clienteModel.getClienteByEmail(data.email);
  if (existeEmail) throw Error('CONFLICT')
  
  // Insertar
  const id = await clienteModel.createCliente(data);
  
  // Recuperar y transformar
  const clienteDB = await clienteModel.getClienteById(id);
  return toDTO(clienteDB); // Incluye edad calculada
}
```

### 7. Service → Model → MySQL

```typescript
// clienteModel.ts
export async function createCliente(data) {
  const [result] = await pool.query(
    'INSERT INTO clientes (nombre, apellido, dni, fecha_nacimiento, email) VALUES (?, ?, ?, ?, ?)',
    [data.nombre, data.apellido, data.dni, data.fechaNacimiento, data.email]
  );
  return result.insertId; // ID autogenerado por MySQL
}
```

### 8. Camino de regreso

```
MySQL → insertId → clienteModel
  → id devuelto → clienteService
    → getClienteById(id) → nueva consulta SQL
      → ClienteDB (fila cruda con fecha_nacimiento como Date)
        → toDTO(cliente) → calcula edad
          → ClienteDTO { id, nombre, ..., edad: 33 }
            → clienteController → res.status(201).json()
              → clienteService (frontend) → handleResponse()
                → ClienteForm → onSuccess(cliente)
                  → ClientesPage → setClientes([...prev, cliente])
                    → ClientesList re-renderiza con el nuevo cliente
```

---

## Flujo: Listar Clientes

```
ClientesPage monta
  → useEffect → cargarClientes()
    → clienteService.getAllClientes()
      → GET http://localhost:4000/api/clientes
        → Express → clienteRoutes → clienteController.getAll
          → clienteService.getAllClientes()
            → clienteModel.getAllClientes()
              → SELECT * FROM clientes ORDER BY apellido, nombre
                → array de ClienteDB
                  → .map(toDTO) → array de ClienteDTO (con edad)
                    → JSON response
                      → clienteService (frontend) → devuelve Cliente[]
                        → setClientes(data)
                          → ClientesList renderiza tabla
```

---

## Flujo: Editar Cliente

```
Usuario hace click en "Editar"
  → handleEditar(cliente) → setClienteEditar(cliente)
    → ClienteModal abre con clienteEditar != null
      → ClienteForm se llena con datos del cliente
        → Usuario modifica campos
          → click "Actualizar"
            → clienteService.updateCliente(id, form)
              → PUT /api/clientes/:id
                → controller.update → service.updateCliente
                  → Verifica existencia (getClienteById)
                  → Verifica DNI único excluyendo id actual
                  → Verifica email único excluyendo id actual
                  → clienteModel.updateCliente(id, data)
                    → UPDATE clientes SET ... WHERE id = ?
                      → service recupera y devuelve ClienteDTO
                        → handleSuccess → actualiza array local
```

---

## Flujo: Eliminar Cliente

```
Usuario hace click en "Eliminar"
  → window.confirm() → usuario acepta
    → handleEliminar(id)
      → clienteService.deleteCliente(id)
        → DELETE /api/clientes/:id
          → controller.remove → service.deleteCliente
            → clienteModel.deleteCliente(id)
              → DELETE FROM clientes WHERE id = ?
                → result.affectedRows > 0 → true
                  → controller → res.status(200).json()
                    → setClientes(prev => prev.filter(c => c.id !== id))
                      → ClientesList actualiza tabla
```

---

## Cálculo de Edad

```
MySQL devuelve: fecha_nacimiento = Date('1990-05-15')
  → clienteService.toDTO(cliente)
    → calcularEdad(cliente.fecha_nacimiento)
      → hoy = new Date() // ej: 2024-08-20
      → edad = 2024 - 1990 = 34
      → mesDiff = 8 (ago) - 5 (may) = 3 > 0
      → El cumpleaños (mayo) ya pasó en 2024
      → edad final = 34 ✅
```

```
MySQL devuelve: fecha_nacimiento = Date('1990-11-20')
  → calcularEdad
      → hoy = 2024-08-20
      → edad = 2024 - 1990 = 34
      → mesDiff = 8 (ago) - 11 (nov) = -3 < 0
      → El cumpleaños (noviembre) aún NO ocurrió en 2024
      → edad-- → edad final = 33 ✅
```
