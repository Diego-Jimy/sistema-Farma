import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@components/Sidebar'
import { FaBars } from 'react-icons/fa'

export default function MainLayout() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <button
        type="button"
        onClick={() => setSidebarAbierto(true)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-slate-900 text-white p-3 rounded-lg shadow"
      >
        <FaBars />
      </button>

      <Sidebar
        abierto={sidebarAbierto}
        cerrarSidebar={() => setSidebarAbierto(false)}
      />

      <main className="flex-1 p-4 pt-20 lg:p-6 lg:pt-6">
        <Outlet />
      </main>
    </div>
  )
}