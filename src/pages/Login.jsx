import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'

export default function Login() {
  const navigate = useNavigate()

  const { iniciarSesion } = useAuth()

  const [correo, setCorreo] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [error, setError] = useState('')

  const manejarLogin = async (e) => {
    e.preventDefault()

    try {
      setError('')

      await iniciarSesion(correo, contraseña)

      navigate('/dashboard')
    } catch (error) {
      setError('Correo o contraseña incorrectos')
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-slate-800">
          Sistema Farma
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Iniciar sesión en el sistema
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        <form
          className="space-y-5"
          onSubmit={manejarLogin}
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="usuario@correo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Contraseña
            </label>

            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}