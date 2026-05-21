import { Routes, Route, Navigate } from 'react-router-dom'

import Login from '@pages/Login'
import Dashboard from '@pages/Dashboard'
import Inventario from '@pages/Inventario'
import Ventas from '@pages/Ventas'
import Clientes from '@pages/Clientes'
import Reportes from '@pages/Reportes'

import ProtectedRoute from '@router/ProtectedRoute'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/inventario" element={<Inventario />} />

        <Route path="/ventas" element={<Ventas />} />

        <Route path="/clientes" element={<Clientes />} />

        <Route path="/reportes" element={<Reportes />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  )
}