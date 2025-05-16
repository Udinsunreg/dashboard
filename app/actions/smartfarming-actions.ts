"use server"

import { revalidatePath } from "next/cache"
import { query } from "@/lib/db"

export type SmartFarmingData = {
  ID?: number
  Pertanian: string
  Perikanan: string
  Peternakan: string
  Waktu: string
}

// Get all smartfarming data
export async function getSmartFarmingData() {
  try {
    const data = await query("SELECT * FROM smartfarming ORDER BY ID DESC")
    return { success: true, data }
  } catch (error) {
    console.error("Failed to fetch smartfarming data:", error)
    return { success: false, error: "Failed to fetch data" }
  }
}

// Get a single smartfarming record by ID
export async function getSmartFarmingById(id: number) {
  try {
    const data = await query("SELECT * FROM smartfarming WHERE ID = ?", [id])
    const record = Array.isArray(data) && data.length > 0 ? data[0] : null
    return { success: true, data: record }
  } catch (error) {
    console.error(`Failed to fetch smartfarming record with ID ${id}:`, error)
    return { success: false, error: "Failed to fetch record" }
  }
}

// Create a new smartfarming record
export async function createSmartFarming(formData: FormData) {
  try {
    const pertanian = formData.get("pertanian") as string
    const perikanan = formData.get("perikanan") as string
    const peternakan = formData.get("peternakan") as string
    const waktu = formData.get("waktu") as string

    await query("INSERT INTO smartfarming (Pertanian, Perikanan, Peternakan, Waktu) VALUES (?, ?, ?, ?)", [
      pertanian,
      perikanan,
      peternakan,
      waktu,
    ])

    revalidatePath("/maps")
    return { success: true, message: "Data berhasil ditambahkan" }
  } catch (error) {
    console.error("Failed to create smartfarming record:", error)
    return { success: false, error: "Failed to create record" }
  }
}

// Update an existing smartfarming record
export async function updateSmartFarming(formData: FormData) {
  try {
    const id = Number.parseInt(formData.get("id") as string)
    const pertanian = formData.get("pertanian") as string
    const perikanan = formData.get("perikanan") as string
    const peternakan = formData.get("peternakan") as string
    const waktu = formData.get("waktu") as string

    await query("UPDATE smartfarming SET Pertanian = ?, Perikanan = ?, Peternakan = ?, Waktu = ? WHERE ID = ?", [
      pertanian,
      perikanan,
      peternakan,
      waktu,
      id,
    ])

    revalidatePath("/maps")
    return { success: true, message: "Data berhasil diperbarui" }
  } catch (error) {
    console.error("Failed to update smartfarming record:", error)
    return { success: false, error: "Failed to update record" }
  }
}

// Delete a smartfarming record
export async function deleteSmartFarming(id: number) {
  try {
    await query("DELETE FROM smartfarming WHERE ID = ?", [id])
    revalidatePath("/maps")
    return { success: true, message: "Data berhasil dihapus" }
  } catch (error) {
    console.error(`Failed to delete smartfarming record with ID ${id}:`, error)
    return { success: false, error: "Failed to delete record" }
  }
}
