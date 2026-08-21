/**
 * ClienteForm.tsx
 * ---------------
 * Responsabilidad: Formulario para crear o editar un cliente.
 *
 * Maneja:
 *   - Estado interno del formulario
 *   - Validaciones en el frontend antes de enviar
 *   - Llamada a clienteService para crear o actualizar
 *   - Mensajes de error al usuario
 *
 * Props:
 *   - clienteEditar: si se pasa, el form se llena con sus datos (modo edición)
 *   - onSuccess: callback que se ejecuta tras crear/editar exitosamente
 *   - onCancel: callback para cancelar el formulario
 *
 * Quién lo usa: ClienteModal.tsx
 * Qué llama: clienteService.ts
 */

'use client';

import { useState, useEffect } from 'react';
import { Cliente, ClienteFormData } from '@/types/cliente';
import * as clienteService from '@/services/clienteService';

interface ClienteFormProps {
  clienteEditar?: Cliente | null;
  onSuccess: (cliente: Cliente) => void;
  onCancel: () => void;
}

// Valores iniciales vacíos del formulario
const FORM_INICIAL: ClienteFormData = {
  nombre: '',
  apellido: '',
  dni: '',
  fechaNacimiento: '',
  email: '',
};

export default function ClienteForm({ clienteEditar, onSuccess, onCancel }: ClienteFormProps) {
  // Estado del formulario
  const [form, setForm] = useState<ClienteFormData>(FORM_INICIAL);
  // Estado de errores de validación por campo
  const [errores, setErrores] = useState<Partial<Record<keyof ClienteFormData, string>>>({});
  // Error general (ej: DNI duplicado devuelto por la API)
  const [errorGeneral, setErrorGeneral] = useState<string>('');
  // Estado de carga para deshabilitar el botón durante el submit
  const [cargando, setCargando] = useState(false);

  // Si se pasa un cliente para editar, llenar el form con sus datos
  useEffect(() => {
    if (clienteEditar) {
      setForm({
        nombre: clienteEditar.nombre,
        apellido: clienteEditar.apellido,
        dni: clienteEditar.dni,
        fechaNacimiento: clienteEditar.fechaNacimiento,
        email: clienteEditar.email,
      });
    } else {
      // Si no hay cliente a editar, resetear el form
      setForm(FORM_INICIAL);
    }
    setErrores({});
    setErrorGeneral('');
  }, [clienteEditar]);

  // Actualizar el campo correspondiente cuando el usuario escribe
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Limpiar el error del campo al modificarlo
    if (errores[name as keyof ClienteFormData]) {
      setErrores((prev) => ({ ...prev, [name]: '' }));
    }
    setErrorGeneral('');
  };

  // Validaciones del frontend
  const validar = (): boolean => {
    const nuevosErrores: Partial<Record<keyof ClienteFormData, string>> = {};

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (!form.apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es obligatorio';
    }

    if (!form.dni.trim()) {
      nuevosErrores.dni = 'El DNI es obligatorio';
    } else if (!/^\d{7,8}$/.test(form.dni.trim())) {
      nuevosErrores.dni = 'El DNI debe tener 7 u 8 dígitos numéricos';
    }

    if (!form.fechaNacimiento) {
      nuevosErrores.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
    } else {
      const fecha = new Date(form.fechaNacimiento);
      if (isNaN(fecha.getTime())) {
        nuevosErrores.fechaNacimiento = 'La fecha no es válida';
      } else if (fecha > new Date()) {
        nuevosErrores.fechaNacimiento = 'La fecha no puede ser futura';
      }
    }

    if (!form.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nuevosErrores.email = 'El email no tiene un formato válido';
    }

    setErrores(nuevosErrores);
    // Retorna true si no hay errores
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorGeneral('');

    // Validar antes de enviar
    if (!validar()) return;

    setCargando(true);
    try {
      let resultado: Cliente;
      if (clienteEditar) {
        // Modo edición: PUT
        resultado = await clienteService.updateCliente(clienteEditar.id, form);
      } else {
        // Modo creación: POST
        resultado = await clienteService.createCliente(form);
      }
      // Notificar al padre que la operación fue exitosa
      onSuccess(resultado);
    } catch (error) {
      // Mostrar el mensaje de error de la API al usuario
      setErrorGeneral(error instanceof Error ? error.message : 'Error inesperado');
    } finally {
      setCargando(false);
    }
  };

  const esEdicion = Boolean(clienteEditar);

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Mensaje de error general */}
      {errorGeneral && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errorGeneral}
        </div>
      )}

      {/* Nombre y Apellido en la misma fila */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errores.nombre ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="Juan"
          />
          {errores.nombre && <p className="mt-1 text-xs text-red-500">{errores.nombre}</p>}
        </div>

        <div>
          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
            Apellido <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errores.apellido ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="Pérez"
          />
          {errores.apellido && <p className="mt-1 text-xs text-red-500">{errores.apellido}</p>}
        </div>
      </div>

      {/* DNI */}
      <div>
        <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
          DNI <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="dni"
          name="dni"
          value={form.dni}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errores.dni ? 'border-red-400' : 'border-gray-300'
          }`}
          placeholder="12345678"
          maxLength={8}
        />
        {errores.dni && <p className="mt-1 text-xs text-red-500">{errores.dni}</p>}
      </div>

      {/* Fecha de nacimiento */}
      <div>
        <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 mb-1">
          Fecha de Nacimiento <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="fechaNacimiento"
          name="fechaNacimiento"
          value={form.fechaNacimiento}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]} // Evitar fechas futuras en el picker
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errores.fechaNacimiento ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errores.fechaNacimiento && <p className="mt-1 text-xs text-red-500">{errores.fechaNacimiento}</p>}
        <p className="mt-1 text-xs text-gray-500">La edad se calculará automáticamente</p>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errores.email ? 'border-red-400' : 'border-gray-300'
          }`}
          placeholder="juan@email.com"
        />
        {errores.email && <p className="mt-1 text-xs text-red-500">{errores.email}</p>}
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          disabled={cargando}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={cargando}
        >
          {cargando ? 'Guardando...' : esEdicion ? 'Actualizar' : 'Crear Cliente'}
        </button>
      </div>
    </form>
  );
}
