export default function ClientesResumen({ clientes }) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-800">
          Clientes registrados
        </h3>
      </div>

      {clientes.length === 0 ? (
        <div className="p-6 text-slate-500">
          No existen clientes registrados.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {clientes.slice(0, 5).map((cliente) => (
            <div
              key={cliente.id}
              className="p-5 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-slate-800">
                  {cliente.nombre}
                </p>

                <p className="text-sm text-slate-500">
                  DNI: {cliente.dni}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-slate-600">
                  {cliente.telefono}
                </p>

                <p className="text-sm text-blue-600">
                  {cliente.correo}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}