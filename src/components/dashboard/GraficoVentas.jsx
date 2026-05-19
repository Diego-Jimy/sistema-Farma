import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function GraficoVentas({ ventas }) {
  const datos = ventas.slice(0, 6).map((venta, index) => ({
    nombre: `Venta ${index + 1}`,
    total: Number(venta.total),
  }))

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-5">
        Resumen gráfico de ventas
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={datos}>
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#2563eb" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}