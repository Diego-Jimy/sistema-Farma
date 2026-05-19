import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
} from 'firebase/firestore'

import { db } from '@config/firebase'

const productosRef = collection(db, 'productos')

export async function crearProducto(producto) {
  return await addDoc(productosRef, {
    ...producto,
    precioCompra: Number(producto.precioCompra),
    precioVenta: Number(producto.precioVenta),
    stock: Number(producto.stock),
    stockMinimo: Number(producto.stockMinimo),
    estado: 'activo',
    fechaCreacion: serverTimestamp(),
  })
}

export async function obtenerProductos() {
  const consulta = query(productosRef, orderBy('fechaCreacion', 'desc'))

  const resultado = await getDocs(consulta)

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }))
}

export async function actualizarProducto(id, producto) {
  const productoRef = doc(db, 'productos', id)

  return await updateDoc(productoRef, {
    ...producto,
    precioCompra: Number(producto.precioCompra),
    precioVenta: Number(producto.precioVenta),
    stock: Number(producto.stock),
    stockMinimo: Number(producto.stockMinimo),
  })
}

export async function eliminarProducto(id) {
  const productoRef = doc(db, 'productos', id)

  return await deleteDoc(productoRef)
}