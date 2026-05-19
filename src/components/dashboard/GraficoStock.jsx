import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function GraficoStock({ productos }) {
  const stockBajo = productos.filter(
    (producto) => Number(producto.stock) <= Number(producto.stockMinimo)
  ).length

  const stockNormal = productos.length - stockBajo

  const datos = [
    { nombre: 'Stock normal', valor: stockNormal },
    { nombre: 'Stock bajo', valor: stockBajo },
  ]

  const colores = ['#16a34a', '#dc2626']

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-5">
        Estado del inventario
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={datos}
              dataKey="valor"
              nameKey="nombre"
              outerRadius={95}
              label
            >
              {datos.map((item, index) => (
                <Cell key={item.nombre} fill={colores[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}