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
  TreesIcon as Plant,
  Settings,
  Beef,
  Users,
  MapPin,
  MapIcon,
  BarChart4,
  Layers,
  ZoomIn,
  ZoomOut,
  Locate,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

export default function Maps() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [fromDate, setFromDate] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [toDate, setToDate] = useState<Date>(new Date())

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
              <SidebarMenuButton asChild isActive>
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
      <div className="flex h-screen w-screen overflow-hidden bg-muted/20">
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
          <div className="absolute left-0 right-0 top-0 z-50 flex h-16 items-center justify-between bg-white px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <h1 className="text-xl font-semibold">Peta Lokasi</h1>
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

          {/* Full-size map container */}
          <div className="absolute inset-0 pt-16">
            {/* Map placeholder */}
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-16 w-16 text-green-600 opacity-20" />
                <h3 className="mt-4 text-lg font-medium">Peta Lokasi Perangkat</h3>
                <p className="mt-2 text-sm text-muted-foreground">Integrasi dengan Google Maps akan segera tersedia</p>
              </div>
            </div>

            {/* Map controls */}
            <div className="absolute right-4 top-20 flex flex-col gap-2">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white shadow-md">
                <ZoomIn className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white shadow-md">
                <ZoomOut className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white shadow-md">
                <Locate className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white shadow-md">
                <Layers className="h-5 w-5" />
              </Button>
            </div>

            {/* Map legend */}
            <div className="absolute bottom-4 left-4 rounded-lg bg-white p-3 shadow-md">
              <h4 className="mb-2 text-sm font-medium">Legenda</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Sensor Pertanian</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Sensor Perikanan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  <span className="text-xs">Sensor Peternakan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Perangkat Offline</span>
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
      </div>
    </SidebarProvider>
  )
}
