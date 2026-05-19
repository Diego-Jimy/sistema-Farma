import { useEffect, useState } from 'react'

import StockBajoCard from '@components/dashboard/StockBajoCard'
import MetricasCard from '@components/dashboard/MetricasCard'
import ResumenVentas from '@components/dashboard/ResumenVentas'
import ClientesResumen from '@components/dashboard/ClientesResumen'
import GraficoVentas from '@components/dashboard/GraficoVentas'
import GraficoStock from '@components/dashboard/GraficoStock'

import { obtenerProductos } from '@services/productosService'
import { obtenerClientes } from '@services/clientesService'
import { obtenerVentas } from '@services/ventasService'

export default function Dashboard() {
  const [productos, setProductos] = useState([])
  const [clientes, setClientes] = useState([])
  const [ventas, setVentas] = useState([])

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      const productosData = await obtenerProductos()
      const clientesData = await obtenerClientes()
      const ventasData = await obtenerVentas()

      setProductos(productosData)
      setClientes(clientesData)
      setVentas(ventasData)
    } catch (error) {
      console.error('Error dashboard:', error)
    }
  }

  const totalVentas = ventas.reduce(
    (suma, venta) => suma + Number(venta.total),
    0
  )

  const productosStockBajo = productos.filter(
    (producto) =>
      Number(producto.stock) <= Number(producto.stockMinimo)
  )

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 rounded-2xl p-8 text-white shadow">
        <h1 className="text-4xl font-bold">
          Panel Administrativo
        </h1>

        <p className="text-blue-100 mt-2">
          Control general de inventario, ventas y clientes del sistema Farma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricasCard titulo="Productos" valor={productos.length} color="text-blue-600" />
        <MetricasCard titulo="Clientes" valor={clientes.length} color="text-green-600" />
        <MetricasCard titulo="Ventas" valor={ventas.length} color="text-purple-600" />
        <MetricasCard titulo="Ingresos" valor={`S/ ${totalVentas.toFixed(2)}`} color="text-orange-600" />
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Estado general del sistema
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-600 font-medium">
              Productos activos
            </p>
            <p className="text-2xl font-bold text-blue-700">
              {productos.length}
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-sm text-red-600 font-medium">
              Stock bajo
            </p>
            <p className="text-2xl font-bold text-red-700">
              {productosStockBajo.length}
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-green-600 font-medium">
              Ventas registradas
            </p>
            <p className="text-2xl font-bold text-green-700">
              {ventas.length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <GraficoVentas ventas={ventas} />
        <GraficoStock productos={productos} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <StockBajoCard productos={productos} />
        <ResumenVentas ventas={ventas} />
      </div>

      <ClientesResumen clientes={clientes} />
    </div>
  )
}