export default function MetricasCard({
  titulo,
  valor,
  color,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex flex-col gap-2">
        <p className="text-slate-500 text-sm font-medium">
          {titulo}
        </p>

        <h3 className={`text-4xl font-bold ${color}`}>
          {valor}
        </h3>
      </div>
    </div>
  )
}