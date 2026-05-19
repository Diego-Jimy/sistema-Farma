export default function EmptyState({ mensaje }) {
  return (
    <div className="bg-white rounded-xl shadow p-8 text-center text-slate-500">
      <p className="font-medium">
        {mensaje}
      </p>
    </div>
  )
}