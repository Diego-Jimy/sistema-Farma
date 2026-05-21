import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@context/AuthContext'

export default function Login() {
  const navigate = useNavigate()

  const {
    iniciarSesion,
    registrarUsuario,
  } = useAuth()

  const [modoRegistro, setModoRegistro] = useState(false)

  const [correo, setCorreo] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [confirmarContraseña, setConfirmarContraseña] = useState('')

  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const manejarEnvio = async (e) => {
    e.preventDefault()

    try {
      setError('')
      setCargando(true)

      if (modoRegistro) {
        if (contraseña.length < 6) {
          setError('La contraseña debe tener mínimo 6 caracteres')
          return
        }

        if (contraseña !== confirmarContraseña) {
          setError('Las contraseñas no coinciden')
          return
        }

        await registrarUsuario(correo, contraseña)
      } else {
        await iniciarSesion(correo, contraseña)
      }

      navigate('/dashboard')
    } catch (error) {
      console.error(error)

      if (error.code === 'auth/email-already-in-use') {
        setError('El correo ya está registrado')
      } else if (error.code === 'auth/invalid-credential') {
        setError('Correo o contraseña incorrectos')
      } else {
        setError('Ocurrió un error en la autenticación')
      }
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Sistema Farma
          </h1>

          <p className="text-slate-500 mt-2">
            {modoRegistro
              ? 'Crear nuevo usuario'
              : 'Iniciar sesión en el sistema'}
          </p>
        </div>

        {!modoRegistro && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-bold text-blue-700 mb-2">
              Usuario de prueba
            </h3>

            <p className="text-sm text-slate-700">
              <span className="font-semibold">Correo:</span>
              <br />
              admin@sistemafarma.com
            </p>

            <p className="text-sm text-slate-700 mt-2">
              <span className="font-semibold">Contraseña:</span>
              <br />
              Admin123456
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        <form
          onSubmit={manejarEnvio}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="usuario@correo.com"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="Ingrese su contraseña"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {modoRegistro && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirmar contraseña
              </label>

              <input
                type="password"
                value={confirmarContraseña}
                onChange={(e) => setConfirmarContraseña(e.target.value)}
                placeholder="Repita la contraseña"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {cargando
              ? 'Procesando...'
              : modoRegistro
                ? 'Crear usuario'
                : 'Ingresar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setModoRegistro(!modoRegistro)
              setError('')
              setConfirmarContraseña('')
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {modoRegistro
              ? '¿Ya tienes cuenta? Inicia sesión'
              : '¿No tienes cuenta? Crear usuario'}
          </button>
        </div>
      </div>
    </div>
  )
}