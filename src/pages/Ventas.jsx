import { useEffect, useState } from 'react'

import VentaForm from '@components/ventas/VentaForm'
import VentasHistorial from '@components/ventas/VentasHistorial'
import VentaDetalle from '@components/ventas/VentaDetalle'
import { obtenerVentas } from '@services/ventasService'

export default function Ventas() {
  const [ventas, setVentas] = useState([])
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null)
  const [cargando, setCargando] = useState(true)

  const cargarVentas = async () => {
    try {
      setCargando(true)
      const datos = await obtenerVentas()
      setVentas(datos)
    } catch (error) {
      console.error('Error al cargar ventas:', error)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarVentas()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Ventas
        </h1>

        <p className="text-slate-500 mt-1">
          Registro de ventas y actualización automática de stock
        </p>
      </div>

      <VentaForm onVentaRegistrada={cargarVentas} />

      {cargando ? (
        <div className="bg-white rounded-xl shadow p-6 text-slate-500">
          Cargando ventas...
        </div>
      ) : (
        <VentasHistorial
          ventas={ventas}
          onVerDetalle={setVentaSeleccionada}
        />
      )}

      <VentaDetalle
        venta={ventaSeleccionada}
        onCerrar={() => setVentaSeleccionada(null)}
      />
    </div>
  )
}