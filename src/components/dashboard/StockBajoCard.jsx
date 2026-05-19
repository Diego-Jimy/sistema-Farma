export default function StockBajoCard({ productos }) {
  const productosStockBajo = productos.filter(
    (producto) =>
      Number(producto.stock) <=
      Number(producto.stockMinimo)
  )

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-800">
          Productos con stock bajo
        </h3>
      </div>

      {productosStockBajo.length === 0 ? (
        <div className="p-6 text-green-600">
          No existen productos críticos.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {productosStockBajo.map((producto) => (
            <div
              key={producto.id}
              className="p-5 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-slate-800">
                  {producto.nombre}
                </p>

                <p className="text-sm text-slate-500">
                  Código: {producto.codigo}
                </p>
              </div>

              <div className="text-right">
                <p className="text-red-600 font-bold">
                  Stock: {producto.stock}
                </p>

                <p className="text-sm text-slate-500">
                  Mínimo: {producto.stockMinimo}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}