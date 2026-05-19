import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'

import { db } from '@config/firebase'

const ventasRef = collection(db, 'ventas')

export async function registrarVenta(venta) {
  for (const producto of venta.productos) {
    const productoRef = doc(db, 'productos', producto.id)
    const productoSnap = await getDoc(productoRef)

    if (!productoSnap.exists()) {
      throw new Error(`El producto ${producto.nombre} ya no existe`)
    }

    const stockActual = Number(productoSnap.data().stock)
    const cantidadVendida = Number(producto.cantidad)

    if (cantidadVendida > stockActual) {
      throw new Error(`Stock insuficiente para ${producto.nombre}`)
    }

    await updateDoc(productoRef, {
      stock: stockActual - cantidadVendida,
    })
  }

  return await addDoc(ventasRef, {
    cliente: venta.cliente,
    productos: venta.productos,
    total: Number(venta.total),
    estado: 'registrada',
    fechaVenta: serverTimestamp(),
  })
}

export async function obtenerVentas() {
  const consulta = query(ventasRef, orderBy('fechaVenta', 'desc'))
  const resultado = await getDocs(consulta)

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }))
}