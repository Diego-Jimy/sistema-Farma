import { useEffect, useState } from 'react'
import { crearProducto, actualizarProducto } from '@services/productosService'

const estadoInicial = {
  nombre: '',
  categoria: '',
  codigo: '',
  precioCompra: '',
  precioVenta: '',
  stock: '',
  stockMinimo: '',
  fechaVencimiento: '',
}

export default function ProductoForm({
  onProductoCreado,
  productoEditar,
  cancelarEdicion,
}) {
  const [formulario, setFormulario] = useState(estadoInicial)
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    if (productoEditar) {
      setFormulario(productoEditar)
    }
  }, [productoEditar])

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setFormulario({ ...formulario, [name]: value })
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()

    try {
      setCargando(true)
      setMensaje('')

      if (productoEditar) {
        await actualizarProducto(productoEditar.id, formulario)
        setMensaje('Producto actualizado correctamente')
        cancelarEdicion()
      } else {
        await crearProducto(formulario)
        setMensaje('Producto registrado correctamente')
      }

      setFormulario(estadoInicial)
      onProductoCreado()
    } catch (error) {
      console.error('Error completo:', error)
      setMensaje(error.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-5">
        {productoEditar ? 'Editar producto' : 'Registrar producto'}
      </h3>

      {mensaje && (
        <div className="mb-5 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg">
          {mensaje}
        </div>
      )}

      <form onSubmit={manejarEnvio} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          ['nombre', 'Nombre del producto', 'text'],
          ['categoria', 'Categoría', 'text'],
          ['codigo', 'Código', 'text'],
          ['fechaVencimiento', 'Fecha de vencimiento', 'date'],
          ['precioCompra', 'Precio de compra', 'number'],
          ['precioVenta', 'Precio de venta', 'number'],
          ['stock', 'Stock actual', 'number'],
          ['stockMinimo', 'Stock mínimo', 'number'],
        ].map(([name, label, type]) => (
          <div key={name}>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {label}
            </label>

            <input
              type={type}
              name={name}
              value={formulario[name]}
              onChange={manejarCambio}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        <div className="md:col-span-2 flex justify-end gap-3">
          {productoEditar && (
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
              : productoEditar
                ? 'Actualizar producto'
                : 'Registrar producto'}
          </button>
        </div>
      </form>
    </div>
  )
}