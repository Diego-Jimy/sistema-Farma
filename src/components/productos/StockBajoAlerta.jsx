export default function StockBajoAlerta({ productos }) {
  const productosStockBajo = productos.filter(
    (producto) => Number(producto.stock) <= Number(producto.stockMinimo)
  )

  if (productosStockBajo.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4">
        No existen productos con stock bajo.
      </div>
    )
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-5">
      <h3 className="text-lg font-bold text-red-700 mb-3">
        Alerta de stock bajo
      </h3>

      <p className="text-red-600 mb-4">
        Existen {productosStockBajo.length} productos que requieren reposición.
      </p>

      <div className="space-y-2">
        {productosStockBajo.map((producto) => (
          <div
            key={producto.id}
            className="bg-white border border-red-100 rounded-lg px-4 py-3 flex justify-between"
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
              <p className="text-sm text-red-600 font-semibold">
                Stock: {producto.stock}
              </p>
              <p className="text-sm text-slate-500">
                Mínimo: {producto.stockMinimo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}