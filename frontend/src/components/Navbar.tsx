/**
 * Navbar.tsx
 * ----------
 * Responsabilidad: Barra de navegación principal de la aplicación.
 *
 * Muestra los links a las tres secciones: Inicio, Nosotros, Clientes.
 * Usa Next.js Link para navegación del lado del cliente (sin recarga de página).
 * Resalta el link activo usando usePathname() de Next.js.
 *
 * Quién lo usa: app/layout.tsx (se incluye en todas las páginas)
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  // usePathname devuelve la ruta actual, ej: "/clientes"
  const pathname = usePathname();

  // Función para determinar si un link está activo
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Nombre del sistema */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            Sistema de Clientes
          </Link>

          {/* Links de navegación */}
          <div className="flex gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/nosotros"
              className={`text-sm font-medium transition-colors ${
                isActive('/nosotros')
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Nosotros
            </Link>
            <Link
              href="/clientes"
              className={`text-sm font-medium transition-colors ${
                isActive('/clientes')
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Clientes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
