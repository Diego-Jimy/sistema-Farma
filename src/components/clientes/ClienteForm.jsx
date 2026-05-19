import { useEffect, useState } from 'react'

import {
  crearCliente,
  actualizarCliente,
} from '@services/clientesService'

const estadoInicial = {
  nombre: '',
  dni: '',
  telefono: '',
  correo: '',
  direccion: '',
}

export default function ClienteForm({
  onClienteCreado,
  clienteEditar,
  cancelarEdicion,
}) {
  const [formulario, setFormulario] = useState(estadoInicial)
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (clienteEditar) {
      setFormulario(clienteEditar)
    }
  }, [clienteEditar])

  const manejarCambio = (e) => {
    const { name, value } = e.target

    setFormulario({
      ...formulario,
      [name]: value,
    })
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()

    try {
      setCargando(true)
      setMensaje('')

      if (clienteEditar) {
        await actualizarCliente(clienteEditar.id, formulario)
        setMensaje('Cliente actualizado correctamente')

        cancelarEdicion()
      } else {
        await crearCliente(formulario)
        setMensaje('Cliente registrado correctamente')
      }

      setFormulario(estadoInicial)

      if (onClienteCreado) {
        onClienteCreado()
      }
    } catch (error) {
      console.error(error)
      setMensaje('Error al guardar cliente')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-5">
        {clienteEditar ? 'Editar cliente' : 'Registrar cliente'}
      </h3>

      {mensaje && (
        <div className="mb-5 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg">
          {mensaje}
        </div>
      )}

      <form
        onSubmit={manejarEnvio}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nombre completo
          </label>

          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            DNI
          </label>

          <input
            type="text"
            name="dni"
            value={formulario.dni}
            onChange={manejarCambio}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Teléfono
          </label>

          <input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={manejarCambio}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Correo
          </label>

          <input
            type="email"
            name="correo"
            value={formulario.correo}
            onChange={manejarCambio}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Dirección
          </label>

          <input
            type="text"
            name="direccion"
            value={formulario.direccion}
            onChange={manejarCambio}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3">
          {clienteEditar && (
            <button
              type="button"
              onClick={cancelarEdicion}
              className="bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-300 transition"
            >
              Cancelar
            </button>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {cargando
              ? 'Guardando...'
              : clienteEditar
                ? 'Actualizar cliente'
                : 'Registrar cliente'}
          </button>
        </div>
      </form>
    </div>
  )
}