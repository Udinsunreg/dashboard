"use client"

import { useState, useEffect } from "react"
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
  TreesIcon as Plant,
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
  Sprout,
  LineChart,
  Tractor,
  Wheat,
  SproutIcon as Seedling,
  Shovel,
  Microscope,
  Bug,
  CloudRain,
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
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"

// Dummy data for charts
const monthlyProductionData = [
  { month: "Jan", padi: 45, jagung: 30, kedelai: 25, sayuran: 20 },
  { month: "Feb", padi: 42, jagung: 32, kedelai: 24, sayuran: 22 },
  { month: "Mar", padi: 48, jagung: 34, kedelai: 26, sayuran: 24 },
  { month: "Apr", padi: 50, jagung: 36, kedelai: 28, sayuran: 26 },
  { month: "May", padi: 52, jagung: 38, kedelai: 30, sayuran: 28 },
  { month: "Jun", padi: 55, jagung: 40, kedelai: 32, sayuran: 30 },
  { month: "Jul", padi: 58, jagung: 42, kedelai: 34, sayuran: 32 },
  { month: "Aug", padi: 60, jagung: 44, kedelai: 36, sayuran: 34 },
  { month: "Sep", padi: 62, jagung: 46, kedelai: 38, sayuran: 36 },
  { month: "Oct", padi: 65, jagung: 48, kedelai: 40, sayuran: 38 },
  { month: "Nov", padi: 68, jagung: 50, kedelai: 42, sayuran: 40 },
  { month: "Dec", padi: 70, jagung: 52, kedelai: 44, sayuran: 42 },
]

const revenueData = [
  { month: "Jan", pendapatan: 120 },
  { month: "Feb", pendapatan: 132 },
  { month: "Mar", pendapatan: 145 },
  { month: "Apr", pendapatan: 162 },
  { month: "May", pendapatan: 180 },
  { month: "Jun", pendapatan: 195 },
  { month: "Jul", pendapatan: 210 },
  { month: "Aug", pendapatan: 225 },
  { month: "Sep", pendapatan: 240 },
  { month: "Oct", pendapatan: 255 },
  { month: "Nov", pendapatan: 270 },
  { month: "Dec", pendapatan: 285 },
]

const cropDistributionData = [
  { name: "Padi", value: 45, color: "#4ade80" },
  { name: "Jagung", value: 30, color: "#facc15" },
  { name: "Kedelai", value: 15, color: "#60a5fa" },
  { name: "Sayuran", value: 10, color: "#a78bfa" },
]

const temperatureData = [
  { date: "01/03", value: 28 },
  { date: "02/03", value: 29 },
  { date: "03/03", value: 30 },
  { date: "04/03", value: 31 },
  { date: "05/03", value: 32 },
  { date: "06/03", value: 30 },
  { date: "07/03", value: 29 },
  { date: "08/03", value: 28 },
  { date: "09/03", value: 27 },
  { date: "10/03", value: 28 },
  { date: "11/03", value: 29 },
  { date: "12/03", value: 30 },
  { date: "13/03", value: 31 },
  { date: "14/03", value: 30 },
]

const humidityData = [
  { date: "01/03", value: 65 },
  { date: "02/03", value: 68 },
  { date: "03/03", value: 70 },
  { date: "04/03", value: 72 },
  { date: "05/03", value: 75 },
  { date: "06/03", value: 73 },
  { date: "07/03", value: 70 },
  { date: "08/03", value: 68 },
  { date: "09/03", value: 65 },
  { date: "10/03", value: 67 },
  { date: "11/03", value: 69 },
  { date: "12/03", value: 72 },
  { date: "13/03", value: 74 },
  { date: "14/03", value: 71 },
]

const soilMoistureData = [
  { date: "01/03", value: 42 },
  { date: "02/03", value: 45 },
  { date: "03/03", value: 48 },
  { date: "04/03", value: 50 },
  { date: "05/03", value: 47 },
  { date: "06/03", value: 45 },
  { date: "07/03", value: 43 },
  { date: "08/03", value: 40 },
  { date: "09/03", value: 38 },
  { date: "10/03", value: 42 },
  { date: "11/03", value: 45 },
  { date: "12/03", value: 47 },
  { date: "13/03", value: 49 },
  { date: "14/03", value: 46 },
]

const growthPhaseData = [
  { name: "Perkecambahan", value: 15 },
  { name: "Pertumbuhan Vegetatif", value: 35 },
  { name: "Pembungaan", value: 30 },
  { name: "Pembuahan", value: 20 },
]

const COLORS = ["#4ade80", "#facc15", "#60a5fa", "#a78bfa", "#f43f5e"]

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
      soil: 42,
    },
  },
  {
    id: "DEV002",
    name: "Kamera Lahan Padi A1",
    type: "camera",
    location: "Lahan Padi Blok A1",
    status: "online",
    lastUpdate: "5 menit yang lalu",
    battery: 72,
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
      soil: 38,
    },
  },
  {
    id: "DEV008",
    name: "Kamera Lahan Jagung D4",
    type: "camera",
    location: "Lahan Jagung Blok D4",
    status: "warning",
    lastUpdate: "30 menit yang lalu",
    battery: 35,
  },
  {
    id: "DEV009",
    name: "Sensor Lahan Kedelai E5",
    type: "sensor",
    location: "Lahan Kedelai Blok E5",
    status: "online",
    lastUpdate: "7 menit yang lalu",
    battery: 80,
    sensors: {
      temperature: 30,
      humidity: 65,
      soil: 45,
    },
  },
  {
    id: "DEV010",
    name: "Sensor Lahan Sayuran F6",
    type: "sensor",
    location: "Lahan Sayuran Blok F6",
    status: "offline",
    lastUpdate: "2 jam yang lalu",
    battery: 20,
    sensors: {
      temperature: 27,
      humidity: 70,
      soil: 50,
    },
  },
]

// Chart components
function TemperatureChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[25, 35]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#ef4444"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorTemperature)"
          name="Suhu (°C)"
          activeDot={{ r: 8 }}
          isAnimationActive={true}
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function HumidityChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[30, 80]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorHumidity)"
          name="Kelembaban (%)"
          activeDot={{ r: 8 }}
          isAnimationActive={true}
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function SoilMoistureChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorSoilMoisture" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[30, 60]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#22c55e"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorSoilMoisture)"
          name="Kelembaban Tanah (%)"
          activeDot={{ r: 8 }}
          isAnimationActive={true}
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function ProductionChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="padi" name="Padi" fill="#4ade80" stackId="a" isAnimationActive={true} animationDuration={1500} />
        <Bar
          dataKey="jagung"
          name="Jagung"
          fill="#facc15"
          stackId="a"
          isAnimationActive={true}
          animationDuration={1500}
        />
        <Bar
          dataKey="kedelai"
          name="Kedelai"
          fill="#60a5fa"
          stackId="a"
          isAnimationActive={true}
          animationDuration={1500}
        />
        <Bar
          dataKey="sayuran"
          name="Sayuran"
          fill="#a78bfa"
          stackId="a"
          isAnimationActive={true}
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

function RevenueChartComponent({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pendapatan"
          name="Pendapatan (Juta Rp)"
          stroke="#22c55e"
          strokeWidth={3}
          activeDot={{ r: 8 }}
          isAnimationActive={true}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

function CropDistributionChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          isAnimationActive={true}
          animationDuration={1500}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

function GrowthPhaseChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          isAnimationActive={true}
          animationDuration={1500}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default function Pertanian() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [fromDate, setFromDate] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [toDate, setToDate] = useState<Date>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setChartData({
        crops: [
          { name: "Padi", value: 45 },
          { name: "Jagung", value: 25 },
          { name: "Kedelai", value: 15 },
          { name: "Cabai", value: 10 },
          { name: "Lainnya", value: 5 },
        ],
        growth: [
          { date: "2023-01", padi: 100, jagung: 80, kedelai: 60 },
          { date: "2023-02", padi: 120, jagung: 90, kedelai: 70 },
          { date: "2023-03", padi: 150, jagung: 110, kedelai: 90 },
          { date: "2023-04", padi: 170, jagung: 130, kedelai: 100 },
          { date: "2023-05", padi: 200, jagung: 150, kedelai: 120 },
          { date: "2023-06", padi: 220, jagung: 170, kedelai: 130 },
        ],
        environmental: {
          temperature: [
            { date: "2023-01-01", value: 28 },
            { date: "2023-01-02", value: 29 },
            { date: "2023-01-03", value: 30 },
            { date: "2023-01-04", value: 29 },
            { date: "2023-01-05", value: 28 },
            { date: "2023-01-06", value: 27 },
            { date: "2023-01-07", value: 29 },
          ],
          humidity: [
            { date: "2023-01-01", value: 65 },
            { date: "2023-01-02", value: 68 },
            { date: "2023-01-03", value: 70 },
            { date: "2023-01-04", value: 72 },
            { date: "2023-01-05", value: 69 },
            { date: "2023-01-06", value: 67 },
            { date: "2023-01-07", value: 65 },
          ],
          soilNutrients: [
            { date: "2023-01-01", value: 75 },
            { date: "2023-01-02", value: 74 },
            { date: "2023-01-03", value: 72 },
            { date: "2023-01-04", value: 70 },
            { date: "2023-01-05", value: 73 },
            { date: "2023-01-06", value: 75 },
            { date: "2023-01-07", value: 76 },
          ],
        },
        production: [
          { month: "Jan", padi: 200, jagung: 150, kedelai: 100 },
          { month: "Feb", padi: 220, jagung: 160, kedelai: 110 },
          { month: "Mar", padi: 250, jagung: 180, kedelai: 130 },
          { month: "Apr", padi: 280, jagung: 200, kedelai: 150 },
          { month: "May", padi: 300, jagung: 220, kedelai: 170 },
          { month: "Jun", padi: 320, jagung: 240, kedelai: 190 },
        ],
        revenue: [
          { month: "Jan", value: 5000000 },
          { month: "Feb", value: 5500000 },
          { month: "Mar", value: 6200000 },
          { month: "Apr", value: 6800000 },
          { month: "May", value: 7500000 },
          { month: "Jun", value: 8200000 },
        ],
        incomeBreakdown: [
          { category: "Padi", value: 45000000 },
          { category: "Jagung", value: 25000000 },
          { category: "Kedelai", value: 15000000 },
          { category: "Cabai", value: 10000000 },
          { category: "Lainnya", value: 5000000 },
        ],
        incomeByLocation: [
          { location: "Jawa Barat", padi: 15000000, jagung: 8000000, kedelai: 5000000 },
          { location: "Jawa Tengah", padi: 12000000, jagung: 7000000, kedelai: 4000000 },
          { location: "Jawa Timur", padi: 18000000, jagung: 10000000, kedelai: 6000000 },
        ],
      })
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleExport = () => {
    alert("Exporting data...")
  }

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
                <h1 className="text-xl font-semibold">Pertanian</h1>
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
                    <h2 className="text-2xl font-bold tracking-tight">Manajemen Pertanian</h2>
                    <p className="text-muted-foreground">Pemantauan dan pengelolaan lahan pertanian</p>
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
                              <label htmlFor="tanaman">Tanaman</label>
                              <Select defaultValue="all">
                                <SelectTrigger id="tanaman" className="col-span-2 h-8">
                                  <SelectValue placeholder="Pilih tanaman" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">Semua Tanaman</SelectItem>
                                  <SelectItem value="padi">Padi</SelectItem>
                                  <SelectItem value="jagung">Jagung</SelectItem>
                                  <SelectItem value="kedelai">Kedelai</SelectItem>
                                  <SelectItem value="sayuran">Sayuran</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label htmlFor="lokasi">Lokasi</label>
                              <Select defaultValue="all">
                                <SelectTrigger id="lokasi" className="col-span-2 h-8">
                                  <SelectValue placeholder="Pilih lokasi" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">Semua Lokasi</SelectItem>
                                  <SelectItem value="a1">Blok A1</SelectItem>
                                  <SelectItem value="d4">Blok D4</SelectItem>
                                  <SelectItem value="e5">Blok E5</SelectItem>
                                  <SelectItem value="f6">Blok F6</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button size="sm">Terapkan Filter</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Download className="mr-2 h-4 w-4" />
                      Unduh Laporan
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Lahan</CardTitle>
                      <Leaf className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">120 Ha</div>
                      <div className="flex items-center pt-1">
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">+4% dari bulan lalu</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Produksi</CardTitle>
                      <Wheat className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,250 Ton</div>
                      <div className="flex items-center pt-1">
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">+8% dari bulan lalu</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Perangkat Aktif</CardTitle>
                      <Thermometer className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24 Unit</div>
                      <div className="flex items-center pt-1">
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">+2 unit dari bulan lalu</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Pendapatan</CardTitle>
                      <CircleDollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Rp 145 Jt</div>
                      <div className="flex items-center pt-1">
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">+12% dari bulan lalu</span>
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
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Distribusi Tanaman</CardTitle>
                          <CardDescription>Persentase lahan berdasarkan jenis tanaman</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <CropDistributionChart data={cropDistributionData} />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Fase Pertumbuhan</CardTitle>
                          <CardDescription>Distribusi fase pertumbuhan tanaman</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <GrowthPhaseChart data={growthPhaseData} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Status Lahan</CardTitle>
                        <CardDescription>Status lahan pertanian dan perkebunan</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b pb-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Padi</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
                                Fase Pertumbuhan
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">45 Ha</p>
                              <p className="text-xs text-muted-foreground">Estimasi panen: 15 Juni 2025</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-b pb-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Jagung</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500" />
                                Siap Panen
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">30 Ha</p>
                              <p className="text-xs text-muted-foreground">Estimasi panen: 10 April 2025</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-b pb-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Kedelai</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <div className="mr-1 h-2 w-2 rounded-full bg-blue-500" />
                                Baru Tanam
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">25 Ha</p>
                              <p className="text-xs text-muted-foreground">Estimasi panen: 20 Juli 2025</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Sayuran</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <div className="mr-1 h-2 w-2 rounded-full bg-purple-500" />
                                Fase Pertumbuhan
                              </div>
                            </div>
                            <p className="text-sm font-medium">20 Ha</p>
                            <p className="text-xs text-muted-foreground">Estimasi panen: 5 Mei 2025</p>
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
                              <CloudRain className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Kelembaban Tanah Rendah</p>
                                <p className="text-xs text-muted-foreground">5 jam yang lalu</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Kelembaban tanah di area pertanian jagung blok D4 di bawah 30%, sistem irigasi otomatis
                                diaktifkan.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-red-100 p-2">
                              <Bug className="h-4 w-4 text-red-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Hama Terdeteksi</p>
                                <p className="text-xs text-muted-foreground">1 hari yang lalu</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Terdeteksi serangan hama pada tanaman padi di blok A1, disarankan untuk melakukan
                                pengendalian segera.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-green-100 p-2">
                              <Sprout className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Fase Pertumbuhan Berubah</p>
                                <p className="text-xs text-muted-foreground">2 hari yang lalu</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Tanaman kedelai di blok E5 telah memasuki fase pembungaan, disarankan untuk menyesuaikan
                                jadwal pemupukan.
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

                  <TabsContent value="devices" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Perangkat Pertanian</CardTitle>
                            <CardDescription>Daftar perangkat yang terpasang di lahan pertanian</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                              <SelectTrigger className="w-[130px]">
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
                              <SelectTrigger className="w-[130px]">
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
                      </CardHeader>
                      <CardContent>
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
                                      <Microscope className="h-4 w-4 text-purple-600" />
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
                                      {device.sensors.soil && (
                                        <div className="flex items-center justify-between text-sm">
                                          <span className="text-muted-foreground">Kelembaban Tanah:</span>
                                          <span>{device.sensors.soil}%</span>
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
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Tambah Perangkat Baru
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Jadwal Pemeliharaan</CardTitle>
                        <CardDescription>Jadwal pemeliharaan perangkat pertanian</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-blue-100 p-2">
                              <Tractor className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Kalibrasi Sensor Kelembaban</p>
                                <Badge>Terjadwal</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Kalibrasi sensor kelembaban tanah di blok A1 dan D4
                              </p>
                              <p className="text-xs text-muted-foreground">Dijadwalkan: 15 April 2025</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-green-100 p-2">
                              <Shovel className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Penggantian Baterai</p>
                                <Badge variant="outline">Mendesak</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Penggantian baterai untuk sensor di blok F6
                              </p>
                              <p className="text-xs text-muted-foreground">Dijadwalkan: 10 April 2025</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-purple-100 p-2">
                              <Seedling className="h-4 w-4 text-purple-600" />
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

                  <TabsContent value="data" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Suhu Udara</CardTitle>
                          <CardDescription>Data suhu udara 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <TemperatureChart data={temperatureData} />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Kelembaban Udara</CardTitle>
                          <CardDescription>Data kelembaban udara 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <HumidityChart data={humidityData} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Kelembaban Tanah</CardTitle>
                        <CardDescription>Data kelembaban tanah 14 hari terakhir</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <SoilMoistureChart data={soilMoistureData} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Analisis Kondisi Tanah</CardTitle>
                        <CardDescription>Berdasarkan data sensor terbaru</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Kelembaban Tanah</span>
                              <span className="text-sm">
                                45% <span className="text-xs text-muted-foreground">(Optimal: 50-60%)</span>
                              </span>
                            </div>
                            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                              <div className="h-full w-[45%] rounded-full bg-amber-500" />
                              <div
                                className="absolute top-0 h-full w-1 rounded-full bg-white"
                                style={{ left: "50%" }}
                              />
                              <div
                                className="absolute top-0 h-full w-1 rounded-full bg-white"
                                style={{ left: "60%" }}
                              />
                            </div>
                            <p className="text-xs text-amber-600">
                              Kelembaban tanah sedikit di bawah optimal. Pertimbangkan untuk meningkatkan irigasi.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">pH Tanah</span>
                              <span className="text-sm">
                                6.5 <span className="text-xs text-muted-foreground">(Optimal: 6.0-7.0)</span>
                              </span>
                            </div>
                            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                              <div className="h-full w-[65%] rounded-full bg-green-500" />
                              <div
                                className="absolute top-0 h-full w-1 rounded-full bg-white"
                                style={{ left: "60%" }}
                              />
                              <div
                                className="absolute top-0 h-full w-1 rounded-full bg-white"
                                style={{ left: "70%" }}
                              />
                            </div>
                            <p className="text-xs text-green-600">pH tanah dalam rentang optimal.</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Nitrogen (N)</span>
                              <span className="text-sm">
                                65% <span className="text-xs text-muted-foreground">(Optimal: 70-80%)</span>
                              </span>
                            </div>
                            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                              <div className="h-full w-[65%] rounded-full bg-amber-500" />
                              <div
                                className="absolute top-0 h-full w-1 rounded-full bg-white"
                                style={{ left: "70%" }}
                              />
                              <div
                                className="absolute top-0 h-full w-1 rounded-full bg-white"
                                style={{ left: "80%" }}
                              />
                            </div>
                            <p className="text-xs text-amber-600">
                              Kadar nitrogen sedikit di bawah optimal. Pertimbangkan untuk menambah pupuk nitrogen.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Fosfor (P)</span>
                              <span className="text-sm">
                                75% <span className="text-xs text-muted-foreground">(Optimal: 60-70%)</span>
                              </span>
                            </div>
                            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                              <div className="h-full w-[75%] rounded-full bg-amber-500" />
                              <div
                                className="absolute top-0 h-full w-1 rounded-full bg-white"
                                style={{ left: "60%" }}
                              />
                              <div
                                className="absolute top-0 h-full w-1 rounded-full bg-white"
                                style={{ left: "70%" }}
                              />
                            </div>
                            <p className="text-xs text-amber-600">
                              Kadar fosfor sedikit di atas optimal. Tidak diperlukan penambahan pupuk fosfor.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex w-full gap-2">
                          <Button variant="outline" className="w-full">
                            Lihat Detail
                          </Button>
                          <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                            Rekomendasi Pupuk
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
