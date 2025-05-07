"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
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
  Settings,
  Thermometer,
  Beef,
  Users,
  X,
  ArrowUpRight,
  Filter,
  Download,
  MapIcon,
  BarChart4,
  Droplets,
  Waves,
  Gauge,
  Anchor,
  Microscope,
  AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"
import { CombinedChart } from "@/components/combined-chart"

// Mock data for fisheries sensors
const sensorData = [
  { id: 1, name: "Kolam 1", type: "Suhu Air", value: "28.5°C", status: "normal" },
  { id: 2, name: "Kolam 2", type: "Suhu Air", value: "27.9°C", status: "normal" },
  { id: 3, name: "Kolam 3", type: "Suhu Air", value: "29.1°C", status: "warning" },
  { id: 4, name: "Kolam 1", type: "pH Air", value: "7.2", status: "normal" },
  { id: 5, name: "Kolam 2", type: "pH Air", value: "6.8", status: "warning" },
  { id: 6, name: "Kolam 3", type: "pH Air", value: "7.5", status: "normal" },
  { id: 7, name: "Kolam 1", type: "Oksigen Terlarut", value: "6.8 mg/L", status: "normal" },
  { id: 8, name: "Kolam 2", type: "Oksigen Terlarut", value: "5.9 mg/L", status: "warning" },
  { id: 9, name: "Kolam 3", type: "Oksigen Terlarut", value: "7.1 mg/L", status: "normal" },
]

// Mock data for fisheries devices
const deviceData = [
  { id: 1, name: "Aerator 1", location: "Kolam 1", status: "active", lastMaintenance: "2023-10-15" },
  { id: 2, name: "Aerator 2", location: "Kolam 2", status: "active", lastMaintenance: "2023-11-02" },
  { id: 3, name: "Aerator 3", location: "Kolam 3", status: "inactive", lastMaintenance: "2023-09-28" },
  { id: 4, name: "Water Pump 1", location: "Kolam 1", status: "active", lastMaintenance: "2023-10-20" },
  { id: 5, name: "Water Pump 2", location: "Kolam 2", status: "active", lastMaintenance: "2023-11-05" },
  { id: 6, name: "Feeder 1", location: "Kolam 1", status: "active", lastMaintenance: "2023-10-10" },
  { id: 7, name: "Feeder 2", location: "Kolam 2", status: "warning", lastMaintenance: "2023-09-15" },
  { id: 8, name: "Water Quality Monitor", location: "All Ponds", status: "active", lastMaintenance: "2023-11-01" },
]

// Mock data for fisheries production
const productionData = [
  { month: "Jan", lele: 450, nila: 320, gurame: 180, mas: 250 },
  { month: "Feb", lele: 480, nila: 350, gurame: 200, mas: 270 },
  { month: "Mar", lele: 520, nila: 380, gurame: 220, mas: 290 },
  { month: "Apr", lele: 490, nila: 400, gurame: 210, mas: 310 },
  { month: "May", lele: 550, nila: 420, gurame: 240, mas: 330 },
  { month: "Jun", lele: 580, nila: 450, gurame: 260, mas: 350 },
  { month: "Jul", lele: 600, nila: 470, gurame: 280, mas: 370 },
  { month: "Aug", lele: 620, nila: 490, gurame: 300, mas: 390 },
  { month: "Sep", lele: 590, nila: 460, gurame: 290, mas: 380 },
  { month: "Oct", lele: 630, nila: 500, gurame: 310, mas: 400 },
  { month: "Nov", lele: 650, nila: 520, gurame: 330, mas: 420 },
  { month: "Dec", lele: 680, nila: 550, gurame: 350, mas: 450 },
]

// Mock data for fisheries revenue
const revenueData = [
  { date: "2023-01-15", target: 25, actual: 22, forecast: 28, trend: 26 },
  { date: "2023-02-15", target: 28, actual: 30, forecast: 32, trend: 29 },
  { date: "2023-03-15", target: 32, actual: 34, forecast: 36, trend: 33 },
  { date: "2023-04-15", target: 35, actual: 32, forecast: 38, trend: 36 },
  { date: "2023-05-15", target: 38, actual: 40, forecast: 42, trend: 39 },
  { date: "2023-06-15", target: 42, actual: 45, forecast: 46, trend: 43 },
  { date: "2023-07-15", target: 45, actual: 48, forecast: 50, trend: 47 },
  { date: "2023-08-15", target: 48, actual: 52, forecast: 54, trend: 50 },
  { date: "2023-09-15", target: 52, actual: 56, forecast: 58, trend: 54 },
  { date: "2023-10-15", target: 56, actual: 58, forecast: 62, trend: 59 },
  { date: "2023-11-15", target: 60, actual: 62, forecast: 65, trend: 63 },
  { date: "2023-12-15", target: 65, actual: 68, forecast: 70, trend: 67 },
]

// Mock data for fish species distribution
const speciesData = [
  { species: "Lele", value: 35 },
  { species: "Nila", value: 25 },
  { species: "Gurame", value: 20 },
  { species: "Mas", value: 15 },
  { species: "Patin", value: 5 },
]

// Mock data for water quality over time
const waterQualityData = [
  { date: "2023-01-01", temperature: 27.5, ph: 7.2, oxygen: 6.8 },
  { date: "2023-02-01", temperature: 27.8, ph: 7.1, oxygen: 6.7 },
  { date: "2023-03-01", temperature: 28.2, ph: 7.3, oxygen: 6.9 },
  { date: "2023-04-01", temperature: 28.5, ph: 7.2, oxygen: 7.0 },
  { date: "2023-05-01", temperature: 28.8, ph: 7.4, oxygen: 7.1 },
  { date: "2023-06-01", temperature: 29.0, ph: 7.3, oxygen: 7.0 },
  { date: "2023-07-01", temperature: 29.2, ph: 7.2, oxygen: 6.9 },
  { date: "2023-08-01", temperature: 29.5, ph: 7.1, oxygen: 6.8 },
  { date: "2023-09-01", temperature: 29.3, ph: 7.2, oxygen: 6.9 },
  { date: "2023-10-01", temperature: 29.0, ph: 7.3, oxygen: 7.0 },
  { date: "2023-11-01", temperature: 28.7, ph: 7.4, oxygen: 7.1 },
  { date: "2023-12-01", temperature: 28.5, ph: 7.3, oxygen: 7.0 },
]

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// Fish health data
const fishHealthData = [
  { id: 1, pond: "Kolam 1", species: "Lele", status: "Sehat", growth: 95, feed: 98, mortality: 2 },
  { id: 2, pond: "Kolam 2", species: "Nila", status: "Perhatian", growth: 88, feed: 92, mortality: 5 },
  { id: 3, pond: "Kolam 3", species: "Gurame", status: "Sehat", growth: 97, feed: 96, mortality: 1 },
]

// Water quality alerts
const waterQualityAlerts = [
  {
    id: 1,
    pond: "Kolam 2",
    parameter: "pH Air",
    value: "6.8",
    status: "warning",
    message: "pH air sedikit di bawah optimal (7.0-7.5)",
    time: "2 jam yang lalu",
  },
  {
    id: 2,
    pond: "Kolam 2",
    parameter: "Oksigen Terlarut",
    value: "5.9 mg/L",
    status: "warning",
    message: "Kadar oksigen terlarut di bawah optimal (>6.0 mg/L)",
    time: "3 jam yang lalu",
  },
  {
    id: 3,
    pond: "Kolam 3",
    parameter: "Suhu Air",
    value: "29.1°C",
    status: "warning",
    message: "Suhu air sedikit di atas optimal (26-28°C)",
    time: "1 jam yang lalu",
  },
]

// Fish growth data
const fishGrowthData = [
  { week: 1, lele: 5, nila: 4, gurame: 3, mas: 4 },
  { week: 2, lele: 8, nila: 7, gurame: 5, mas: 6 },
  { week: 3, lele: 12, nila: 10, gurame: 8, mas: 9 },
  { week: 4, lele: 18, nila: 15, gurame: 12, mas: 14 },
  { week: 5, lele: 25, nila: 21, gurame: 17, mas: 20 },
  { week: 6, lele: 35, nila: 28, gurame: 23, mas: 27 },
  { week: 7, lele: 48, nila: 38, gurame: 30, mas: 35 },
  { week: 8, lele: 65, nila: 50, gurame: 38, mas: 45 },
]

export default function PerikananPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTab, setSelectedTab] = useState("overview")
  const [fromDate, setFromDate] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [toDate, setToDate] = useState<Date>(new Date())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  // Filter devices based on search query and filters
  const filteredDevices = deviceData.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || device.status === filterStatus
    const matchesType = filterType === "all" || true // No type filter for now

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
              <SidebarMenuButton asChild>
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
              <SidebarMenuButton asChild isActive>
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
              <Fish className="h-6 w-6 text-blue-600" />
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

        {/* Mobile menu sheet */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="flex items-center gap-2 px-4 py-2">
              <Fish className="h-6 w-6 text-blue-600" />
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">Agrimarliv</span>
                <span className="text-xs text-muted-foreground leading-tight">Technology Indonesia</span>
              </div>
            </div>
            <div className="py-4">
              <MenuItems />
            </div>
          </SheetContent>
        </Sheet>

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
                <h1 className="text-xl font-semibold">Perikanan</h1>
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
                    <h2 className="text-2xl font-bold tracking-tight">Manajemen Perikanan</h2>
                    <p className="text-muted-foreground">Pemantauan dan pengelolaan budidaya ikan</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          <span>Filter</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Filter Data</h4>
                            <p className="text-sm text-muted-foreground">Pilih filter untuk menampilkan data</p>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label htmlFor="jenis-ikan">Jenis Ikan</label>
                              <Select defaultValue="all">
                                <SelectTrigger id="jenis-ikan" className="col-span-2 h-8">
                                  <SelectValue placeholder="Pilih jenis ikan" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">Semua Jenis</SelectItem>
                                  <SelectItem value="lele">Lele</SelectItem>
                                  <SelectItem value="nila">Nila</SelectItem>
                                  <SelectItem value="gurame">Gurame</SelectItem>
                                  <SelectItem value="mas">Mas</SelectItem>
                                  <SelectItem value="patin">Patin</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label htmlFor="kolam">Kolam</label>
                              <Select defaultValue="all">
                                <SelectTrigger id="kolam" className="col-span-2 h-8">
                                  <SelectValue placeholder="Pilih kolam" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">Semua Kolam</SelectItem>
                                  <SelectItem value="kolam1">Kolam 1</SelectItem>
                                  <SelectItem value="kolam2">Kolam 2</SelectItem>
                                  <SelectItem value="kolam3">Kolam 3</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button size="sm">Terapkan Filter</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Download className="mr-2 h-4 w-4" />
                      Unduh Laporan
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Produksi</CardTitle>
                      <Fish className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5,240 kg</div>
                      <div className="flex items-center pt-1">
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">+20.1% dari bulan lalu</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Pendapatan</CardTitle>
                      <CircleDollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Rp 78,5 Juta</div>
                      <div className="flex items-center pt-1">
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">+15.2% dari bulan lalu</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Kualitas Air</CardTitle>
                      <Droplets className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Baik</div>
                      <div className="flex items-center pt-1">
                        <AlertTriangle className="mr-1 h-4 w-4 text-amber-600" />
                        <span className="text-xs font-medium text-amber-600">2 kolam perlu perhatian</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Kesehatan Ikan</CardTitle>
                      <Activity className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">98%</div>
                      <div className="flex items-center pt-1">
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">+2.5% dari bulan lalu</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
                    <TabsTrigger value="sensors">Sensor</TabsTrigger>
                    <TabsTrigger value="devices">Perangkat</TabsTrigger>
                    <TabsTrigger value="production">Produksi</TabsTrigger>
                    <TabsTrigger value="revenue">Pendapatan</TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Distribusi Jenis Ikan</CardTitle>
                        <CardDescription>Persentase produksi berdasarkan jenis ikan</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[350px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={speciesData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label={({ species, value, percent }) =>
                                  `${species}: ${value}% (${(percent * 100).toFixed(0)}%)`
                                }
                              >
                                {speciesData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => `${value}%`} />
                              <Legend
                                layout="vertical"
                                verticalAlign="middle"
                                align="right"
                                payload={speciesData.map((item, index) => ({
                                  id: item.species,
                                  type: "square",
                                  value: `${item.species} ${item.value}.00%`,
                                  color: COLORS[index % COLORS.length],
                                }))}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                      <Card className="col-span-4">
                        <CardHeader>
                          <CardTitle>Produksi Ikan Bulanan</CardTitle>
                          <CardDescription>Produksi ikan per jenis dalam kilogram</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                          <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={productionData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="lele" fill="#0088FE" name="Lele" />
                              <Bar dataKey="nila" fill="#00C49F" name="Nila" />
                              <Bar dataKey="gurame" fill="#FFBB28" name="Gurame" />
                              <Bar dataKey="mas" fill="#FF8042" name="Mas" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                      <Card className="col-span-3">
                        <CardHeader>
                          <CardTitle>Kesehatan Ikan</CardTitle>
                          <CardDescription>Status kesehatan ikan per kolam</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {fishHealthData.map((item) => (
                              <div key={item.id} className="rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`h-3 w-3 rounded-full ${
                                        item.status === "Sehat" ? "bg-green-500" : "bg-amber-500"
                                      }`}
                                    />
                                    <span className="font-medium">
                                      {item.pond} - {item.species}
                                    </span>
                                  </div>
                                  <Badge
                                    variant={item.status === "Sehat" ? "outline" : "secondary"}
                                    className={item.status === "Sehat" ? "text-green-600" : "text-amber-600"}
                                  >
                                    {item.status}
                                  </Badge>
                                </div>
                                <div className="mt-4 space-y-3">
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                      <span>Pertumbuhan</span>
                                      <span className="font-medium">{item.growth}%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted">
                                      <div
                                        className={`h-2 rounded-full ${
                                          item.growth > 90 ? "bg-green-500" : "bg-amber-500"
                                        }`}
                                        style={{ width: `${item.growth}%` }}
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                      <span>Konsumsi Pakan</span>
                                      <span className="font-medium">{item.feed}%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted">
                                      <div
                                        className={`h-2 rounded-full ${
                                          item.feed > 90 ? "bg-green-500" : "bg-amber-500"
                                        }`}
                                        style={{ width: `${item.feed}%` }}
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                      <span>Tingkat Kematian</span>
                                      <span className="font-medium">{item.mortality}%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted">
                                      <div
                                        className={`h-2 rounded-full ${
                                          item.mortality < 3 ? "bg-green-500" : "bg-red-500"
                                        }`}
                                        style={{ width: `${item.mortality * 5}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                      <Card className="col-span-4">
                        <CardHeader>
                          <CardTitle>Kualitas Air</CardTitle>
                          <CardDescription>Tren parameter kualitas air selama 12 bulan terakhir</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                          <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={waterQualityData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                dataKey="date"
                                tickFormatter={(value) =>
                                  new Date(value).toLocaleDateString("id-ID", { month: "short" })
                                }
                              />
                              <YAxis yAxisId="left" />
                              <YAxis yAxisId="right" orientation="right" />
                              <Tooltip />
                              <Legend />
                              <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="temperature"
                                stroke="#FF8042"
                                name="Suhu (°C)"
                                activeDot={{ r: 8 }}
                              />
                              <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="ph"
                                stroke="#0088FE"
                                name="pH"
                                activeDot={{ r: 8 }}
                              />
                              <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="oxygen"
                                stroke="#00C49F"
                                name="Oksigen (mg/L)"
                                activeDot={{ r: 8 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                      <Card className="col-span-3">
                        <CardHeader>
                          <CardTitle>Peringatan Kualitas Air</CardTitle>
                          <CardDescription>Notifikasi parameter kualitas air yang perlu perhatian</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {waterQualityAlerts.map((alert) => (
                              <div key={alert.id} className="flex items-start gap-4 rounded-lg border p-4">
                                <div
                                  className={`rounded-full p-2 ${
                                    alert.status === "warning" ? "bg-yellow-100" : "bg-red-100"
                                  }`}
                                >
                                  <AlertTriangle
                                    className={`h-4 w-4 ${
                                      alert.status === "warning" ? "text-yellow-600" : "text-red-600"
                                    }`}
                                  />
                                </div>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <p className="font-medium">
                                      {alert.pond} - {alert.parameter}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                                  <div className="flex items-center justify-between text-sm">
                                    <span>Nilai saat ini:</span>
                                    <span className={alert.status === "warning" ? "text-yellow-600" : "text-red-600"}>
                                      {alert.value}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <Button variant="outline" className="w-full">
                              Lihat Semua Peringatan
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Pertumbuhan Ikan</CardTitle>
                        <CardDescription>Rata-rata pertumbuhan ikan per minggu (gram)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                          <LineChart data={fishGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="week"
                              label={{ value: "Minggu", position: "insideBottomRight", offset: -5 }}
                            />
                            <YAxis label={{ value: "Berat (gram)", angle: -90, position: "insideLeft" }} />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="lele"
                              name="Lele"
                              stroke="#0088FE"
                              strokeWidth={2}
                              activeDot={{ r: 8 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="nila"
                              name="Nila"
                              stroke="#00C49F"
                              strokeWidth={2}
                              activeDot={{ r: 8 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="gurame"
                              name="Gurame"
                              stroke="#FFBB28"
                              strokeWidth={2}
                              activeDot={{ r: 8 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="mas"
                              name="Mas"
                              stroke="#FF8042"
                              strokeWidth={2}
                              activeDot={{ r: 8 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Sensors Tab */}
                  <TabsContent value="sensors" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Parameter Kualitas Air</CardTitle>
                            <CardDescription>Monitoring parameter kualitas air secara real-time</CardDescription>
                          </div>
                          <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Pilih Kolam" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Semua Kolam</SelectItem>
                              <SelectItem value="kolam1">Kolam 1</SelectItem>
                              <SelectItem value="kolam2">Kolam 2</SelectItem>
                              <SelectItem value="kolam3">Kolam 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-lg font-medium flex items-center">
                              <Thermometer className="mr-2 h-5 w-5" />
                              Suhu Air
                            </h3>
                            <ResponsiveContainer width="100%" height={200}>
                              <LineChart data={waterQualityData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                  dataKey="date"
                                  tickFormatter={(value) =>
                                    new Date(value).toLocaleDateString("id-ID", { month: "short" })
                                  }
                                />
                                <YAxis domain={[25, 32]} />
                                <Tooltip />
                                <Line
                                  type="monotone"
                                  dataKey="temperature"
                                  stroke="#FF8042"
                                  name="Suhu (°C)"
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                  activeDot={{ r: 8 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                            <div className="mt-2 flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <span>Optimal: 26-28°C</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                <span>Perhatian: 28-30°C atau 24-26°C</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <span>Kritis: &gt;30°C atau &lt;24°C</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium flex items-center">
                              <Waves className="mr-2 h-5 w-5" />
                              pH Air
                            </h3>
                            <ResponsiveContainer width="100%" height={200}>
                              <LineChart data={waterQualityData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                  dataKey="date"
                                  tickFormatter={(value) =>
                                    new Date(value).toLocaleDateString("id-ID", { month: "short" })
                                  }
                                />
                                <YAxis domain={[6, 8]} />
                                <Tooltip />
                                <Line
                                  type="monotone"
                                  dataKey="ph"
                                  stroke="#0088FE"
                                  name="pH"
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                  activeDot={{ r: 8 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                            <div className="mt-2 flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <span>Optimal: 7.0-7.5</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                <span>Perhatian: 6.5-7.0 atau 7.5-8.0</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <span>Kritis: &lt;6.5 atau &gt;8.0</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium flex items-center">
                              <Droplets className="mr-2 h-5 w-5" />
                              Oksigen Terlarut
                            </h3>
                            <ResponsiveContainer width="100%" height={200}>
                              <LineChart data={waterQualityData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                  dataKey="date"
                                  tickFormatter={(value) =>
                                    new Date(value).toLocaleDateString("id-ID", { month: "short" })
                                  }
                                />
                                <YAxis domain={[5, 8]} />
                                <Tooltip />
                                <Line
                                  type="monotone"
                                  dataKey="oxygen"
                                  stroke="#00C49F"
                                  name="Oksigen (mg/L)"
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                  activeDot={{ r: 8 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                            <div className="mt-2 flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <span>Optimal: &gt;6.0 mg/L</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                <span>Perhatian: 5.0-6.0 mg/L</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <span>Kritis: &lt;5.0 mg/L</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {sensorData.map((sensor) => (
                        <Card key={sensor.id}>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              {sensor.name} - {sensor.type}
                            </CardTitle>
                            <Badge
                              variant={
                                sensor.status === "normal"
                                  ? "outline"
                                  : sensor.status === "warning"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={
                                sensor.status === "normal"
                                  ? "text-green-600 bg-green-50"
                                  : sensor.status === "warning"
                                    ? "text-amber-600 bg-amber-50"
                                    : "text-red-600 bg-red-50"
                              }
                            >
                              {sensor.status === "normal"
                                ? "Normal"
                                : sensor.status === "warning"
                                  ? "Perhatian"
                                  : "Kritis"}
                            </Badge>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{sensor.value}</div>
                            <p className="text-xs text-muted-foreground">Diperbarui 5 menit yang lalu</p>
                            <div className="mt-4">
                              <Button variant="outline" size="sm" className="w-full">
                                Lihat Riwayat
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Devices Tab */}
                  <TabsContent value="devices" className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-semibold">Perangkat Pendukung Perikanan</h2>
                        <p className="text-muted-foreground">Total 8 perangkat terpasang</p>
                      </div>
                      <div className="flex gap-2">
                        <Select defaultValue="all" onValueChange={setFilterStatus}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="warning">Perhatian</SelectItem>
                            <SelectItem value="inactive">Tidak Aktif</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredDevices.map((device) => (
                        <Card
                          key={device.id}
                          className={
                            device.status === "inactive"
                              ? "border-red-200 bg-red-50"
                              : device.status === "warning"
                                ? "border-yellow-200 bg-yellow-50"
                                : ""
                          }
                        >
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{device.name}</CardTitle>
                            <Badge
                              variant={
                                device.status === "active"
                                  ? "outline"
                                  : device.status === "warning"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={
                                device.status === "active"
                                  ? "text-green-600 bg-green-50"
                                  : device.status === "warning"
                                    ? "text-amber-600 bg-amber-50"
                                    : "text-red-600 bg-red-50"
                              }
                            >
                              {device.status === "active"
                                ? "Aktif"
                                : device.status === "warning"
                                  ? "Perhatian"
                                  : "Tidak Aktif"}
                            </Badge>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Lokasi:</span>
                                <span className="text-sm font-medium">{device.location}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Pemeliharaan Terakhir:</span>
                                <span className="text-sm font-medium">
                                  {new Date(device.lastMaintenance).toLocaleDateString("id-ID")}
                                </span>
                              </div>
                              <div className="pt-2">
                                <Button variant="outline" size="sm" className="w-full">
                                  Detail Perangkat
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Jadwal Pemeliharaan</CardTitle>
                        <CardDescription>Jadwal pemeliharaan perangkat perikanan</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-blue-100 p-2">
                              <Anchor className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Kalibrasi Sensor Kualitas Air</p>
                                <Badge>Terjadwal</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Kalibrasi sensor pH dan oksigen terlarut di semua kolam
                              </p>
                              <p className="text-xs text-muted-foreground">Dijadwalkan: 15 April 2025</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-green-100 p-2">
                              <Gauge className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Penggantian Baterai</p>
                                <Badge variant="outline" className="text-red-600 bg-red-50">
                                  Mendesak
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Penggantian baterai untuk aerator di Kolam 3
                              </p>
                              <p className="text-xs text-muted-foreground">Dijadwalkan: 10 April 2025</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-purple-100 p-2">
                              <Microscope className="h-4 w-4 text-purple-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Pembaruan Firmware</p>
                                <Badge variant="secondary">Rutin</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Pembaruan firmware untuk semua perangkat sensor
                              </p>
                              <p className="text-xs text-muted-foreground">Dijadwalkan: 20 April 2025</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Lihat Semua Jadwal
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  {/* Production Tab */}
                  <TabsContent value="production" className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Lele</CardTitle>
                          <Fish className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">2,150 kg</div>
                          <div className="flex items-center pt-1">
                            <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                            <span className="text-xs font-medium text-green-600">+15.3% dari bulan lalu</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Nila</CardTitle>
                          <Fish className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">1,540 kg</div>
                          <div className="flex items-center pt-1">
                            <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                            <span className="text-xs font-medium text-green-600">+12.8% dari bulan lalu</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Gurame</CardTitle>
                          <Fish className="h-4 w-4 text-amber-600" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">980 kg</div>
                          <div className="flex items-center pt-1">
                            <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                            <span className="text-xs font-medium text-green-600">+18.5% dari bulan lalu</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Mas</CardTitle>
                          <Fish className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">570 kg</div>
                          <div className="flex items-center pt-1">
                            <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                            <span className="text-xs font-medium text-green-600">+10.2% dari bulan lalu</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Produksi Ikan Tahunan</CardTitle>
                        <CardDescription>Tren produksi ikan per jenis selama 12 bulan terakhir</CardDescription>
                      </CardHeader>
                      <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={400}>
                          <BarChart data={productionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="lele" fill="#0088FE" name="Lele" />
                            <Bar dataKey="nila" fill="#00C49F" name="Nila" />
                            <Bar dataKey="gurame" fill="#FFBB28" name="Gurame" />
                            <Bar dataKey="mas" fill="#FF8042" name="Mas" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Distribusi Jenis Ikan</CardTitle>
                          <CardDescription>Persentase produksi berdasarkan jenis ikan</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div id="speciesDonutChart" className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={speciesData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={100}
                                  fill="#8884d8"
                                  paddingAngle={5}
                                  dataKey="value"
                                  label={({ species, percent }) => `${species}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {speciesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Tingkat Kelangsungan Hidup</CardTitle>
                          <CardDescription>Persentase kelangsungan hidup ikan per jenis</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Lele</span>
                                <span className="text-sm font-medium">92%</span>
                              </div>
                              <div className="h-2 w-full bg-secondary">
                                <div className="h-2 bg-primary" style={{ width: "92%" }} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Nila</span>
                                <span className="text-sm font-medium">88%</span>
                              </div>
                              <div className="h-2 w-full bg-secondary">
                                <div className="h-2 bg-primary" style={{ width: "88%" }} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Gurame</span>
                                <span className="text-sm font-medium">95%</span>
                              </div>
                              <div className="h-2 w-full bg-secondary">
                                <div className="h-2 bg-primary" style={{ width: "95%" }} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Mas</span>
                                <span className="text-sm font-medium">90%</span>
                              </div>
                              <div className="h-2 w-full bg-secondary">
                                <div className="h-2 bg-primary" style={{ width: "90%" }} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Analisis Faktor Produksi</CardTitle>
                        <CardDescription>Faktor-faktor yang mempengaruhi produksi ikan</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Kualitas Air</span>
                              <span className="text-sm">
                                85% <span className="text-xs text-muted-foreground">(Pengaruh terhadap produksi)</span>
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[85%] rounded-full bg-blue-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Kualitas air yang baik dengan parameter optimal mendukung pertumbuhan ikan yang sehat.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Kualitas Pakan</span>
                              <span className="text-sm">
                                78% <span className="text-xs text-muted-foreground">(Pengaruh terhadap produksi)</span>
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[78%] rounded-full bg-green-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Pakan berkualitas tinggi dengan kandungan nutrisi yang seimbang mendukung pertumbuhan ikan
                              yang optimal.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Kepadatan Tebar</span>
                              <span className="text-sm">
                                65% <span className="text-xs text-muted-foreground">(Pengaruh terhadap produksi)</span>
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[65%] rounded-full bg-amber-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Kepadatan tebar yang optimal memastikan ruang yang cukup untuk pertumbuhan ikan.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Pengendalian Penyakit</span>
                              <span className="text-sm">
                                70% <span className="text-xs text-muted-foreground">(Pengaruh terhadap produksi)</span>
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[70%] rounded-full bg-purple-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Pengendalian penyakit yang efektif mengurangi tingkat kematian dan meningkatkan hasil
                              panen.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Lihat Analisis Lengkap
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  {/* Revenue Tab */}
                  <TabsContent value="revenue" className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
                          <CircleDollarSign className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">Rp 78,5 Juta</div>
                          <div className="flex items-center pt-1">
                            <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                            <span className="text-xs font-medium text-green-600">+15.2% dari bulan lalu</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Biaya Operasional</CardTitle>
                          <CircleDollarSign className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">Rp 32,8 Juta</div>
                          <div className="flex items-center pt-1">
                            <ArrowUpRight className="mr-1 h-4 w-4 text-amber-600" />
                            <span className="text-xs font-medium text-amber-600">+8.5% dari bulan lalu</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Keuntungan Bersih</CardTitle>
                          <CircleDollarSign className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">Rp 45,7 Juta</div>
                          <div className="flex items-center pt-1">
                            <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                            <span className="text-xs font-medium text-green-600">+20.3% dari bulan lalu</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Margin Keuntungan</CardTitle>
                          <Gauge className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">58.2%</div>
                          <div className="flex items-center pt-1">
                            <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                            <span className="text-xs font-medium text-green-600">+5.1% dari bulan lalu</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Analisis Pendapatan dan Target</CardTitle>
                            <CardDescription>Perbandingan pendapatan aktual dengan target bulanan</CardDescription>
                          </div>
                          <Select defaultValue="2025">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2023">2023</SelectItem>
                              <SelectItem value="2024">2024</SelectItem>
                              <SelectItem value="2025">2025</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div id="combinedChart" className="h-[500px]">
                          <CombinedChart />
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Pendapatan per Jenis Ikan</CardTitle>
                          <CardDescription>Kontribusi pendapatan berdasarkan jenis ikan</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                              <Pie
                                data={[
                                  { name: "Lele", value: 35000000 },
                                  { name: "Nila", value: 25000000 },
                                  { name: "Gurame", value: 12000000 },
                                  { name: "Mas", value: 6500000 },
                                ]}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {speciesData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => `Rp ${(value / 1000000).toFixed(1)} Juta`} />
                            </PieChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Tren Harga Jual</CardTitle>
                          <CardDescription>Perubahan harga jual ikan per kilogram</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                              data={[
                                { month: "Jan", lele: 25000, nila: 28000, gurame: 45000, mas: 30000 },
                                { month: "Feb", lele: 25500, nila: 28500, gurame: 46000, mas: 30500 },
                                { month: "Mar", lele: 26000, nila: 29000, gurame: 46500, mas: 31000 },
                                { month: "Apr", lele: 26500, nila: 29500, gurame: 47000, mas: 31500 },
                                { month: "May", lele: 27000, nila: 30000, gurame: 48000, mas: 32000 },
                                { month: "Jun", lele: 27500, nila: 30500, gurame: 48500, mas: 32500 },
                              ]}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
                              <Legend />
                              <Line type="monotone" dataKey="lele" stroke="#0088FE" name="Lele" />
                              <Line type="monotone" dataKey="nila" stroke="#00C49F" name="Nila" />
                              <Line type="monotone" dataKey="gurame" stroke="#FFBB28" name="Gurame" />
                              <Line type="monotone" dataKey="mas" stroke="#FF8042" name="Mas" />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Proyeksi Pendapatan</CardTitle>
                        <CardDescription>Proyeksi pendapatan 6 bulan ke depan</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                          <LineChart
                            data={[
                              { month: "Jul", actual: 78.5, projected: 78.5 },
                              { month: "Aug", actual: null, projected: 82.3 },
                              { month: "Sep", actual: null, projected: 86.5 },
                              { month: "Oct", actual: null, projected: 91.2 },
                              { month: "Nov", actual: null, projected: 96.4 },
                              { month: "Dec", actual: null, projected: 102.1 },
                            ]}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => `Rp ${value} Juta`} />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="actual"
                              name="Pendapatan Aktual"
                              stroke="#0088FE"
                              strokeWidth={2}
                              dot={{ r: 6 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="projected"
                              name="Proyeksi Pendapatan"
                              stroke="#22c55e"
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              dot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                      <CardFooter>
                        <div className="space-y-2 w-full">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Pertumbuhan Proyeksi Tahunan:</span>
                            <span className="text-sm font-medium text-green-600">+30.1%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Faktor Risiko:</span>
                            <span className="text-sm font-medium text-amber-600">Sedang</span>
                          </div>
                          <Button variant="outline" className="w-full mt-4">
                            Lihat Detail Proyeksi
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
