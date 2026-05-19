import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

import { db } from '@config/firebase'

const clientesRef = collection(db, 'clientes')

export async function crearCliente(cliente) {
  return await addDoc(clientesRef, {
    nombre: cliente.nombre,
    dni: cliente.dni,
    telefono: cliente.telefono,
    correo: cliente.correo,
    direccion: cliente.direccion,
    fechaRegistro: serverTimestamp(),
  })
}

export async function obtenerClientes() {
  const resultado = await getDocs(clientesRef)

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }))
}

export async function actualizarCliente(id, cliente) {
  const clienteRef = doc(db, 'clientes', id)

  await updateDoc(clienteRef, {
    nombre: cliente.nombre,
    dni: cliente.dni,
    telefono: cliente.telefono,
    correo: cliente.correo,
    direccion: cliente.direccion,
  })
}

export async function eliminarCliente(id) {
  const clienteRef = doc(db, 'clientes', id)

  await deleteDoc(clienteRef)
}