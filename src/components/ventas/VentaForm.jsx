import { useEffect, useState } from 'react'
import { obtenerProductos } from '@services/productosService'
import { registrarVenta } from '@services/ventasService'

export default function VentaForm({ onVentaRegistrada }) {
  const [cliente, setCliente] = useState('')
  const [productos, setProductos] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState('')
  const [cantidad, setCantidad] = useState(1)
  const [detalleVenta, setDetalleVenta] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    const datos = await obtenerProductos()
    setProductos(datos)
  }

  const agregarProducto = () => {
    const producto = productos.find((item) => item.id === productoSeleccionado)

    if (!producto) {
      setMensaje('Seleccione un producto')
      return
    }

    if (Number(cantidad) <= 0) {
      setMensaje('Ingrese una cantidad válida')
      return
    }

    if (Number(cantidad) > Number(producto.stock)) {
      setMensaje('La cantidad supera el stock disponible')
      return
    }

    const productoExistente = detalleVenta.find((item) => item.id === producto.id)

    if (productoExistente) {
      setMensaje('El producto ya fue agregado')
      return
    }

    const subtotal = Number(producto.precioVenta) * Number(cantidad)

    setDetalleVenta([
      ...detalleVenta,
      {
        id: producto.id,
        nombre: producto.nombre,
        codigo: producto.codigo,
        precioVenta: Number(producto.precioVenta),
        cantidad: Number(cantidad),
        stockActual: Number(producto.stock),
        subtotal,
      },
    ])

    setProductoSeleccionado('')
    setCantidad(1)
    setMensaje('')
  }

  const eliminarProducto = (id) => {
    setDetalleVenta(detalleVenta.filter((item) => item.id !== id))
  }

  const total = detalleVenta.reduce((suma, item) => suma + item.subtotal, 0)

  const manejarVenta = async (e) => {
    e.preventDefault()

    if (!cliente.trim()) {
      setMensaje('Ingrese el nombre del cliente')
      return
    }

    if (detalleVenta.length === 0) {
      setMensaje('Agregue al menos un producto')
      return
    }

    try {
      setCargando(true)
      setMensaje('')

      await registrarVenta({
        cliente,
        productos: detalleVenta,
        total,
      })

      setCliente('')
      setDetalleVenta([])
      setMensaje('Venta registrada correctamente')

      cargarProductos()

      if (onVentaRegistrada) {
        onVentaRegistrada()
      }
    } catch (error) {
      console.error('Error al registrar venta:', error)
      setMensaje('Error al registrar la venta')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-5">
        Registrar venta
      </h3>

      {mensaje && (
        <div className="mb-5 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg">
          {mensaje}
        </div>
      )}

      <form onSubmit={manejarVenta} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Cliente
          </label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del cliente"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Producto
            </label>
            <select
              value={productoSeleccionado}
              onChange={(e) => setProductoSeleccionado(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione un producto</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre} - Stock: {producto.stock} - S/ {producto.precioVenta}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cantidad
            </label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              min="1"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={agregarProducto}
          className="bg-slate-800 text-white px-5 py-3 rounded-lg font-semibold hover:bg-slate-900 transition"
        >
          Agregar producto
        </button>

        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">Producto</th>
                <th className="px-4 py-3 text-left">Cantidad</th>
                <th className="px-4 py-3 text-left">Precio</th>
                <th className="px-4 py-3 text-left">Subtotal</th>
                <th className="px-4 py-3 text-left">Acción</th>
              </tr>
            </thead>

            <tbody>
              {detalleVenta.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-5 text-center text-slate-500">
                    No hay productos agregados.
                  </td>
                </tr>
              ) : (
                detalleVenta.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">{item.nombre}</td>
                    <td className="px-4 py-3">{item.cantidad}</td>
                    <td className="px-4 py-3">S/ {item.precioVenta.toFixed(2)}</td>
                    <td className="px-4 py-3">S/ {item.subtotal.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => eliminarProducto(item.id)}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200"
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center bg-slate-100 rounded-lg p-4">
          <span className="text-lg font-bold text-slate-700">
            Total
          </span>

          <span className="text-2xl font-bold text-blue-600">
            S/ {total.toFixed(2)}
          </span>
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
        >
          {cargando ? 'Registrando venta...' : 'Registrar venta'}
        </button>
      </form>
    </div>
  )
}