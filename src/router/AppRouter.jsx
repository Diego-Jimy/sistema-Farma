import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@layouts/MainLayout'

import Login from '@pages/Login'
import Dashboard from '@pages/Dashboard'
import Inventario from '@pages/Inventario'
import Ventas from '@pages/Ventas'
import Clientes from '@pages/Clientes'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/clientes" element={<Clientes />} />
      </Route>
    </Routes>
  )
}