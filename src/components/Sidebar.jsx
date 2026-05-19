import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'

import {
  FaChartLine,
  FaBoxes,
  FaCashRegister,
  FaUsers,
  FaSignOutAlt,
  FaTimes,
} from 'react-icons/fa'

const menu = [
  { nombre: 'Dashboard', ruta: '/dashboard', icono: FaChartLine },
  { nombre: 'Inventario', ruta: '/inventario', icono: FaBoxes },
  { nombre: 'Ventas', ruta: '/ventas', icono: FaCashRegister },
  { nombre: 'Clientes', ruta: '/clientes', icono: FaUsers },
]

export default function Sidebar({
  abierto = false,
  cerrarSidebar,
}) {
  const navigate = useNavigate()
  const { cerrarSesion } = useAuth()

  const manejarCerrarSesion = async () => {
    try {
      await cerrarSesion()
      navigate('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <>
      {abierto && (
        <div
          onClick={cerrarSidebar}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static z-50 top-0 left-0 w-64 min-h-screen bg-slate-900 text-white p-5 flex flex-col transform transition-transform duration-300 ${
          abierto ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Sistema Farma
              </h1>

              <p className="text-sm text-slate-400">
                Inventario y ventas
              </p>
            </div>

            <button
              type="button"
              onClick={cerrarSidebar}
              className="lg:hidden text-slate-300 hover:text-white"
            >
              <FaTimes />
            </button>
          </div>

          <nav className="space-y-2">
            {menu.map((item) => {
              const Icono = item.icono

              return (
                <NavLink
                  key={item.ruta}
                  to={item.ruta}
                  onClick={cerrarSidebar}
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
        </div>

        <button
          onClick={manejarCerrarSesion}
          className="mt-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition px-4 py-3 rounded-lg font-semibold"
        >
          <FaSignOutAlt />
          Cerrar sesión
        </button>
      </aside>
    </>
  )
}