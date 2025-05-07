"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import {
  Activity,
  BarChart3,
  ChevronDown,
  CircleDollarSign,
  Droplets,
  Fish,
  Leaf,
  Menu,
  TreesIcon as Plant,
  Settings,
  Sun,
  Thermometer,
  Beef,
  Users,
  X,
  ArrowUpRight,
  Filter,
  Download,
  MapIcon,
  BarChart4,
  CalendarIcon,
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
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  PieChart,
  Pie as RechartsPie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import TimeSeriesChart from "@/components/time-series-chart"
import StockChart from "@/components/stock-chart"

// Dummy data for charts
const monthlyProductionData = [
  { month: "Jan", pertanian: 65, perikanan: 28, peternakan: 40 },
  { month: "Feb", pertanian: 59, perikanan: 32, peternakan: 43 },
  { month: "Mar", pertanian: 80, perikanan: 41, peternakan: 55 },
  { month: "Apr", pertanian: 81, perikanan: 39, peternakan: 52 },
  { month: "May", pertanian: 56, perikanan: 33, peternakan: 48 },
  { month: "Jun", pertanian: 55, perikanan: 27, peternakan: 42 },
  { month: "Jul", pertanian: 40, perikanan: 22, peternakan: 35 },
  { month: "Aug", pertanian: 45, perikanan: 20, peternakan: 38 },
  { month: "Sep", pertanian: 60, perikanan: 25, peternakan: 45 },
  { month: "Oct", pertanian: 75, perikanan: 35, peternakan: 50 },
  { month: "Nov", pertanian: 85, perikanan: 45, peternakan: 60 },
  { month: "Dec", pertanian: 90, perikanan: 50, peternakan: 65 },
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

const sectorDistributionData = [
  { name: "Pertanian", value: 45 },
  { name: "Perikanan", value: 25 },
  { name: "Peternakan", value: 30 },
]

const ProductionChart = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pertanian" stackId="a" fill="#82ca9d" />
        <Bar dataKey="perikanan" stackId="a" fill="#8884d8" />
        <Bar dataKey="peternakan" stackId="a" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [fromDate, setFromDate] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [toDate, setToDate] = useState<Date>(new Date())
  const [chartType, setChartType] = useState<"bar" | "line">("bar")
  const [chartYear, setChartYear] = useState<string>("2025")

  // Komponen menu untuk digunakan di sidebar dan sheet mobile
  const MenuItems = () => (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
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
                <h1 className="text-xl font-semibold">Dashboard</h1>
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
                    <h2 className="text-2xl font-bold tracking-tight">Ikhtisar</h2>
                    <p className="text-muted-foreground">Ringkasan data dari semua sektor</p>
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
                              <label htmlFor="sektor">Sektor</label>
                              <Select defaultValue="all">
                                <SelectTrigger id="sektor" className="col-span-2 h-8">
                                  <SelectValue placeholder="Pilih sektor" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">Semua Sektor</SelectItem>
                                  <SelectItem value="pertanian">Pertanian</SelectItem>
                                  <SelectItem value="perikanan">Perikanan</SelectItem>
                                  <SelectItem value="peternakan">Peternakan</SelectItem>
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
                                  <SelectItem value="b2">Blok B2</SelectItem>
                                  <SelectItem value="c3">Blok C3</SelectItem>
                                  <SelectItem value="d4">Blok D4</SelectItem>
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
                      <CardTitle className="text-sm font-medium">Kolam Aktif</CardTitle>
                      <Fish className="h-4 w-4 text-blue-600" />
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
                      <CardTitle className="text-sm font-medium">Ternak Aktif</CardTitle>
                      <Beef className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,240 Ekor</div>
                      <div className="flex items-center pt-1">
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">+120 dari bulan lalu</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Pendapatan</CardTitle>
                      <CircleDollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Rp 245 Jt</div>
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
                    <TabsTrigger value="production">Produksi</TabsTrigger>
                    <TabsTrigger value="revenue">Pendapatan</TabsTrigger>
                    <TabsTrigger value="distribution">Distribusi</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Produktivitas Bulanan</CardTitle>
                            <CardDescription>Perbandingan hasil produksi 3 sektor</CardDescription>
                          </div>
                          <Select defaultValue="2025" onValueChange={(value) => setChartYear(value)}>
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
                        <StockChart selectedYear={chartYear} />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Status Perangkat IoT</CardTitle>
                        <CardDescription>Pemantauan perangkat aktif</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center gap-3">
                              <div className="rounded-full bg-green-100 p-2">
                                <Thermometer className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium">Sensor Suhu</p>
                                <p className="text-xs text-muted-foreground">42 perangkat aktif</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-green-600">98%</span>
                              <div className="h-2 w-16 rounded-full bg-muted">
                                <div className="h-full w-[98%] rounded-full bg-green-600" />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center gap-3">
                              <div className="rounded-full bg-blue-100 p-2">
                                <Droplets className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">Sensor Kelembaban</p>
                                <p className="text-xs text-muted-foreground">36 perangkat aktif</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-green-600">95%</span>
                              <div className="h-2 w-16 rounded-full bg-muted">
                                <div className="h-full w-[95%] rounded-full bg-green-600" />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center gap-3">
                              <div className="rounded-full bg-yellow-100 p-2">
                                <Sun className="h-4 w-4 text-yellow-600" />
                              </div>
                              <div>
                                <p className="font-medium">Sensor Cahaya</p>
                                <p className="text-xs text-muted-foreground">28 perangkat aktif</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-yellow-600">86%</span>
                              <div className="h-2 w-16 rounded-full bg-muted">
                                <div className="h-full w-[86%] rounded-full bg-yellow-600" />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="rounded-full bg-purple-100 p-2">
                                <Activity className="h-4 w-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium">Sensor Aktivitas</p>
                                <p className="text-xs text-muted-foreground">18 perangkat aktif</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-purple-600">92%</span>
                              <div className="h-2 w-16 rounded-full bg-muted">
                                <div className="h-full w-[92%] rounded-full bg-purple-600" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          <Link href="/monitoring" className="flex w-full items-center justify-center">
                            Lihat Semua Perangkat
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <CardTitle>Pertanian</CardTitle>
                          <CardDescription>Status lahan pertanian dan perkebunan</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Padi</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
                                  Fase Pertumbuhan
                                </div>
                              </div>
                              <p className="text-sm font-medium">45 Ha</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Jagung</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500" />
                                  Siap Panen
                                </div>
                              </div>
                              <p className="text-sm font-medium">30 Ha</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Kedelai</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <div className="mr-1 h-2 w-2 rounded-full bg-blue-500" />
                                  Baru Tanam
                                </div>
                              </div>
                              <p className="text-sm font-medium">25 Ha</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Sayuran</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
                                  Fase Pertumbuhan
                                </div>
                              </div>
                              <p className="text-sm font-medium">20 Ha</p>
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
                          <CardTitle>Perikanan</CardTitle>
                          <CardDescription>Status kolam dan budidaya ikan</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Lele</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
                                  Pertumbuhan Optimal
                                </div>
                              </div>
                              <p className="text-sm font-medium">8 Kolam</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Nila</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500" />
                                  Siap Panen
                                </div>
                              </div>
                              <p className="text-sm font-medium">6 Kolam</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Gurame</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <div className="mr-1 h-2 w-2 rounded-full bg-blue-500" />
                                  Baru Tebar Benih
                                </div>
                              </div>
                              <p className="text-sm font-medium">5 Kolam</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Patin</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
                                  Pertumbuhan Optimal
                                </div>
                              </div>
                              <p className="text-sm font-medium">5 Kolam</p>
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
                          <CardTitle>Peternakan</CardTitle>
                          <CardDescription>Status kandang dan ternak</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Ayam Broiler</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
                                  Pertumbuhan Optimal
                                </div>
                              </div>
                              <p className="text-sm font-medium">800 Ekor</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Ayam Petelur</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
                                  Produksi Normal
                                </div>
                              </div>
                              <p className="text-sm font-medium">250 Ekor</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Kambing</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500" />
                                  Pemantauan Kesehatan
                                </div>
                              </div>
                              <p className="text-sm font-medium">120 Ekor</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Sapi</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
                                  Pertumbuhan Optimal
                                </div>
                              </div>
                              <p className="text-sm font-medium">70 Ekor</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            Lihat Detail
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Peringatan Terbaru</CardTitle>
                        <CardDescription>Notifikasi dan peringatan dari sistem</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-yellow-100 p-2">
                              <Thermometer className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Suhu Kolam Ikan Nila Tinggi</p>
                                <p className="text-xs text-muted-foreground">2 jam yang lalu</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Suhu kolam ikan nila di area B2 mencapai 32°C, melebihi batas normal 28°C.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-blue-100 p-2">
                              <Droplets className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Kelembaban Tanah Rendah</p>
                                <p className="text-xs text-muted-foreground">5 jam yang lalu</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Kelembaban tanah di area pertanian jagung blok C3 di bawah 30%, sistem irigasi otomatis
                                diaktifkan.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-green-100 p-2">
                              <Activity className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Aktivitas Ternak Menurun</p>
                                <p className="text-xs text-muted-foreground">1 hari yang lalu</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Terdeteksi penurunan aktivitas pada kandang sapi nomor 3, pemeriksaan kesehatan
                                dijadwalkan.
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

                  <TabsContent value="production" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Produktivitas Bulanan</CardTitle>
                            <CardDescription>Total hasil produksi 3 sektor</CardDescription>
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
                        <TimeSeriesChart />
                      </CardContent>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <CardTitle>Detail Produksi Pertanian</CardTitle>
                          <CardDescription>Produksi per komoditas (ton)</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <span className="text-sm font-medium">Padi</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">45 Ton</span>
                                <Badge variant="outline" className="text-xs">
                                  +10%
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                <span className="text-sm font-medium">Jagung</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">30 Ton</span>
                                <Badge variant="outline" className="text-xs">
                                  +5%
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                <span className="text-sm font-medium">Kedelai</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">25 Ton</span>
                                <Badge variant="outline" className="text-xs">
                                  +8%
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                                <span className="text-sm font-medium">Sayuran</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">20 Ton</span>
                                <Badge variant="outline" className="text-xs">
                                  +12%
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Detail Produksi Perikanan</CardTitle>
                          <CardDescription>Produksi per jenis ikan (ton)</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                                <span className="text-sm font-medium">Lele</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">15 Ton</span>
                                <Badge variant="outline" className="text-xs">
                                  +7%
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                                <span className="text-sm font-medium">Nila</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">12 Ton</span>
                                <Badge variant="outline" className="text-xs">
                                  +4%
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-cyan-500"></div>
                                <span className="text-sm font-medium">Gurame</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">10 Ton</span>
                                <Badge variant="outline" className="text-xs">
                                  +3%
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-teal-500"></div>
                                <span className="text-sm font-medium">Patin</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">8 Ton</span>
                                <Badge variant="outline" className="text-xs">
                                  +6%
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="revenue">
                    <Card>
                      <CardHeader>
                        <CardTitle>Grafik Pendapatan Bulanan</CardTitle>
                        <CardDescription>Tren pendapatan dari waktu ke waktu</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[350px] w-full">
                          <ResponsiveContainer width="100%" height={350}>
                            <RechartsLineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="pendapatan" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </RechartsLineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="distribution">
                    <Card>
                      <CardHeader>
                        <CardTitle>Distribusi Sektor</CardTitle>
                        <CardDescription>Proporsi kontribusi masing-masing sektor</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[350px] w-full">
                          <ResponsiveContainer width="100%" height={350}>
                            <PieChart>
                              <RechartsPie
                                dataKey="value"
                                isAnimationActive={false}
                                data={sectorDistributionData}
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                fill="#8884d8"
                                label
                              />
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
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
