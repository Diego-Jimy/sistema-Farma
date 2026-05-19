import { useEffect, useState } from 'react'

import ProductoForm from '@components/productos/ProductoForm'
import ProductosTabla from '@components/productos/ProductosTabla'
import StockBajoAlerta from '@components/productos/StockBajoAlerta'
import { eliminarProducto, obtenerProductos } from '@services/productosService'

export default function Inventario() {
  const [productos, setProductos] = useState([])
  const [productoEditar, setProductoEditar] = useState(null)
  const [cargando, setCargando] = useState(true)

  const cargarProductos = async () => {
    try {
      setCargando(true)
      const datos = await obtenerProductos()
      setProductos(datos)
    } catch (error) {
      console.error('Error al cargar productos:', error)
    } finally {
      setCargando(false)
    }
  }

  const manejarEliminar = async (id) => {
    const confirmar = confirm('¿Deseas eliminar este producto?')

    if (!confirmar) return

    await eliminarProducto(id)
    cargarProductos()
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Inventario
        </h1>

        <p className="text-slate-500 mt-1">
          Gestión de productos y control de stock
        </p>
      </div>

      {!cargando && <StockBajoAlerta productos={productos} />}

      <ProductoForm
        onProductoCreado={cargarProductos}
        productoEditar={productoEditar}
        cancelarEdicion={() => setProductoEditar(null)}
      />

      {cargando ? (
        <div className="bg-white rounded-xl shadow p-6 text-slate-500">
          Cargando productos...
        </div>
      ) : (
        <ProductosTabla
          productos={productos}
          onEditar={setProductoEditar}
          onEliminar={manejarEliminar}
        />
      )}
    </div>
  )
}