import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import MainLayout from '@layouts/MainLayout'

export default function ProtectedRoute() {
  const { usuario, cargando } = useAuth()

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600 font-medium">
          Verificando acceso...
        </p>
      </div>
    )
  }

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}