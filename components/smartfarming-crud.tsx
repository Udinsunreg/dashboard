"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Edit, Trash2, Plus, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import {
  getSmartFarmingData,
  createSmartFarming,
  updateSmartFarming,
  deleteSmartFarming,
  type SmartFarmingData,
} from "@/app/actions/smartfarming-actions"

export default function SmartFarmingCRUD() {
  const [data, setData] = useState<SmartFarmingData[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<SmartFarmingData | null>(null)
  const [formState, setFormState] = useState({
    id: "",
    pertanian: "",
    perikanan: "",
    peternakan: "",
    waktu: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const result = await getSmartFarmingData()
      if (result.success) {
        setData(result.data as SmartFarmingData[])
      } else {
        toast({
          title: "Error",
          description: "Gagal mengambil data",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddClick = () => {
    setFormState({
      id: "",
      pertanian: "",
      perikanan: "",
      peternakan: "",
      waktu: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    })
    setIsAddDialogOpen(true)
  }

  const handleEditClick = (item: SmartFarmingData) => {
    setCurrentItem(item)
    setFormState({
      id: item.ID?.toString() || "",
      pertanian: item.Pertanian,
      perikanan: item.Perikanan,
      peternakan: item.Peternakan,
      waktu: item.Waktu,
    })
    setIsEditDialogOpen(true)
  }

  const handleDeleteClick = (item: SmartFarmingData) => {
    setCurrentItem(item)
    setIsDeleteDialogOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("pertanian", formState.pertanian)
      formData.append("perikanan", formState.perikanan)
      formData.append("peternakan", formState.peternakan)
      formData.append("waktu", formState.waktu)

      const result = await createSmartFarming(formData)

      if (result.success) {
        toast({
          title: "Sukses",
          description: result.message,
        })
        setIsAddDialogOpen(false)
        fetchData()
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error adding data:", error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menambahkan data",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("id", formState.id)
      formData.append("pertanian", formState.pertanian)
      formData.append("perikanan", formState.perikanan)
      formData.append("peternakan", formState.peternakan)
      formData.append("waktu", formState.waktu)

      const result = await updateSmartFarming(formData)

      if (result.success) {
        toast({
          title: "Sukses",
          description: result.message,
        })
        setIsEditDialogOpen(false)
        fetchData()
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating data:", error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memperbarui data",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!currentItem?.ID) return

    setSubmitting(true)
    try {
      const result = await deleteSmartFarming(currentItem.ID)

      if (result.success) {
        toast({
          title: "Sukses",
          description: result.message,
        })
        setIsDeleteDialogOpen(false)
        fetchData()
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting data:", error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menghapus data",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Data Smart Farming</CardTitle>
        <Button onClick={handleAddClick} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Data
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Pertanian</TableHead>
                  <TableHead>Perikanan</TableHead>
                  <TableHead>Peternakan</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item) => (
                    <TableRow key={item.ID}>
                      <TableCell>{item.ID}</TableCell>
                      <TableCell>{item.Pertanian}</TableCell>
                      <TableCell>{item.Perikanan}</TableCell>
                      <TableCell>{item.Peternakan}</TableCell>
                      <TableCell>{item.Waktu}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleEditClick(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDeleteClick(item)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Data Smart Farming</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="pertanian">Pertanian</Label>
                <Input
                  id="pertanian"
                  name="pertanian"
                  value={formState.pertanian}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="perikanan">Perikanan</Label>
                <Input
                  id="perikanan"
                  name="perikanan"
                  value={formState.perikanan}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="peternakan">Peternakan</Label>
                <Input
                  id="peternakan"
                  name="peternakan"
                  value={formState.peternakan}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="waktu">Waktu</Label>
                <Input id="waktu" name="waktu" value={formState.waktu} onChange={handleInputChange} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Data Smart Farming</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-pertanian">Pertanian</Label>
                <Input
                  id="edit-pertanian"
                  name="pertanian"
                  value={formState.pertanian}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-perikanan">Perikanan</Label>
                <Input
                  id="edit-perikanan"
                  name="perikanan"
                  value={formState.perikanan}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-peternakan">Peternakan</Label>
                <Input
                  id="edit-peternakan"
                  name="peternakan"
                  value={formState.peternakan}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-waktu">Waktu</Label>
                <Input id="edit-waktu" name="waktu" value={formState.waktu} onChange={handleInputChange} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Perbarui
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <p className="text-sm text-muted-foreground mt-2">
              ID: {currentItem?.ID}, Pertanian: {currentItem?.Pertanian}
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteConfirm} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
