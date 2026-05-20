import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { obtenerVentas } from '@services/ventasService'

export default function Reportes() {
  const [ventas, setVentas] = useState([])
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  useEffect(() => {
    cargarVentas()
  }, [])

  const cargarVentas = async () => {
    const datos = await obtenerVentas()
    setVentas(datos)
  }

  const ventasFiltradas = ventas.filter((venta) => {
    if (!venta.fechaVenta?.toDate) return false

    const fechaVenta = venta.fechaVenta.toDate()
    const inicio = fechaInicio ? new Date(fechaInicio) : null
    const fin = fechaFin ? new Date(fechaFin) : null

    if (inicio && fechaVenta < inicio) return false
    if (fin && fechaVenta > fin) return false

    return true
  })

  const totalFiltrado = ventasFiltradas.reduce(
    (suma, venta) => suma + Number(venta.total),
    0
  )

  const promedioVenta =
    ventasFiltradas.length > 0
      ? totalFiltrado / ventasFiltradas.length
      : 0

  const productosVendidos = ventasFiltradas.reduce(
    (total, venta) =>
      total +
      venta.productos.reduce(
        (suma, producto) => suma + Number(producto.cantidad),
        0
      ),
    0
  )

  const exportarExcel = () => {
    const datos = ventasFiltradas.map((venta) => ({
      Cliente: venta.cliente,
      Productos: venta.productos?.length || 0,
      Total: Number(venta.total),
      Estado: venta.estado,
      Fecha: venta.fechaVenta?.toDate
        ? venta.fechaVenta.toDate().toLocaleDateString('es-PE')
        : 'Sin fecha',
    }))

    const hoja = XLSX.utils.json_to_sheet(datos)
    const libro = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(libro, hoja, 'Reporte Ventas')
    XLSX.writeFile(libro, 'reporte_ventas.xlsx')
  }

  const exportarPDF = () => {
    const documento = new jsPDF()

    documento.setFontSize(18)
    documento.text('Reporte de ventas', 14, 20)

    documento.setFontSize(11)
    documento.text(`Ventas encontradas: ${ventasFiltradas.length}`, 14, 30)
    documento.text(`Total vendido: S/ ${totalFiltrado.toFixed(2)}`, 14, 38)
    documento.text(`Promedio por venta: S/ ${promedioVenta.toFixed(2)}`, 14, 46)
    documento.text(`Productos vendidos: ${productosVendidos}`, 14, 54)

    autoTable(documento, {
      startY: 65,
      head: [['Cliente', 'Productos', 'Total', 'Estado', 'Fecha']],
      body: ventasFiltradas.map((venta) => [
        venta.cliente,
        venta.productos?.length || 0,
        `S/ ${Number(venta.total).toFixed(2)}`,
        venta.estado,
        venta.fechaVenta?.toDate
          ? venta.fechaVenta.toDate().toLocaleDateString('es-PE')
          : 'Sin fecha',
      ]),
    })

    documento.save('reporte_ventas.pdf')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Reportes
        </h1>

        <p className="text-slate-500 mt-1">
          Análisis de ventas filtradas por fecha
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-5">
          Filtro de ventas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fecha inicio
            </label>

            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fecha fin
            </label>

            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setFechaInicio('')
                setFechaFin('')
              }}
              className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-900 transition"
            >
              Limpiar filtro
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={exportarExcel}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Exportar Excel
        </button>

        <button
          type="button"
          onClick={exportarPDF}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Exportar PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-slate-500 text-sm font-medium">
            Ventas encontradas
          </p>

          <h3 className="text-4xl font-bold text-blue-600 mt-2">
            {ventasFiltradas.length}
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-slate-500 text-sm font-medium">
            Total vendido
          </p>

          <h3 className="text-4xl font-bold text-green-600 mt-2">
            S/ {totalFiltrado.toFixed(2)}
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-slate-500 text-sm font-medium">
            Promedio por venta
          </p>

          <h3 className="text-4xl font-bold text-purple-600 mt-2">
            S/ {promedioVenta.toFixed(2)}
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-slate-500 text-sm font-medium">
            Productos vendidos
          </p>

          <h3 className="text-4xl font-bold text-orange-600 mt-2">
            {productosVendidos}
          </h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            Resultados del reporte
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">Cliente</th>
                <th className="px-4 py-3 text-left">Productos</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Estado</th>
                <th className="px-4 py-3 text-left">Fecha</th>
              </tr>
            </thead>

            <tbody>
              {ventasFiltradas.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-slate-500"
                  >
                    No hay ventas en el rango seleccionado.
                  </td>
                </tr>
              ) : (
                ventasFiltradas.map((venta) => (
                  <tr
                    key={venta.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {venta.cliente}
                    </td>

                    <td className="px-4 py-3">
                      {venta.productos?.length || 0} producto(s)
                    </td>

                    <td className="px-4 py-3 font-semibold text-blue-600">
                      S/ {Number(venta.total).toFixed(2)}
                    </td>

                    <td className="px-4 py-3">
                      {venta.estado}
                    </td>

                    <td className="px-4 py-3 text-slate-500">
                      {venta.fechaVenta?.toDate
                        ? venta.fechaVenta.toDate().toLocaleDateString('es-PE')
                        : 'Sin fecha'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}