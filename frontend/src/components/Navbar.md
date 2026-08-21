# Navbar.tsx — Documentación

## 1. Propósito

Barra de navegación global visible en todas las páginas.

## 2. Responsabilidad

Mostrar links a Inicio, Nosotros y Clientes. Resaltar el link de la página activa.

## 3. Quién lo usa

```
app/layout.tsx → Navbar.tsx
```

## 4. Tecnología clave

- `usePathname()` de Next.js: detecta la ruta actual para resaltar el link activo
- `Link` de Next.js: navegación del lado del cliente sin recarga
- `'use client'`: necesario porque usa hooks de React

## 5. Motivo de diseño

Al incluirlo en el RootLayout, el Navbar aparece en todas las páginas sin repetir código.
