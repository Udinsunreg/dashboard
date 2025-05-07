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
  Beef,
  Users,
  X,
  ArrowUpRight,
  Filter,
  Download,
  MapIcon,
  BarChart4,
  Milk,
  Wheat,
  ThermometerSun,
  Heart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent } from "@/components/ui/sheet"

// Import amCharts components
import { SpeciesDistributionChart } from "@/components/am-charts/species-distribution-chart"
import { GrowthChart } from "@/components/am-charts/growth-chart"
import { LivestockBreedDistributionChart } from "@/components/am-charts/livestock-breed-distribution-chart"

// Mock data for livestock production
const productionData = [
  { month: "Jan", sapi: 450, kambing: 320, domba: 180, unggas: 250 },
  { month: "Feb", sapi: 480, kambing: 350, domba: 200, unggas: 270 },
  { month: "Mar", sapi: 520, kambing: 380, domba: 220, unggas: 290 },
  { month: "Apr", sapi: 490, kambing: 400, domba: 210, unggas: 310 },
  { month: "May", sapi: 550, kambing: 420, domba: 240, unggas: 330 },
  { month: "Jun", sapi: 580, kambing: 450, domba: 260, unggas: 350 },
  { month: "Jul", sapi: 600, kambing: 470, domba: 280, unggas: 370 },
  { month: "Aug", sapi: 620, kambing: 490, domba: 300, unggas: 390 },
  { month: "Sep", sapi: 590, kambing: 460, domba: 290, unggas: 380 },
  { month: "Oct", sapi: 630, kambing: 500, domba: 310, unggas: 400 },
  { month: "Nov", sapi: 650, kambing: 520, domba: 330, unggas: 420 },
  { month: "Dec", sapi: 680, kambing: 550, domba: 350, unggas: 450 },
]

// Mock data for livestock revenue
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

// Mock data for livestock species distribution
const speciesData = [
  { name: "Sapi Perah", value: 35, color: "#0088FE" },
  { name: "Sapi Potong", value: 25, color: "#00C49F" },
  { name: "Kambing", value: 20, color: "#FFBB28" },
  { name: "Domba", value: 15, color: "#FF8042" },
  { name: "Unggas", value: 5, color: "#8884d8" },
]

// Mock data for environment conditions over time
const environmentData = [
  { date: "2023-01-01", temperature: 27.5, humidity: 65, ammonia: 8 },
  { date: "2023-02-01", temperature: 27.8, humidity: 67, ammonia: 9 },
  { date: "2023-03-01", temperature: 28.2, humidity: 68, ammonia: 10 },
  { date: "2023-04-01", temperature: 28.5, humidity: 70, ammonia: 11 },
  { date: "2023-05-01", temperature: 28.8, humidity: 72, ammonia: 12 },
  { date: "2023-06-01", temperature: 29.0, humidity: 71, ammonia: 11 },
  { date: "2023-07-01", temperature: 29.2, humidity: 69, ammonia: 10 },
  { date: "2023-08-01", temperature: 29.5, humidity: 68, ammonia: 9 },
  { date: "2023-09-01", temperature: 29.3, humidity: 67, ammonia: 10 },
  { date: "2023-10-01", temperature: 29.0, humidity: 66, ammonia: 11 },
  { date: "2023-11-01", temperature: 28.7, humidity: 65, ammonia: 10 },
  { date: "2023-12-01", temperature: 28.5, humidity: 64, ammonia: 9 },
]

// Mock data for livestock devices
const deviceData = [
  {
    id: 1,
    name: "Aerator 1",
    location: "Kandang Sapi A1",
    status: "active",
    lastMaintenance: "2023-10-15",
    battery: 85,
  },
  {
    id: 2,
    name: "Aerator 2",
    location: "Kandang Sapi A2",
    status: "active",
    lastMaintenance: "2023-11-02",
    battery: 72,
  },
  {
    id: 3,
    name: "Aerator 3",
    location: "Kandang Kambing B1",
    status: "inactive",
    lastMaintenance: "2023-09-28",
    battery: 20,
  },
  {
    id: 4,
    name: "Water Pump 1",
    location: "Kandang Sapi A1",
    status: "active",
    lastMaintenance: "2023-10-20",
    battery: 90,
  },
  {
    id: 5,
    name: "Water Pump 2",
    location: "Kandang Sapi A2",
    status: "active",
    lastMaintenance: "2023-11-05",
    battery: 78,
  },
  {
    id: 6,
    name: "Feeder 1",
    location: "Kandang Sapi A1",
    status: "active",
    lastMaintenance: "2023-10-10",
    battery: 82,
  },
  {
    id: 7,
    name: "Feeder 2",
    location: "Kandang Kambing B1",
    status: "warning",
    lastMaintenance: "2023-09-15",
    battery: 35,
  },
  {
    id: 8,
    name: "Environment Monitor",
    location: "Semua Kandang",
    status: "active",
    lastMaintenance: "2023-11-01",
    battery: 95,
  },
]

// Mock data for livestock sensors
const sensorData = [
  { id: 1, name: "Kandang Sapi A1", type: "Suhu", value: "26.5°C", status: "normal" },
  { id: 2, name: "Kandang Sapi A2", type: "Suhu", value: "27.9°C", status: "normal" },
  { id: 3, name: "Kandang Kambing B1", type: "Suhu", value: "29.1°C", status: "warning" },
  { id: 4, name: "Kandang Sapi A1", type: "Kelembaban", value: "65%", status: "normal" },
  { id: 5, name: "Kandang Sapi A2", type: "Kelembaban", value: "72%", status: "normal" },
  { id: 6, name: "Kandang Kambing B1", type: "Kelembaban", value: "78%", status: "warning" },
  { id: 7, name: "Kandang Sapi A1", type: "Amonia", value: "8 ppm", status: "normal" },
  { id: 8, name: "Kandang Sapi A2", type: "Amonia", value: "10 ppm", status: "normal" },
  { id: 9, name: "Kandang Kambing B1", type: "Amonia", value: "15 ppm", status: "warning" },
]

// Livestock health data
const livestockHealthDataOld = [
  { id: 1, location: "Kandang Sapi A1", species: "Sapi Perah", status: "Sehat", growth: 95, feed: 98, mortality: 2 },
  {
    id: 2,
    location: "Kandang Sapi A2",
    species: "Sapi Potong",
    status: "Perhatian",
    growth: 88,
    feed: 92,
    mortality: 5,
  },
  { id: 3, location: "Kandang Kambing B1", species: "Kambing", status: "Sehat", growth: 97, feed: 96, mortality: 1 },
]

// Environment alerts
const environmentAlerts = [
  {
    id: 1,
    location: "Kandang Kambing B1",
    parameter: "Suhu",
    value: "29.1°C",
    status: "warning",
    message: "Suhu sedikit di atas optimal (18-28°C)",
    time: "2 jam yang lalu",
  },
  {
    id: 2,
    location: "Kandang Kambing B1",
    parameter: "Kelembaban",
    value: "78%",
    status: "warning",
    message: "Kelembaban sedikit di atas optimal (50-70%)",
    time: "3 jam yang lalu",
  },
  {
    id: 3,
    location: "Kandang Kambing B1",
    parameter: "Amonia",
    value: "15 ppm",
    status: "warning",
    message: "Kadar amonia sedikit di atas optimal (<10 ppm)",
    time: "1 jam yang lalu",
  },
]

// Livestock growth data
const livestockGrowthDataOld = [
  { week: 1, sapi: 5, kambing: 4, domba: 3, unggas: 4 },
  { week: 2, sapi: 8, kambing: 7, domba: 5, unggas: 6 },
  { week: 3, sapi: 12, kambing: 10, domba: 8, unggas: 9 },
  { week: 4, sapi: 18, kambing: 15, domba: 12, unggas: 14 },
  { week: 5, sapi: 25, kambing: 21, domba: 17, unggas: 20 },
  { week: 6, sapi: 35, kambing: 28, domba: 23, unggas: 27 },
  { week: 7, sapi: 48, kambing: 38, domba: 30, unggas: 35 },
  { week: 8, sapi: 65, kambing: 50, domba: 38, unggas: 45 },
]

// Sample data for livestock distribution
const livestockDistributionData = [
  { category: "Kambing", value: 501.9, color: "#D97706" },
  { category: "Domba", value: 301.9, color: "#F59E0B" },
  { category: "Sapi", value: 201.1, color: "#FBBF24" },
  { category: "Ayam", value: 165.8, color: "#FCD34D" },
  { category: "Bebek", value: 139.9, color: "#FDE68A" },
]

// Sample data for livestock health
const livestockHealthData = [
  { category: "Sehat", value: 75 },
  { category: "Sakit Ringan", value: 15 },
  { category: "Sakit Berat", value: 7 },
  { category: "Karantina", value: 3 },
]

// Sample data for livestock production
const livestockProductionData = [
  { date: "2023-01-01", target: 100, actual: 95 },
  { date: "2023-02-01", target: 110, actual: 105 },
  { date: "2023-03-01", target: 120, actual: 115 },
  { date: "2023-04-01", target: 130, actual: 125 },
  { date: "2023-05-01", target: 140, actual: 138 },
  { date: "2023-06-01", target: 150, actual: 148 },
  { date: "2023-07-01", target: 160, actual: 155, forecast: 155 },
  { date: "2023-08-01", target: 170, actual: 165, forecast: 168 },
  { date: "2023-09-01", target: 180, actual: 175, forecast: 178 },
  { date: "2023-10-01", target: 190, actual: 185, forecast: 188 },
  { date: "2023-11-01", target: 200, actual: 195, forecast: 198 },
  { date: "2023-12-01", target: 210, actual: 205, forecast: 208 },
]

// Sample data for livestock growth
const livestockGrowthData = [
  { date: "2023-01-01", goat: 100, sheep: 80, cattle: 50 },
  { date: "2023-02-01", goat: 110, sheep: 85, cattle: 55 },
  { date: "2023-03-01", goat: 120, sheep: 90, cattle: 60 },
  { date: "2023-04-01", goat: 130, sheep: 95, cattle: 65 },
  { date: "2023-05-01", goat: 140, sheep: 100, cattle: 70 },
  { date: "2023-06-01", goat: 150, sheep: 105, cattle: 75 },
  { date: "2023-07-01", goat: 160, sheep: 110, cattle: 80 },
  { date: "2023-08-01", goat: 170, sheep: 115, cattle: 85 },
  { date: "2023-09-01", goat: 180, sheep: 120, cattle: 90 },
  { date: "2023-10-01", goat: 190, sheep: 125, cattle: 95 },
  { date: "2023-11-01", goat: 200, sheep: 130, cattle: 100 },
  { date: "2023-12-01", goat: 210, sheep: 135, cattle: 105 },
]

export default function PeternakanPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [fromDate, setFromDate] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [toDate, setToDate] = useState<Date>(new Date())
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
              <SidebarMenuButton asChild>
                <Link href="/perikanan">
                  <Fish className="h-4 w-4" />
                  <span>Perikanan</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
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
              <Beef className="h-6 w-6 text-amber-600" />
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
              <Beef className="h-6 w-6 text-amber-600" />
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
                <h1 className="text-xl font-semibold">Peternakan</h1>
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
                    <h2 className="text-2xl font-bold tracking-tight">Manajemen Peternakan</h2>
                    <p className="text-muted-foreground">Pemantauan dan pengelolaan ternak</p>
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
                              <label htmlFor="jenis-ternak">Jenis Ternak</label>
                              <Select defaultValue="all">
                                <SelectTrigger id="jenis-ternak" className="col-span-2 h-8">
                                  <SelectValue placeholder="Pilih jenis ternak" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">Semua Jenis</SelectItem>
                                  <SelectItem value="sapi-perah">Sapi Perah</SelectItem>
                                  <SelectItem value="sapi-potong">Sapi Potong</SelectItem>
                                  <SelectItem value="kambing">Kambing</SelectItem>
                                  <SelectItem value="domba">Domba</SelectItem>
                                  <SelectItem value="unggas">Unggas</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label htmlFor="kandang">Kandang</label>
                              <Select defaultValue="all">
                                <SelectTrigger id="kandang" className="col-span-2 h-8">
                                  <SelectValue placeholder="Pilih kandang" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">Semua Kandang</SelectItem>
                                  <SelectItem value="kandang-a1">Kandang Sapi A1</SelectItem>
                                  <SelectItem value="kandang-a2">Kandang Sapi A2</SelectItem>
                                  <SelectItem value="kandang-b1">Kandang Kambing B1</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button size="sm">Terapkan Filter</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                      <Download className="mr-2 h-4 w-4" />
                      Unduh Laporan
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Ternak</CardTitle>
                      <Beef className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,245 ekor</div>
                      <div className="flex items-center pt-1">
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">+15% dari bulan lalu</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Produksi Susu</CardTitle>
                      <Milk className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,350 liter</div>
                      <div className="flex items-center pt-1">
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">+5.2% dari minggu lalu</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Kesehatan Ternak</CardTitle>
                      <Heart className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">92%</div>
                      <div className="flex items-center pt-1">
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">+2.5% dari bulan lalu</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Pendapatan</CardTitle>
                      <CircleDollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Rp 85.4 Juta</div>
                      <div className="flex items-center pt-1">
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">+12.3% dari bulan lalu</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
                    <TabsTrigger value="devices">Perangkat</TabsTrigger>
                    <TabsTrigger value="data">Data Sensor</TabsTrigger>
                    <TabsTrigger value="production">Produksi</TabsTrigger>
                    <TabsTrigger value="income">Pendapatan</TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Distribusi Jenis Ternak</CardTitle>
                          <CardDescription>Persentase populasi berdasarkan jenis ternak</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <SpeciesDistributionChart data={speciesData} />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Pertumbuhan Ternak</CardTitle>
                          <CardDescription>Rata-rata pertumbuhan berat badan per minggu</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <GrowthChart data={livestockGrowthDataOld} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Add the new card with more height for the breed distribution chart */}
                    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-bold">Distribusi Jenis Ternak Berdasarkan Ras</CardTitle>
                        <CardDescription>Persentase populasi berdasarkan ras ternak</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 pb-4">
                        <div className="flex items-center justify-center h-[350px]">
                          <LivestockBreedDistributionChart />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Status Ternak</CardTitle>
                        <CardDescription>Status kesehatan dan produktivitas ternak</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b pb-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Sapi Perah</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <div className="mr-1 h-2 w-2 rounded-full bg-green-500"></div>
                                Sehat
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">435 ekor</p>
                              <p className="text-xs text-muted-foreground">Produksi susu: 15.8 liter/ekor/hari</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-b pb-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Sapi Potong</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <div className="mr-1 h-2 w-2 rounded-full bg-green-500"></div>
                                Sehat
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">310 ekor</p>
                              <p className="text-xs text-muted-foreground">Pertambahan berat: 1.2 kg/hari</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-b pb-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Kambing</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500"></div>
                                Perlu Perhatian
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">250 ekor</p>
                              <p className="text-xs text-muted-foreground">Pertambahan berat: 0.15 kg/hari</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Domba</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <div className="mr-1 h-2 w-2 rounded-full bg-green-500"></div>
                                Sehat
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">190 ekor</p>
                              <p className="text-xs text-muted-foreground">Pertambahan berat: 0.12 kg/hari</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Lihat Detail
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Peringatan Terbaru</CardTitle>
                        <CardDescription>Notifikasi dan peringatan dari sistem</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-yellow-100 p-2">
                              <ThermometerSun className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Suhu Kandang Tinggi</p>
                                <p className="text-xs text-muted-foreground">2 jam yang lalu</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Suhu di kandang kambing B1 mencapai 29.1°C, melebihi batas optimal (18-28°C).
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-yellow-100 p-2">
                              <Wheat className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Stok Pakan Menipis</p>
                                <p className="text-xs text-muted-foreground">5 jam yang lalu</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Stok pakan konsentrat tersisa 15%, segera lakukan pemesanan.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-green-100 p-2">
                              <Heart className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Jadwal Vaksinasi</p>
                                <p className="text-xs text-muted-foreground">12 jam yang lalu</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Pengingat: Jadwal vaksinasi untuk 45 ekor sapi perah besok.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Lihat Semua Peringatan
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  {/* Other tabs content */}
                  {/* Devices Tab */}
                  <TabsContent value="devices" className="space-y-6">
                    {/* Devices content */}
                  </TabsContent>

                  {/* Data Sensor Tab */}
                  <TabsContent value="data" className="space-y-6">
                    {/* Data sensor content */}
                  </TabsContent>

                  {/* Production Tab */}
                  <TabsContent value="production" className="space-y-6">
                    {/* Production content */}
                  </TabsContent>

                  {/* Income Tab */}
                  <TabsContent value="income" className="space-y-6">
                    {/* Income content */}
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
