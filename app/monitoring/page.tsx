"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import {
  Activity,
  BarChart3,
  CalendarIcon,
  ChevronDown,
  CircleDollarSign,
  Fish,
  Leaf,
  Menu,
  TreesIcon as Plant,
  Settings,
  Thermometer,
  Beef,
  Users,
  X,
  Camera,
  MapPin,
  Wifi,
  WifiOff,
  AlertTriangle,
  Search,
  RefreshCw,
  MapIcon,
  BarChart4,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Dummy data for devices
const deviceData = [
  {
    id: "DEV001",
    name: "Sensor Lahan Padi A1",
    type: "sensor",
    location: "Lahan Padi Blok A1",
    status: "online",
    lastUpdate: "2 menit yang lalu",
    battery: 85,
    sensors: {
      temperature: 28,
      humidity: 75,
      light: 850,
    },
    coordinates: { lat: -6.2088, lng: 106.8456 },
  },
  {
    id: "DEV002",
    name: "Kamera Lahan Padi A1",
    type: "camera",
    location: "Lahan Padi Blok A1",
    status: "online",
    lastUpdate: "5 menit yang lalu",
    battery: 72,
    coordinates: { lat: -6.209, lng: 106.8458 },
  },
  {
    id: "DEV003",
    name: "Sensor Kolam Ikan B2",
    type: "sensor",
    location: "Kolam Ikan Blok B2",
    status: "online",
    lastUpdate: "10 menit yang lalu",
    battery: 65,
    sensors: {
      temperature: 32,
      humidity: 90,
      ph: 7.2,
    },
    coordinates: { lat: -6.21, lng: 106.847 },
  },
  {
    id: "DEV004",
    name: "Kamera Kolam Ikan B2",
    type: "camera",
    location: "Kolam Ikan Blok B2",
    status: "offline",
    lastUpdate: "2 jam yang lalu",
    battery: 15,
    coordinates: { lat: -6.2102, lng: 106.8472 },
  },
  {
    id: "DEV005",
    name: "Sensor Kandang Sapi C3",
    type: "sensor",
    location: "Kandang Sapi Blok C3",
    status: "warning",
    lastUpdate: "15 menit yang lalu",
    battery: 45,
    sensors: {
      temperature: 30,
      humidity: 65,
      activity: "low",
    },
    coordinates: { lat: -6.211, lng: 106.848 },
  },
  {
    id: "DEV006",
    name: "Kamera Kandang Sapi C3",
    type: "camera",
    location: "Kandang Sapi Blok C3",
    status: "online",
    lastUpdate: "8 menit yang lalu",
    battery: 90,
    coordinates: { lat: -6.2112, lng: 106.8482 },
  },
  {
    id: "DEV007",
    name: "Sensor Lahan Jagung D4",
    type: "sensor",
    location: "Lahan Jagung Blok D4",
    status: "online",
    lastUpdate: "3 menit yang lalu",
    battery: 95,
    sensors: {
      temperature: 29,
      humidity: 60,
      light: 920,
    },
    coordinates: { lat: -6.212, lng: 106.849 },
  },
  {
    id: "DEV008",
    name: "Kamera Lahan Jagung D4",
    type: "camera",
    location: "Lahan Jagung Blok D4",
    status: "warning",
    lastUpdate: "30 menit yang lalu",
    battery: 35,
    coordinates: { lat: -6.2122, lng: 106.8492 },
  },
]

export default function Monitoring() {
  const searchParams = useSearchParams()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState(searchParams.get("status") || "all")
  const [filterType, setFilterType] = useState(searchParams.get("type") || "all")
  const [fromDate, setFromDate] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [toDate, setToDate] = useState<Date>(new Date())

  // Filter devices based on search query and filters
  const filteredDevices = deviceData.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || device.status === filterStatus
    const matchesType = filterType === "all" || device.type === filterType

    return matchesSearch && matchesStatus && matchesType
  })

  // Komponen menu untuk digunakan di sidebar dan sheet mobile
  const MenuItems = () => (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <Link href="/monitoring">
                  <Activity className="h-4 w-4" />
                  <span>Monitoring Perangkat</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/maps">
                  <MapIcon className="h-4 w-4" />
                  <span>Peta Lokasi</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/analysis">
                  <BarChart4 className="h-4 w-4" />
                  <span>Analisis Data</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/pertanian">
                  <Leaf className="h-4 w-4" />
                  <span>Pertanian</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/perikanan">
                  <Fish className="h-4 w-4" />
                  <span>Perikanan</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/peternakan">
                  <Beef className="h-4 w-4" />
                  <span>Peternakan</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Manajemen</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Users className="h-4 w-4" />
                  <span>Pengguna</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Settings className="h-4 w-4" />
                  <span>Pengaturan</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-screen overflow-hidden bg-muted/40">
        {/* Sidebar */}
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Plant className="h-6 w-6 text-green-600" />
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">Agrimarliv</span>
                <span className="text-xs text-muted-foreground leading-tight">Technology Indonesia</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <MenuItems />
          </SidebarContent>
          <SidebarFooter>
            <div className="px-3 py-2">
              <Button variant="outline" className="w-full justify-start">
                <CircleDollarSign className="mr-2 h-4 w-4" />
                Laporan Keuangan
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main content area */}
        <div className="relative flex-1">
          {/* Navbar */}
          <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
              <div className="flex-1 md:grow-0">
                <h1 className="text-xl font-semibold">Monitoring Perangkat</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 w-[140px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(fromDate, "d MMM yyyy", { locale: id })}
                      <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={fromDate}
                      onSelect={(date) => date && setFromDate(date)}
                      locale={id}
                    />
                  </PopoverContent>
                </Popover>
                <span className="text-sm text-muted-foreground">-</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 w-[140px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(toDate, "d MMM yyyy", { locale: id })}
                      <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={toDate}
                      onSelect={(date) => date && setToDate(date)}
                      locale={id}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt="Avatar"
                    />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profil</DropdownMenuItem>
                  <DropdownMenuItem>Pengaturan</DropdownMenuItem>
                  <DropdownMenuItem>Keluar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Main content with scrolling */}
          <div className="h-[calc(100vh-4rem)] overflow-auto">
            <div className="p-6">
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Monitoring Perangkat</h2>
                    <p className="text-muted-foreground">Pemantauan sensor dan kamera di semua lokasi</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/maps">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>Lihat Peta</span>
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => window.location.reload()}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh Data
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Perangkat</CardTitle>
                      <Activity className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{deviceData.length} Unit</div>
                      <p className="text-xs text-muted-foreground">Semua perangkat terdaftar</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Perangkat Online</CardTitle>
                      <Wifi className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {deviceData.filter((d) => d.status === "online").length} Unit
                      </div>
                      <p className="text-xs text-muted-foreground">Perangkat yang aktif dan terhubung</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Perangkat Offline</CardTitle>
                      <WifiOff className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {deviceData.filter((d) => d.status === "offline").length} Unit
                      </div>
                      <p className="text-xs text-muted-foreground">Perangkat yang tidak terhubung</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Peringatan</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {deviceData.filter((d) => d.status === "warning").length} Unit
                      </div>
                      <p className="text-xs text-muted-foreground">Perangkat dengan peringatan</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Cari perangkat..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-9"
                    />
                    <Button type="submit" size="sm" className="h-9">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                        <SelectItem value="warning">Peringatan</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Tipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Tipe</SelectItem>
                        <SelectItem value="sensor">Sensor</SelectItem>
                        <SelectItem value="camera">Kamera</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Tabs defaultValue="all" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="all">Semua Perangkat</TabsTrigger>
                    <TabsTrigger value="sensors">Sensor</TabsTrigger>
                    <TabsTrigger value="cameras">Kamera</TabsTrigger>
                    <TabsTrigger value="alerts">Peringatan</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredDevices.map((device) => (
                        <Card
                          key={device.id}
                          className={
                            device.status === "offline"
                              ? "border-red-200 bg-red-50"
                              : device.status === "warning"
                                ? "border-yellow-200 bg-yellow-50"
                                : ""
                          }
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {device.type === "sensor" ? (
                                  <Thermometer className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <Camera className="h-4 w-4 text-purple-600" />
                                )}
                                <CardTitle className="text-sm font-medium">{device.name}</CardTitle>
                              </div>
                              <Badge
                                variant={
                                  device.status === "online"
                                    ? "default"
                                    : device.status === "offline"
                                      ? "destructive"
                                      : "outline"
                                }
                                className={device.status === "warning" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                              >
                                {device.status === "online"
                                  ? "Online"
                                  : device.status === "offline"
                                    ? "Offline"
                                    : "Peringatan"}
                              </Badge>
                            </div>
                            <CardDescription>{device.location}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">ID Perangkat:</span>
                                <span>{device.id}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Pembaruan Terakhir:</span>
                                <span>{device.lastUpdate}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Baterai:</span>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={
                                      device.battery > 70
                                        ? "text-green-600"
                                        : device.battery > 30
                                          ? "text-yellow-600"
                                          : "text-red-600"
                                    }
                                  >
                                    {device.battery}%
                                  </span>
                                  <div className="h-2 w-16 rounded-full bg-muted">
                                    <div
                                      className={`h-full rounded-full ${
                                        device.battery > 70
                                          ? "bg-green-600"
                                          : device.battery > 30
                                            ? "bg-yellow-600"
                                            : "bg-red-600"
                                      }`}
                                      style={{ width: `${device.battery}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                              {device.type === "sensor" && device.sensors && (
                                <div className="mt-4 space-y-2 rounded-md bg-background p-2">
                                  <h4 className="text-xs font-medium">Data Sensor:</h4>
                                  {device.sensors.temperature && (
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-muted-foreground">Suhu:</span>
                                      <span>{device.sensors.temperature}°C</span>
                                    </div>
                                  )}
                                  {device.sensors.humidity && (
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-muted-foreground">Kelembaban:</span>
                                      <span>{device.sensors.humidity}%</span>
                                    </div>
                                  )}
                                  {device.sensors.light && (
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-muted-foreground">Cahaya:</span>
                                      <span>{device.sensors.light} lux</span>
                                    </div>
                                  )}
                                  {device.sensors.ph && (
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-muted-foreground">pH:</span>
                                      <span>{device.sensors.ph}</span>
                                    </div>
                                  )}
                                  {device.sensors.activity && (
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-muted-foreground">Aktivitas:</span>
                                      <span
                                        className={
                                          device.sensors.activity === "high"
                                            ? "text-green-600"
                                            : device.sensors.activity === "medium"
                                              ? "text-yellow-600"
                                              : "text-red-600"
                                        }
                                      >
                                        {device.sensors.activity === "high"
                                          ? "Tinggi"
                                          : device.sensors.activity === "medium"
                                            ? "Sedang"
                                            : "Rendah"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <div className="flex w-full gap-2">
                              <Button variant="outline" className="w-full">
                                Lihat Detail
                              </Button>
                              <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                                <Link href="/analysis" className="flex w-full items-center justify-center">
                                  Analisis Data
                                </Link>
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="sensors" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredDevices
                        .filter((device) => device.type === "sensor")
                        .map((device) => (
                          <Card
                            key={device.id}
                            className={
                              device.status === "offline"
                                ? "border-red-200 bg-red-50"
                                : device.status === "warning"
                                  ? "border-yellow-200 bg-yellow-50"
                                  : ""
                            }
                          >
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Thermometer className="h-4 w-4 text-blue-600" />
                                  <CardTitle className="text-sm font-medium">{device.name}</CardTitle>
                                </div>
                                <Badge
                                  variant={
                                    device.status === "online"
                                      ? "default"
                                      : device.status === "offline"
                                        ? "destructive"
                                        : "outline"
                                  }
                                  className={device.status === "warning" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                                >
                                  {device.status === "online"
                                    ? "Online"
                                    : device.status === "offline"
                                      ? "Offline"
                                      : "Peringatan"}
                                </Badge>
                              </div>
                              <CardDescription>{device.location}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">ID Perangkat:</span>
                                  <span>{device.id}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Pembaruan Terakhir:</span>
                                  <span>{device.lastUpdate}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Baterai:</span>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={
                                        device.battery > 70
                                          ? "text-green-600"
                                          : device.battery > 30
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                      }
                                    >
                                      {device.battery}%
                                    </span>
                                    <div className="h-2 w-16 rounded-full bg-muted">
                                      <div
                                        className={`h-full rounded-full ${
                                          device.battery > 70
                                            ? "bg-green-600"
                                            : device.battery > 30
                                              ? "bg-yellow-600"
                                              : "bg-red-600"
                                        }`}
                                        style={{ width: `${device.battery}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                {device.sensors && (
                                  <div className="mt-4 space-y-2 rounded-md bg-background p-2">
                                    <h4 className="text-xs font-medium">Data Sensor:</h4>
                                    {device.sensors.temperature && (
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Suhu:</span>
                                        <span>{device.sensors.temperature}°C</span>
                                      </div>
                                    )}
                                    {device.sensors.humidity && (
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Kelembaban:</span>
                                        <span>{device.sensors.humidity}%</span>
                                      </div>
                                    )}
                                    {device.sensors.light && (
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Cahaya:</span>
                                        <span>{device.sensors.light} lux</span>
                                      </div>
                                    )}
                                    {device.sensors.ph && (
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">pH:</span>
                                        <span>{device.sensors.ph}</span>
                                      </div>
                                    )}
                                    {device.sensors.activity && (
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Aktivitas:</span>
                                        <span
                                          className={
                                            device.sensors.activity === "high"
                                              ? "text-green-600"
                                              : device.sensors.activity === "medium"
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                          }
                                        >
                                          {device.sensors.activity === "high"
                                            ? "Tinggi"
                                            : device.sensors.activity === "medium"
                                              ? "Sedang"
                                              : "Rendah"}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                            <CardFooter>
                              <div className="flex w-full gap-2">
                                <Button variant="outline" className="w-full">
                                  Lihat Detail
                                </Button>
                                <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                                  <Link href="/analysis" className="flex w-full items-center justify-center">
                                    Analisis Data
                                  </Link>
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="cameras" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredDevices
                        .filter((device) => device.type === "camera")
                        .map((device) => (
                          <Card
                            key={device.id}
                            className={
                              device.status === "offline"
                                ? "border-red-200 bg-red-50"
                                : device.status === "warning"
                                  ? "border-yellow-200 bg-yellow-50"
                                  : ""
                            }
                          >
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Camera className="h-4 w-4 text-purple-600" />
                                  <CardTitle className="text-sm font-medium">{device.name}</CardTitle>
                                </div>
                                <Badge
                                  variant={
                                    device.status === "online"
                                      ? "default"
                                      : device.status === "offline"
                                        ? "destructive"
                                        : "outline"
                                  }
                                  className={device.status === "warning" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                                >
                                  {device.status === "online"
                                    ? "Online"
                                    : device.status === "offline"
                                      ? "Offline"
                                      : "Peringatan"}
                                </Badge>
                              </div>
                              <CardDescription>{device.location}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">ID Perangkat:</span>
                                  <span>{device.id}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Pembaruan Terakhir:</span>
                                  <span>{device.lastUpdate}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Baterai:</span>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={
                                        device.battery > 70
                                          ? "text-green-600"
                                          : device.battery > 30
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                      }
                                    >
                                      {device.battery}%
                                    </span>
                                    <div className="h-2 w-16 rounded-full bg-muted">
                                      <div
                                        className={`h-full rounded-full ${
                                          device.battery > 70
                                            ? "bg-green-600"
                                            : device.battery > 30
                                              ? "bg-yellow-600"
                                              : "bg-red-600"
                                        }`}
                                        style={{ width: `${device.battery}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4">
                                  {device.status === "online" ? (
                                    <div className="relative aspect-video rounded-md bg-muted">
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <Camera className="h-12 w-12 text-muted-foreground opacity-20" />
                                      </div>
                                      <div className="absolute bottom-2 right-2">
                                        <Badge variant="secondary" className="bg-background/80">
                                          Live
                                        </Badge>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="relative aspect-video rounded-md bg-muted">
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <Camera className="h-12 w-12 text-muted-foreground opacity-20" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                          <p className="text-sm font-medium text-white">Tidak tersedia</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <div className="flex w-full gap-2">
                                <Button variant="outline" className="w-full">
                                  Lihat Detail
                                </Button>
                                <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                                  <Link href="/analysis" className="flex w-full items-center justify-center">
                                    Analisis Data
                                  </Link>
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="alerts" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredDevices
                        .filter((device) => device.status === "warning" || device.status === "offline")
                        .map((device) => (
                          <Card
                            key={device.id}
                            className={
                              device.status === "offline"
                                ? "border-red-200 bg-red-50"
                                : device.status === "warning"
                                  ? "border-yellow-200 bg-yellow-50"
                                  : ""
                            }
                          >
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {device.type === "sensor" ? (
                                    <Thermometer className="h-4 w-4 text-blue-600" />
                                  ) : (
                                    <Camera className="h-4 w-4 text-purple-600" />
                                  )}
                                  <CardTitle className="text-sm font-medium">{device.name}</CardTitle>
                                </div>
                                <Badge
                                  variant={
                                    device.status === "online"
                                      ? "default"
                                      : device.status === "offline"
                                        ? "destructive"
                                        : "outline"
                                  }
                                  className={device.status === "warning" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                                >
                                  {device.status === "online"
                                    ? "Online"
                                    : device.status === "offline"
                                      ? "Offline"
                                      : "Peringatan"}
                                </Badge>
                              </div>
                              <CardDescription>{device.location}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">ID Perangkat:</span>
                                  <span>{device.id}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Pembaruan Terakhir:</span>
                                  <span>{device.lastUpdate}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Baterai:</span>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={
                                        device.battery > 70
                                          ? "text-green-600"
                                          : device.battery > 30
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                      }
                                    >
                                      {device.battery}%
                                    </span>
                                    <div className="h-2 w-16 rounded-full bg-muted">
                                      <div
                                        className={`h-full rounded-full ${
                                          device.battery > 70
                                            ? "bg-green-600"
                                            : device.battery > 30
                                              ? "bg-yellow-600"
                                              : "bg-red-600"
                                        }`}
                                        style={{ width: `${device.battery}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                {device.type === "sensor" && device.sensors && (
                                  <div className="mt-4 space-y-2 rounded-md bg-background p-2">
                                    <h4 className="text-xs font-medium">Data Sensor:</h4>
                                    {device.sensors.temperature && (
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Suhu:</span>
                                        <span>{device.sensors.temperature}°C</span>
                                      </div>
                                    )}
                                    {device.sensors.humidity && (
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Kelembaban:</span>
                                        <span>{device.sensors.humidity}%</span>
                                      </div>
                                    )}
                                    {device.sensors.light && (
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Cahaya:</span>
                                        <span>{device.sensors.light} lux</span>
                                      </div>
                                    )}
                                    {device.sensors.ph && (
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">pH:</span>
                                        <span>{device.sensors.ph}</span>
                                      </div>
                                    )}
                                    {device.sensors.activity && (
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Aktivitas:</span>
                                        <span
                                          className={
                                            device.sensors.activity === "high"
                                              ? "text-green-600"
                                              : device.sensors.activity === "medium"
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                          }
                                        >
                                          {device.sensors.activity === "high"
                                            ? "Tinggi"
                                            : device.sensors.activity === "medium"
                                              ? "Sedang"
                                              : "Rendah"}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                            <CardFooter>
                              <div className="flex w-full gap-2">
                                <Button variant="outline" className="w-full">
                                  Lihat Detail
                                </Button>
                                <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                                  <Link href="/analysis" className="flex w-full items-center justify-center">
                                    Analisis Data
                                  </Link>
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Segera hadir: Integrasi dengan Google Maps untuk melihat lokasi perangkat
                    </p>
                    <div className="mt-4 h-[200px] w-full max-w-2xl rounded-lg border bg-muted/20">
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                          <MapPin className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                          <h3 className="mt-4 text-lg font-medium">Peta Lokasi Perangkat</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Integrasi dengan Google Maps akan segera tersedia
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Sheet */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-[80%] max-w-sm p-0">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <Plant className="h-6 w-6 text-green-600" />
                <div className="flex flex-col">
                  <span className="text-lg font-bold leading-tight">Agrimarliv</span>
                  <span className="text-xs text-muted-foreground leading-tight">Technology Indonesia</span>
                </div>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <MenuItems />
              </div>
              <div className="border-t p-3">
                <Button variant="outline" className="w-full justify-start">
                  <CircleDollarSign className="mr-2 h-4 w-4" />
                  Laporan Keuangan
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </SidebarProvider>
  )
}
