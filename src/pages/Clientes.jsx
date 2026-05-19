import { useEffect, useState } from 'react'

import ClienteForm from '@components/clientes/ClienteForm'
import ClientesLista from '@components/clientes/ClientesLista'

import {
  obtenerClientes,
  eliminarCliente,
} from '@services/clientesService'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [clienteEditar, setClienteEditar] = useState(null)
  const [cargando, setCargando] = useState(true)

  const cargarClientes = async () => {
    try {
      setCargando(true)

      const datos = await obtenerClientes()
      setClientes(datos)
    } catch (error) {
      console.error('Error al cargar clientes:', error)
    } finally {
      setCargando(false)
    }
  }

  const manejarEliminar = async (id) => {
    const confirmar = confirm(
      '¿Deseas eliminar este cliente?'
    )

    if (!confirmar) return

    await eliminarCliente(id)
    cargarClientes()
  }

  useEffect(() => {
    cargarClientes()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Clientes
        </h1>

        <p className="text-slate-500 mt-1">
          Gestión y registro de clientes
        </p>
      </div>

      <ClienteForm
        onClienteCreado={cargarClientes}
        clienteEditar={clienteEditar}
        cancelarEdicion={() => setClienteEditar(null)}
      />

      {cargando ? (
        <div className="bg-white rounded-xl shadow p-6 text-slate-500">
          Cargando clientes...
        </div>
      ) : (
        <ClientesLista
          clientes={clientes}
          onEditar={setClienteEditar}
          onEliminar={manejarEliminar}
        />
      )}
    </div>
  )
}