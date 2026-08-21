# Sistema de Gestión de Clientes

Proyecto educativo **Full Stack** con CRUD completo de clientes.
Foco en arquitectura, separación de capas y flujo de datos.

---

## Tecnologías

| Capa | Tecnologías |
|------|-------------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Backend | Node.js, Express 4, TypeScript |
| Base de datos | MySQL 8+, mysql2 (sin ORM) |
| Gestor de paquetes | pnpm |

---

## Estructura del proyecto

```
final_web2/
├── README.md
├── database/
│   ├── schema.sql      ← Crear BD y tabla
│   └── seed.sql        ← Datos de prueba
├── backend/            ← API REST (puerto 4000)
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── config/database.ts
│       ├── types/cliente.ts
│       ├── models/clienteModel.ts
│       ├── services/clienteService.ts
│       ├── controllers/clienteController.ts
│       ├── routes/clienteRoutes.ts
│       ├── middlewares/errorHandler.ts
│       ├── app.ts
│       └── server.ts
├── frontend/           ← Aplicación Next.js (puerto 3000)
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   ├── nosotros/page.tsx
│       │   └── clientes/page.tsx
│       ├── components/
│       │   ├── Navbar.tsx
│       │   └── clientes/
│       │       ├── ClientesList.tsx
│       │       ├── ClienteForm.tsx
│       │       └── ClienteModal.tsx
│       ├── services/clienteService.ts
│       └── types/cliente.ts
└── docs/
    ├── arquitectura.md
    ├── flujo-general.md
    ├── api.md
    └── base-de-datos.md
```

---

## Requisitos previos

- Node.js >= 18
- pnpm (`npm install -g pnpm`)
- MySQL 8+

---

## Instalación

### 1. Clonar / descargar el proyecto

```bash
cd D:\Sistemas\final_web2
```

### 2. Configurar MySQL

```bash
# Crear la base de datos y tabla
mysql -u root -p < database/schema.sql

# Insertar datos de prueba
mysql -u root -p clientes_db < database/seed.sql
```

### 3. Configurar el backend

```bash
cd backend
copy .env.example .env
```

Editar `backend/.env` con tus credenciales de MySQL:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=clientes_db
DB_USER=root
DB_PASSWORD=tu_password_aqui
```

```bash
pnpm install
```

### 4. Configurar el frontend

```bash
cd ..\ (volver a final_web2)
cd frontend
copy .env.example .env.local
```

El archivo `.env.local` debe contener:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

```bash
pnpm install
```

---

## Ejecución

### Backend (Terminal 1)

```bash
cd backend
pnpm dev
```

El servidor arranca en: `http://localhost:4000`  
Health check: `http://localhost:4000/health`

### Frontend (Terminal 2)

```bash
cd frontend
pnpm dev
```

Aplicación disponible en: `http://localhost:3000`

---

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/clientes` | Listar todos los clientes |
| GET | `/api/clientes/:id` | Obtener cliente por ID |
| POST | `/api/clientes` | Crear cliente |
| PUT | `/api/clientes/:id` | Actualizar cliente |
| DELETE | `/api/clientes/:id` | Eliminar cliente |
| GET | `/health` | Estado del servidor |

---

## Flujo completo

```
Usuario (browser)
     ↓
Next.js (frontend :3000)
     ↓
clienteService.ts → fetch()
     ↓
HTTP + JSON
     ↓
CORS Middleware (Express)
     ↓
clienteRoutes.ts
     ↓
clienteController.ts
     ↓
clienteService.ts (backend)
     ↓
clienteModel.ts
     ↓
database.ts → pool
     ↓
MySQL (clientes_db)
```

---

## Acceso a la web

Una vez que el frontend está corriendo, abrir el navegador en:

```
http://localhost:3000
```

---

## Navegación de la aplicación

### Punto de entrada

```
http://localhost:3000
        ↓
Página de Inicio (/)
```

### Árbol de navegación completo

```
http://localhost:3000  →  Página de Inicio (/)
        │
        ├── Click en "Inicio" (Navbar)
        │       └── Página de Inicio (/)
        │               └── Click en "Ver Clientes"
        │                       └── Página de Clientes (/clientes)
        │
        ├── Click en "Nosotros" (Navbar)
        │       └── Página Nosotros (/nosotros)
        │               └── Información sobre el proyecto y arquitectura
        │
        └── Click en "Clientes" (Navbar)
                └── Página de Clientes (/clientes)
                        │
                        ├── Click en "+ Nuevo Cliente"
                        │       └── Modal con formulario de creación
                        │               ├── Completar campos → Click "Crear Cliente"
                        │               │       └── POST /api/clientes → cliente agregado al listado
                        │               └── Click "Cancelar"
                        │                       └── Cierra el modal, sin cambios
                        │
                        ├── Click en "Editar" (fila de un cliente)
                        │       └── Modal con formulario pre-cargado con datos del cliente
                        │               ├── Modificar campos → Click "Actualizar"
                        │               │       └── PUT /api/clientes/:id → fila actualizada en el listado
                        │               └── Click "Cancelar"
                        │                       └── Cierra el modal, sin cambios
                        │
                        └── Click en "Eliminar" (fila de un cliente)
                                └── Ventana de confirmación (confirm)
                                        ├── Aceptar
                                        │       └── DELETE /api/clientes/:id → cliente removido del listado
                                        └── Cancelar
                                                └── Sin cambios
```

### Páginas disponibles

| URL | Descripción |
|-----|-------------|
| `http://localhost:3000/` | Página de inicio |
| `http://localhost:3000/nosotros` | Información sobre el proyecto |
| `http://localhost:3000/clientes` | CRUD completo de clientes |

---

## Documentación

| Archivo | Descripción |
|---------|-------------|
| `docs/arquitectura.md` | Arquitectura general |
| `docs/flujo-general.md` | Flujo de datos completo |
| `docs/api.md` | Documentación de endpoints |
| `docs/base-de-datos.md` | Estructura de la BD |
| `backend/src/config/database.md` | Documentación de database.ts |
| `backend/src/types/cliente.md` | Documentación de types |
| `backend/src/models/clienteModel.md` | Documentación del Model |
| `backend/src/services/clienteService.md` | Documentación del Service |
| `backend/src/controllers/clienteController.md` | Documentación del Controller |
| `backend/src/routes/clienteRoutes.md` | Documentación de Routes |
| `backend/src/middlewares/errorHandler.md` | Documentación del middleware |
| `backend/src/app.md` | Documentación de app.ts |
| `backend/src/server.md` | Documentación de server.ts |
| `frontend/src/types/cliente.md` | Tipos del frontend |
| `frontend/src/services/clienteService.md` | Service del frontend |
| `frontend/src/components/Navbar.md` | Componente Navbar |
| `frontend/src/components/clientes/ClienteForm.md` | Formulario de clientes |
| `frontend/src/components/clientes/ClienteModal.md` | Modal de clientes |
| `frontend/src/components/clientes/ClientesList.md` | Lista de clientes |
| `frontend/src/app/clientes/page.md` | Página principal de clientes |

---

## Build de producción

### Backend
```bash
cd backend
pnpm build   # Compila TypeScript a dist/
pnpm start   # Ejecuta el build
```

### Frontend
```bash
cd frontend
pnpm build   # Genera el build optimizado
pnpm start   # Sirve el build
```

---

## Variables de entorno

### Backend (`backend/.env`)

| Variable | Descripción | Default |
|----------|-------------|----------|
| `PORT` | Puerto del servidor | 4000 |
| `DB_HOST` | Host de MySQL | localhost |
| `DB_PORT` | Puerto de MySQL | 3306 |
| `DB_NAME` | Nombre de la BD | clientes_db |
| `DB_USER` | Usuario MySQL | root |
| `DB_PASSWORD` | Contraseña MySQL | - |
| `FRONTEND_URL` | URL del frontend para CORS | http://localhost:3000 |

### Frontend (`frontend/.env.local`)

| Variable | Descripción | Default |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | URL base de la API | http://localhost:4000 |

---

## Características del proyecto

- ✅ CRUD completo de clientes
- ✅ Edad calculada automáticamente (no almacenada)
- ✅ Validaciones en frontend y backend
- ✅ Unicidad de DNI y email
- ✅ Arquitectura MVC estricta
- ✅ Separación Frontend / Backend / BD
- ✅ TypeScript en todo el stack
- ✅ Manejo de errores con códigos HTTP apropiados
- ✅ CORS configurado correctamente
- ✅ Variables de entorno
- ✅ Documentación individual por archivo
- ✅ Pool de conexiones MySQL
- ✅ Diseño responsive con Tailwind CSS
