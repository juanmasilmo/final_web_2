/**
 * ClientesList.tsx
 * ----------------
 * Responsabilidad: Mostrar la tabla de clientes con acciones de editar y eliminar.
 *
 * Props:
 *   - clientes: array de clientes a mostrar
 *   - onEditar: callback cuando el usuario hace click en "Editar"
 *   - onEliminar: callback cuando el usuario confirma eliminar
 *   - cargando: boolean para mostrar estado de carga
 *
 * Quién lo usa: ClientesPage
 * Qué muestra: tabla con nombre, apellido, DNI, fecha de nacimiento, email, edad
 */

'use client';

import { Cliente } from '@/types/cliente';

interface ClientesListProps {
  clientes: Cliente[];
  onEditar: (cliente: Cliente) => void;
  onEliminar: (id: number) => void;
  cargando: boolean;
}

/**
 * Formatea una fecha ISO a formato legible: "DD/MM/YYYY"
 */
function formatearFecha(fechaISO: string): string {
  // Agregar T00:00:00 para evitar problemas de zona horaria al parsear
  const fecha = new Date(`${fechaISO}T00:00:00`);
  return fecha.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function ClientesList({ clientes, onEditar, onEliminar, cargando }: ClientesListProps) {
  if (cargando) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Cargando clientes...</div>
      </div>
    );
  }

  if (clientes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No hay clientes registrados.</p>
        <p className="text-gray-400 text-sm mt-1">Haz click en "Nuevo Cliente" para agregar uno.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Tabla responsiva */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-medium text-gray-700">Nombre</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Apellido</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">DNI</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Fecha Nac.</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Email</th>
              <th className="text-center px-4 py-3 font-medium text-gray-700">Edad</th>
              <th className="text-center px-4 py-3 font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-900">{cliente.nombre}</td>
                <td className="px-4 py-3 text-gray-900">{cliente.apellido}</td>
                <td className="px-4 py-3 text-gray-600 font-mono">{cliente.dni}</td>
                <td className="px-4 py-3 text-gray-600">{formatearFecha(cliente.fechaNacimiento)}</td>
                <td className="px-4 py-3 text-gray-600">{cliente.email}</td>
                <td className="px-4 py-3 text-center">
                  {/* Badge de edad */}
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {cliente.edad} años
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    {/* Botón Editar */}
                    <button
                      onClick={() => onEditar(cliente)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-xs px-2 py-1 rounded hover:bg-blue-50"
                    >
                      Editar
                    </button>
                    {/* Botón Eliminar */}
                    <button
                      onClick={() => {
                        // Confirmar antes de eliminar
                        if (window.confirm(`¿Eliminar a ${cliente.nombre} ${cliente.apellido}?`)) {
                          onEliminar(cliente.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-800 font-medium text-xs px-2 py-1 rounded hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer con total */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        Total: {clientes.length} cliente{clientes.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
