export default function VentaDetalle({ venta, onCerrar }) {
  if (!venta) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">
              Detalle de venta
            </h3>

            <p className="text-slate-500 mt-1">
              Cliente: {venta.cliente}
            </p>
          </div>

          <button
            onClick={onCerrar}
            className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300"
          >
            Cerrar
          </button>
        </div>

        <div className="mb-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-100 rounded-lg p-4">
            <p className="text-sm text-slate-500">Estado</p>
            <p className="font-semibold text-slate-800">
              {venta.estado}
            </p>
          </div>

          <div className="bg-slate-100 rounded-lg p-4">
            <p className="text-sm text-slate-500">Fecha</p>
            <p className="font-semibold text-slate-800">
              {venta.fechaVenta?.toDate
                ? venta.fechaVenta.toDate().toLocaleDateString('es-PE')
                : 'Sin fecha'}
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600">Total</p>
            <p className="font-bold text-blue-700 text-xl">
              S/ {Number(venta.total).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">Producto</th>
                <th className="px-4 py-3 text-left">Código</th>
                <th className="px-4 py-3 text-left">Cantidad</th>
                <th className="px-4 py-3 text-left">Precio</th>
                <th className="px-4 py-3 text-left">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {venta.productos?.map((producto) => (
                <tr
                  key={producto.id}
                  className="border-t border-slate-100"
                >
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {producto.nombre}
                  </td>
                  <td className="px-4 py-3">
                    {producto.codigo}
                  </td>
                  <td className="px-4 py-3">
                    {producto.cantidad}
                  </td>
                  <td className="px-4 py-3">
                    S/ {Number(producto.precioVenta).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    S/ {Number(producto.subtotal).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}