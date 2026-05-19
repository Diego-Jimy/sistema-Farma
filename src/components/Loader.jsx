export default function Loader({ mensaje = 'Cargando datos...' }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-3 text-slate-600">
      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />

      <span className="font-medium">
        {mensaje}
      </span>
    </div>
  )
}