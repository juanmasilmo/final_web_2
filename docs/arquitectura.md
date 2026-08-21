# Arquitectura del Proyecto

## Visión General

Este proyecto implementa una arquitectura **Full Stack separada en tres capas independientes**:

```
D:\Sistemas\final_web2\
├── frontend/     → Aplicación Next.js (Puerto 3000)
├── backend/      → API REST Express (Puerto 4000)
└── database/     → Scripts MySQL
```

Cada capa tiene una responsabilidad única y se comunica con la siguiente mediante interfaces bien definidas.

---

## Frontend — Next.js

**Puerto:** 3000  
**Tecnologías:** Next.js 14, React 18, TypeScript, Tailwind CSS  
**Carpeta:** `frontend/src/`

### Estructura

```
frontend/src/
├── app/
│   ├── layout.tsx          ← Layout raíz (HTML base, Navbar)
│   ├── page.tsx            ← Página de inicio (/)
│   ├── nosotros/page.tsx   ← Página Nosotros (/nosotros)
│   └── clientes/page.tsx   ← Página CRUD de clientes (/clientes)
├── components/
│   ├── Navbar.tsx          ← Barra de navegación global
│   └── clientes/
│       ├── ClientesList.tsx  ← Tabla de clientes
│       ├── ClienteForm.tsx   ← Formulario crear/editar
│       └── ClienteModal.tsx  ← Modal que contiene el form
├── services/
│   └── clienteService.ts   ← Capa de comunicación con la API
└── types/
    └── cliente.ts          ← Tipos TypeScript del dominio
```

### Responsabilidades

| Capa | Archivo | Responsabilidad |
|------|---------|----------------|
| Página | `clientes/page.tsx` | Orquesta el CRUD, gestiona estado global |
| Componente | `ClientesList.tsx` | Renderiza la tabla |
| Componente | `ClienteForm.tsx` | Formulario con validaciones |
| Componente | `ClienteModal.tsx` | Overlay/dialog del formulario |
| Service | `clienteService.ts` | Llamadas HTTP a la API |
| Types | `cliente.ts` | Definición de interfaces |

---

## Backend — Express MVC

**Puerto:** 4000  
**Tecnologías:** Node.js, Express 4, TypeScript, mysql2  
**Carpeta:** `backend/src/`

### Estructura MVC

```
backend/src/
├── config/
│   └── database.ts       ← Pool de conexiones MySQL
├── types/
│   └── cliente.ts        ← Interfaces TypeScript
├── models/
│   └── clienteModel.ts   ← Consultas SQL (capa M)
├── services/
│   └── clienteService.ts ← Lógica de negocio
├── controllers/
│   └── clienteController.ts ← Handlers HTTP (capa C)
├── routes/
│   └── clienteRoutes.ts  ← Mapeo rutas → controllers (capa C)
├── middlewares/
│   └── errorHandler.ts   ← Manejo centralizado de errores
├── app.ts                ← Configuración de Express
└── server.ts             ← Inicio del servidor HTTP
```

### Responsabilidades MVC

| Capa | Archivo | Responsabilidad |
|------|---------|----------------|
| Route | `clienteRoutes.ts` | Mapear endpoint → controller |
| Controller | `clienteController.ts` | Parsear request, llamar service, construir response |
| Service | `clienteService.ts` | Lógica de negocio, validaciones, transformaciones |
| Model | `clienteModel.ts` | Ejecutar SQL, acceder a MySQL |
| Config | `database.ts` | Configurar pool de conexiones |

### Reglas de arquitectura

- ❌ No poner SQL en controllers
- ❌ No poner lógica de negocio en routes
- ❌ No abrir conexiones MySQL directamente en models (usar `pool` de `database.ts`)
- ✅ Solo el Model accede a MySQL
- ✅ Solo el Service contiene lógica de negocio
- ✅ Solo el Controller maneja el request/response HTTP

---

## Base de Datos — MySQL

**Base de datos:** `clientes_db`  
**Tabla principal:** `clientes`  
**Scripts:** `database/schema.sql`, `database/seed.sql`

### Decisiones de diseño

- La `edad` **NO se almacena**. Se calcula en tiempo real desde `fecha_nacimiento`
- `dni` y `email` tienen restricciones `UNIQUE`
- Se usa `InnoDB` para soporte de transacciones
- Timestamps `created_at` y `updated_at` automáticos

---

## Comunicación entre capas

```
Frontend (Next.js :3000)
        ↓
   HTTP + JSON
        ↓
CORS Middleware (Express)
        ↓
Express Router
        ↓
Controller (parse request)
        ↓
Service (business logic)
        ↓
Model (SQL queries)
        ↓
MySQL (clientes_db)
```

---

## Separación estricta

| Prohibición | Justificación |
|-------------|---------------|
| Frontend NO accede a MySQL | Seguridad y separación de capas |
| Controller NO hace SQL | Viola el principio de responsabilidad única |
| Route NO hace lógica | La route solo conecta URL con función |
| Model NO decide reglas de negocio | Las reglas van en el Service |
