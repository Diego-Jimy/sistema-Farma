export default function ClientesLista({
  clientes,
  onEditar,
  onEliminar,
}) {
  if (clientes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-slate-500">
        No hay clientes registrados.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-800">
          Lista de clientes
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">DNI</th>
              <th className="px-4 py-3 text-left">Teléfono</th>
              <th className="px-4 py-3 text-left">Correo</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <tr
                key={cliente.id}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="px-4 py-3 font-medium text-slate-800">
                  {cliente.nombre}
                </td>

                <td className="px-4 py-3">
                  {cliente.dni}
                </td>

                <td className="px-4 py-3">
                  {cliente.telefono}
                </td>

                <td className="px-4 py-3">
                  {cliente.correo}
                </td>

                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => onEditar(cliente)}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg hover:bg-yellow-200"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => onEliminar(cliente.id)}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200"
                  >
                    Eliminar
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