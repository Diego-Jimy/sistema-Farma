import { NavLink } from 'react-router-dom'

import {
  FaChartLine,
  FaBoxes,
  FaCashRegister,
  FaUsers,
} from 'react-icons/fa'

const menu = [
  {
    nombre: 'Dashboard',
    ruta: '/dashboard',
    icono: FaChartLine,
  },
  {
    nombre: 'Inventario',
    ruta: '/inventario',
    icono: FaBoxes,
  },
  {
    nombre: 'Ventas',
    ruta: '/ventas',
    icono: FaCashRegister,
  },
  {
    nombre: 'Clientes',
    ruta: '/clientes',
    icono: FaUsers,
  },
]

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Sistema Farma
        </h1>

        <p className="text-sm text-slate-400">
          Inventario y ventas
        </p>
      </div>

      <nav className="space-y-2">
        {menu.map((item) => {
          const Icono = item.icono

          return (
            <NavLink
              key={item.ruta}
              to={item.ruta}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icono size={18} />
              <span>{item.nombre}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}