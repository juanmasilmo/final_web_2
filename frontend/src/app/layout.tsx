/**
 * layout.tsx (root)
 * -----------------
 * Responsabilidad: Layout raíz de la aplicación Next.js.
 *
 * Define la estructura HTML base (html, body) que envuelve todas las páginas.
 * Incluye el Navbar global y los estilos globales de Tailwind.
 *
 * En Next.js App Router, el RootLayout envuelve automáticamente
 * todas las páginas de la aplicación.
 */

import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Sistema de Clientes',
  description: 'Proyecto de práctica: CRUD de clientes con Next.js y Express',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        {/* Navbar visible en todas las páginas */}
        <Navbar />
        {/* Contenido de cada página */}
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {children}
        </main>
      </body>
    </html>
  );
}
