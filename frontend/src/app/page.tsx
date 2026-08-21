/**
 * page.tsx (Inicio)
 * -----------------
 * Responsabilidad: Página de inicio de la aplicación.
 *
 * Ruta: /
 * Muestra una bienvenida y descripción del sistema.
 * Es un Server Component (sin 'use client') ya que no necesita interactividad.
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sistema de Gestión de Clientes
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Proyecto educativo de arquitectura Full Stack con Next.js, Express y MySQL.
        </p>
        <Link
          href="/clientes"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Ver Clientes
        </Link>
      </div>

      {/* Tarjetas de tecnologías */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Next.js 14</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Backend</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Node.js + Express</li>
            <li>TypeScript</li>
            <li>Arquitectura MVC</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Base de Datos</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>MySQL</li>
            <li>mysql2 (sin ORM)</li>
            <li>SQL directo</li>
          </ul>
        </div>
      </div>

      {/* Flujo de datos */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Flujo de Datos</h2>
        <div className="flex flex-col items-center gap-1 text-sm text-gray-600">
          {['Frontend (Next.js)', '↓', 'HTTP Request', '↓', 'Express + Router', '↓', 'Controller', '↓', 'Service', '↓', 'Model', '↓', 'MySQL'].map((step, i) => (
            <span key={i} className={step === '↓' ? 'text-blue-400 font-bold' : 'bg-gray-100 px-3 py-1 rounded'}>
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
