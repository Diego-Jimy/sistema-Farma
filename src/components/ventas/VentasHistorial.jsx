export default function VentasHistorial({ ventas, onVerDetalle }) {
  if (ventas.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-slate-500">
        No hay ventas registradas.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-800">
          Historial de ventas
        </h3>
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
              <th className="px-4 py-3 text-left">Acción</th>
            </tr>
          </thead>

          <tbody>
            {ventas.map((venta) => (
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
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    {venta.estado}
                  </span>
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {venta.fechaVenta?.toDate
                    ? venta.fechaVenta.toDate().toLocaleDateString('es-PE')
                    : 'Sin fecha'}
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => onVerDetalle(venta)}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}