/**
 * page.tsx (Clientes)
 * -------------------
 * Responsabilidad: Página principal de gestión de clientes.
 *
 * Ruta: /clientes
 *
 * Esta es la página principal del CRUD. Orquesta:
 *   - Carga inicial de clientes desde la API
 *   - Apertura del modal de creación/edición
 *   - Eliminación de clientes
 *   - Actualización del estado local tras operaciones CRUD
 *
 * Es un Client Component ('use client') porque necesita estado
 * y efectos de React (useState, useEffect).
 *
 * Quién lo usa: Next.js Router (ruta /clientes)
 * Qué usa: clienteService, ClientesList, ClienteModal
 *
 * Flujo:
 *   Usuario → ClientesPage → clienteService → API Backend → MySQL
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Cliente } from '@/types/cliente';
import * as clienteService from '@/services/clienteService';
import ClientesList from '@/components/clientes/ClientesList';
import ClienteModal from '@/components/clientes/ClienteModal';

export default function ClientesPage() {
  // Lista de clientes obtenida de la API
  const [clientes, setClientes] = useState<Cliente[]>([]);
  // Estado de carga inicial
  const [cargando, setCargando] = useState(true);
  // Error general de la página (ej: fallo al cargar)
  const [error, setError] = useState<string>('');
  // Controla si el modal está abierto
  const [modalAbierto, setModalAbierto] = useState(false);
  // Cliente seleccionado para editar (null si es creación)
  const [clienteEditar, setClienteEditar] = useState<Cliente | null>(null);
  // Mensaje de éxito temporal
  const [mensajeExito, setMensajeExito] = useState<string>('');

  /**
   * Cargar clientes desde la API.
   * useCallback evita recrear la función en cada render.
   */
  const cargarClientes = useCallback(async () => {
    try {
      setCargando(true);
      setError('');
      const data = await clienteService.getAllClientes();
      setClientes(data);
    } catch {
      setError('No se pudo cargar la lista de clientes. Verificá que el backend esté corriendo.');
    } finally {
      setCargando(false);
    }
  }, []);

  // Cargar clientes al montar el componente
  useEffect(() => {
    cargarClientes();
  }, [cargarClientes]);

  /**
   * Mostrar mensaje de éxito por 3 segundos.
   */
  const mostrarExito = (mensaje: string) => {
    setMensajeExito(mensaje);
    setTimeout(() => setMensajeExito(''), 3000);
  };

  /**
   * Handler: abrir modal para crear nuevo cliente.
   */
  const handleNuevoCliente = () => {
    setClienteEditar(null);
    setModalAbierto(true);
  };

  /**
   * Handler: abrir modal para editar cliente existente.
   */
  const handleEditar = (cliente: Cliente) => {
    setClienteEditar(cliente);
    setModalAbierto(true);
  };

  /**
   * Handler: eliminar cliente por ID.
   * La confirmación se maneja en ClientesList.
   */
  const handleEliminar = async (id: number) => {
    try {
      await clienteService.deleteCliente(id);
      // Actualizar estado local eliminando el cliente del array
      setClientes((prev) => prev.filter((c) => c.id !== id));
      mostrarExito('Cliente eliminado correctamente');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al eliminar el cliente');
    }
  };

  /**
   * Handler: operación de creación/edición exitosa.
   * Actualiza el estado local sin recargar toda la lista.
   */
  const handleSuccess = (clienteGuardado: Cliente) => {
    if (clienteEditar) {
      // Edición: reemplazar el cliente en el array
      setClientes((prev) =>
        prev.map((c) => (c.id === clienteGuardado.id ? clienteGuardado : c))
      );
      mostrarExito('Cliente actualizado correctamente');
    } else {
      // Creación: agregar el nuevo cliente al array
      setClientes((prev) => [...prev, clienteGuardado]);
      mostrarExito('Cliente creado correctamente');
    }
    setModalAbierto(false);
    setClienteEditar(null);
  };

  /**
   * Handler: cerrar modal.
   */
  const handleCerrarModal = () => {
    setModalAbierto(false);
    setClienteEditar(null);
  };

  return (
    <div>
      {/* Header de la página */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 text-sm mt-1">Gestión del listado de clientes</p>
        </div>
        <button
          onClick={handleNuevoCliente}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Nuevo Cliente
        </button>
      </div>

      {/* Mensaje de éxito */}
      {mensajeExito && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {mensajeExito}
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
          <button
            onClick={cargarClientes}
            className="ml-2 underline hover:no-underline"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Lista de clientes */}
      <ClientesList
        clientes={clientes}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        cargando={cargando}
      />

      {/* Modal de creación/edición */}
      <ClienteModal
        isOpen={modalAbierto}
        clienteEditar={clienteEditar}
        onSuccess={handleSuccess}
        onClose={handleCerrarModal}
      />
    </div>
  );
}
