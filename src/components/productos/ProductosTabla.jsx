export default function ProductosTabla({ productos, onEditar, onEliminar }) {
  if (productos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-slate-500">
        No hay productos registrados.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-800">
          Productos registrados
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left">Código</th>
              <th className="px-4 py-3 text-left">Producto</th>
              <th className="px-4 py-3 text-left">Categoría</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">P. venta</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => {
              const stockBajo = producto.stock <= producto.stockMinimo

              return (
                <tr key={producto.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">{producto.codigo}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{producto.nombre}</td>
                  <td className="px-4 py-3">{producto.categoria}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      stockBajo ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {producto.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">S/ {Number(producto.precioVenta).toFixed(2)}</td>
                  <td className="px-4 py-3">{producto.estado}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => onEditar(producto)}
                      className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg hover:bg-yellow-200"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => onEliminar(producto.id)}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}