export default function ResumenVentas({ ventas }) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-800">
          Últimas ventas
        </h3>
      </div>

      {ventas.length === 0 ? (
        <div className="p-6 text-slate-500">
          No existen ventas registradas.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  Cliente
                </th>

                <th className="px-4 py-3 text-left">
                  Productos
                </th>

                <th className="px-4 py-3 text-left">
                  Total
                </th>

                <th className="px-4 py-3 text-left">
                  Estado
                </th>
              </tr>
            </thead>

            <tbody>
              {ventas.slice(0, 5).map((venta) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}