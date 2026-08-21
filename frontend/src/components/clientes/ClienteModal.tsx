/**
 * ClienteModal.tsx
 * ----------------
 * Responsabilidad: Modal/Dialog que contiene el ClienteForm.
 *
 * Muestra u oculta el formulario de creación/edición en un overlay.
 * Gestiona el título del modal según si se está creando o editando.
 *
 * Props:
 *   - isOpen: controla si el modal está visible
 *   - clienteEditar: cliente a editar (null si es creación)
 *   - onSuccess: callback tras operación exitosa
 *   - onClose: callback para cerrar el modal
 *
 * Quién lo usa: ClientesPage
 * Qué usa: ClienteForm.tsx
 */

'use client';

import { Cliente } from '@/types/cliente';
import ClienteForm from './ClienteForm';

interface ClienteModalProps {
  isOpen: boolean;
  clienteEditar: Cliente | null;
  onSuccess: (cliente: Cliente) => void;
  onClose: () => void;
}

export default function ClienteModal({ isOpen, clienteEditar, onSuccess, onClose }: ClienteModalProps) {
  if (!isOpen) return null;

  return (
    // Overlay oscuro detrás del modal
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        // Cerrar al hacer click fuera del modal
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Contenedor del modal */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        {/* Header del modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {clienteEditar ? 'Editar Cliente' : 'Nuevo Cliente'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cuerpo del modal: el formulario */}
        <div className="p-6">
          <ClienteForm
            clienteEditar={clienteEditar}
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
