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
  Thermometer,
  Beef,
  Users,
  X,
  Download,
  LineChart,
  MapIcon,
  BarChart4,
  Filter,
  Droplets,
  Microscope,
  AlertTriangle,
  Brain,
  Sprout,
  Bug,
  Pill,
  HeartPulse,
  Stethoscope,
  Milk,
  Egg,
  BugIcon as Bacteria,
  WormIcon as Virus,
  TreesIcon as Lungs,
  ScaleIcon as Scales,
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
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Progress } from "@/components/ui/progress"

// Define types for chart data
type ChartDataPoint = {
  date: string
  value: number
}

// Dummy data for charts
const temperatureData: ChartDataPoint[] = [
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

const humidityData: ChartDataPoint[] = [
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

const lightData: ChartDataPoint[] = [
  { date: "01/03", value: 850 },
  { date: "02/03", value: 870 },
  { date: "03/03", value: 890 },
  { date: "04/03", value: 920 },
  { date: "05/03", value: 950 },
  { date: "06/03", value: 930 },
  { date: "07/03", value: 910 },
  { date: "08/03", value: 890 },
  { date: "09/03", value: 870 },
  { date: "10/03", value: 880 },
  { date: "11/03", value: 900 },
  { date: "12/03", value: 920 },
  { date: "13/03", value: 940 },
  { date: "14/03", value: 930 },
]

// Soil sensor data
const soilMoistureData: ChartDataPoint[] = [
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

const soilTemperatureData: ChartDataPoint[] = [
  { date: "01/03", value: 24 },
  { date: "02/03", value: 25 },
  { date: "03/03", value: 26 },
  { date: "04/03", value: 27 },
  { date: "05/03", value: 28 },
  { date: "06/03", value: 27 },
  { date: "07/03", value: 26 },
  { date: "08/03", value: 25 },
  { date: "09/03", value: 24 },
  { date: "10/03", value: 25 },
  { date: "11/03", value: 26 },
  { date: "12/03", value: 27 },
  { date: "13/03", value: 28 },
  { date: "14/03", value: 27 },
]

const soilPhData: ChartDataPoint[] = [
  { date: "01/03", value: 6.5 },
  { date: "02/03", value: 6.6 },
  { date: "03/03", value: 6.7 },
  { date: "04/03", value: 6.8 },
  { date: "05/03", value: 6.7 },
  { date: "06/03", value: 6.6 },
  { date: "07/03", value: 6.5 },
  { date: "08/03", value: 6.4 },
  { date: "09/03", value: 6.3 },
  { date: "10/03", value: 6.4 },
  { date: "11/03", value: 6.5 },
  { date: "12/03", value: 6.6 },
  { date: "13/03", value: 6.7 },
  { date: "14/03", value: 6.6 },
]

const ecData: ChartDataPoint[] = [
  { date: "01/03", value: 1.2 },
  { date: "02/03", value: 1.3 },
  { date: "03/03", value: 1.4 },
  { date: "04/03", value: 1.5 },
  { date: "05/03", value: 1.4 },
  { date: "06/03", value: 1.3 },
  { date: "07/03", value: 1.2 },
  { date: "08/03", value: 1.1 },
  { date: "09/03", value: 1.0 },
  { date: "10/03", value: 1.1 },
  { date: "11/03", value: 1.2 },
  { date: "12/03", value: 1.3 },
  { date: "13/03", value: 1.4 },
  { date: "14/03", value: 1.3 },
]

// Fishery sensor data
const waterTemperatureData: ChartDataPoint[] = [
  { date: "01/03", value: 26 },
  { date: "02/03", value: 26.5 },
  { date: "03/03", value: 27 },
  { date: "04/03", value: 27.5 },
  { date: "05/03", value: 28 },
  { date: "06/03", value: 28.5 },
  { date: "07/03", value: 29 },
  { date: "08/03", value: 29.5 },
  { date: "09/03", value: 30 },
  { date: "10/03", value: 29.5 },
  { date: "11/03", value: 29 },
  { date: "12/03", value: 28.5 },
  { date: "13/03", value: 28 },
  { date: "14/03", value: 27.5 },
]

const dissolvedOxygenData: ChartDataPoint[] = [
  { date: "01/03", value: 5.8 },
  { date: "02/03", value: 5.7 },
  { date: "03/03", value: 5.6 },
  { date: "04/03", value: 5.5 },
  { date: "05/03", value: 5.4 },
  { date: "06/03", value: 5.3 },
  { date: "07/03", value: 5.2 },
  { date: "08/03", value: 5.1 },
  { date: "09/03", value: 5.0 },
  { date: "10/03", value: 5.1 },
  { date: "11/03", value: 5.2 },
  { date: "12/03", value: 5.3 },
  { date: "13/03", value: 5.4 },
  { date: "14/03", value: 5.5 },
]

const waterPhData: ChartDataPoint[] = [
  { date: "01/03", value: 7.0 },
  { date: "02/03", value: 7.1 },
  { date: "03/03", value: 7.2 },
  { date: "04/03", value: 7.3 },
  { date: "05/03", value: 7.4 },
  { date: "06/03", value: 7.3 },
  { date: "07/03", value: 7.2 },
  { date: "08/03", value: 7.1 },
  { date: "09/03", value: 7.0 },
  { date: "10/03", value: 6.9 },
  { date: "11/03", value: 6.8 },
  { date: "12/03", value: 6.9 },
  { date: "13/03", value: 7.0 },
  { date: "14/03", value: 7.1 },
]

const ammoniaData: ChartDataPoint[] = [
  { date: "01/03", value: 0.2 },
  { date: "02/03", value: 0.25 },
  { date: "03/03", value: 0.3 },
  { date: "04/03", value: 0.35 },
  { date: "05/03", value: 0.4 },
  { date: "06/03", value: 0.45 },
  { date: "07/03", value: 0.5 },
  { date: "08/03", value: 0.45 },
  { date: "09/03", value: 0.4 },
  { date: "10/03", value: 0.35 },
  { date: "11/03", value: 0.3 },
  { date: "12/03", value: 0.25 },
  { date: "13/03", value: 0.2 },
  { date: "14/03", value: 0.15 },
]

// Livestock sensor data
const airQualityData: ChartDataPoint[] = [
  { date: "01/03", value: 85 },
  { date: "02/03", value: 83 },
  { date: "03/03", value: 80 },
  { date: "04/03", value: 78 },
  { date: "05/03", value: 75 },
  { date: "06/03", value: 73 },
  { date: "07/03", value: 70 },
  { date: "08/03", value: 72 },
  { date: "09/03", value: 75 },
  { date: "10/03", value: 78 },
  { date: "11/03", value: 80 },
  { date: "12/03", value: 82 },
  { date: "13/03", value: 85 },
  { date: "14/03", value: 87 },
]

const livestockActivityData: ChartDataPoint[] = [
  { date: "01/03", value: 65 },
  { date: "02/03", value: 68 },
  { date: "03/03", value: 70 },
  { date: "04/03", value: 72 },
  { date: "05/03", value: 75 },
  { date: "06/03", value: 78 },
  { date: "07/03", value: 80 },
  { date: "08/03", value: 82 },
  { date: "09/03", value: 85 },
  { date: "10/03", value: 82 },
  { date: "11/03", value: 80 },
  { date: "12/03", value: 78 },
  { date: "13/03", value: 75 },
  { date: "14/03", value: 72 },
]

const feedConsumptionData: ChartDataPoint[] = [
  { date: "01/03", value: 120 },
  { date: "02/03", value: 125 },
  { date: "03/03", value: 130 },
  { date: "04/03", value: 135 },
  { date: "05/03", value: 140 },
  { date: "06/03", value: 145 },
  { date: "07/03", value: 150 },
  { date: "08/03", value: 145 },
  { date: "09/03", value: 140 },
  { date: "10/03", value: 135 },
  { date: "11/03", value: 130 },
  { date: "12/03", value: 125 },
  { date: "13/03", value: 120 },
  { date: "14/03", value: 115 },
]

const weightGainData: ChartDataPoint[] = [
  { date: "01/03", value: 0.8 },
  { date: "02/03", value: 0.85 },
  { date: "03/03", value: 0.9 },
  { date: "04/03", value: 0.95 },
  { date: "05/03", value: 1.0 },
  { date: "06/03", value: 1.05 },
  { date: "07/03", value: 1.1 },
  { date: "08/03", value: 1.15 },
  { date: "09/03", value: 1.2 },
  { date: "10/03", value: 1.25 },
  { date: "11/03", value: 1.3 },
  { date: "12/03", value: 1.35 },
  { date: "13/03", value: 1.4 },
  { date: "14/03", value: 1.45 },
]

// Deep learning data
const growthPhaseData = [
  { name: "Perkecambahan", value: 15 },
  { name: "Pertumbuhan Vegetatif", value: 35 },
  { name: "Pembungaan", value: 30 },
  { name: "Pembuahan", value: 20 },
]

const diseaseDetectionData = [
  { name: "Sehat", value: 75 },
  { name: "Bercak Daun", value: 10 },
  { name: "Karat", value: 8 },
  { name: "Busuk Akar", value: 7 },
]

const fishDiseaseDetectionData = [
  { name: "Sehat", value: 70 },
  { name: "Jamur", value: 12 },
  { name: "Parasit", value: 10 },
  { name: "Bakteri", value: 8 },
]

const livestockHealthData = [
  { name: "Sehat", value: 82 },
  { name: "Infeksi Ringan", value: 8 },
  { name: "Masalah Pencernaan", value: 6 },
  { name: "Masalah Pernapasan", value: 4 },
]

const fishGrowthPredictionData = [
  { name: "Lele", current: 85, target: 100 },
  { name: "Nila", current: 92, target: 100 },
  { name: "Gurame", current: 78, target: 100 },
  { name: "Patin", current: 88, target: 100 },
]

const livestockProductivityData = [
  { subject: "Kesehatan", A: 85, B: 90, fullMark: 100 },
  { subject: "Pertumbuhan", A: 80, B: 85, fullMark: 100 },
  { subject: "Reproduksi", A: 75, B: 80, fullMark: 100 },
  { subject: "Produksi Susu", A: 90, B: 95, fullMark: 100 },
  { subject: "Produksi Telur", A: 85, B: 90, fullMark: 100 },
  { subject: "Efisiensi Pakan", A: 80, B: 85, fullMark: 100 },
]

const nutrientData = [
  { name: "Nitrogen (N)", value: 65, optimal: 70, color: "#4ade80" },
  { name: "Fosfor (P)", value: 45, optimal: 60, color: "#60a5fa" },
  { name: "Kalium (K)", value: 80, optimal: 75, color: "#f97316" },
  { name: "Kalsium (Ca)", value: 55, optimal: 65, color: "#a78bfa" },
  { name: "Magnesium (Mg)", value: 60, optimal: 55, color: "#fbbf24" },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// Chart components with proper TypeScript typing
function TemperatureChart({ data }: { data: ChartDataPoint[] }) {
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
          fillOpacity={1}
          fill="url(#colorTemperature)"
          name="Suhu (°C)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function HumidityChart({ data }: { data: ChartDataPoint[] }) {
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
          fillOpacity={1}
          fill="url(#colorHumidity)"
          name="Kelembaban (%)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function SoilMoistureChart({ data }: { data: ChartDataPoint[] }) {
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
          fillOpacity={1}
          fill="url(#colorSoilMoisture)"
          name="Kelembaban Tanah (%)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function SoilTemperatureChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorSoilTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[20, 30]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#f97316"
          fillOpacity={1}
          fill="url(#colorSoilTemp)"
          name="Suhu Tanah (°C)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function SoilPhChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorSoilPh" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[5.5, 7.5]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#a855f7"
          fillOpacity={1}
          fill="url(#colorSoilPh)"
          name="pH Tanah"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function ECChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorEC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[0.5, 2]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="value" stroke="#facc15" fillOpacity={1} fill="url(#colorEC)" name="EC (mS/cm)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function WaterTemperatureChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorWaterTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[25, 31]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#0ea5e9"
          fillOpacity={1}
          fill="url(#colorWaterTemp)"
          name="Suhu Air (°C)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function DissolvedOxygenChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorDO" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[4.5, 6.5]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#06b6d4"
          fillOpacity={1}
          fill="url(#colorDO)"
          name="Oksigen Terlarut (mg/L)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function WaterPhChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorWaterPh" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[6.5, 7.5]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#6366f1"
          fillOpacity={1}
          fill="url(#colorWaterPh)"
          name="pH Air"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function AmmoniaChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorAmmonia" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[0, 0.6]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#8b5cf6"
          fillOpacity={1}
          fill="url(#colorAmmonia)"
          name="Amonia (mg/L)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function AirQualityChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorAirQuality" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[65, 95]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#10b981"
          fillOpacity={1}
          fill="url(#colorAirQuality)"
          name="Kualitas Udara (%)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function LivestockActivityChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[60, 90]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#f43f5e"
          fillOpacity={1}
          fill="url(#colorActivity)"
          name="Aktivitas (%)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function FeedConsumptionChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorFeed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d97706" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[100, 160]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#d97706"
          fillOpacity={1}
          fill="url(#colorFeed)"
          name="Konsumsi Pakan (kg)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function WeightGainChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0369a1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0369a1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[0.5, 1.5]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#0369a1"
          fillOpacity={1}
          fill="url(#colorWeight)"
          name="Pertambahan Berat (kg/hari)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function PieChartWithCustomizedLabel({ data }: { data: any[] }) {
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
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
      </PieChart>
    </ResponsiveContainer>
  )
}

function LivestockRadarChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius={80} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Saat Ini" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="Target" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        <Legend />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  )
}

function LightChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={[800, 1000]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#eab308"
          fillOpacity={1}
          fill="url(#colorLight)"
          name="Intensitas Cahaya (lux)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default function Analysis() {
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
              <SidebarMenuButton asChild>
                <Link href="/maps">
                  <MapIcon className="h-4 w-4" />
                  <span>Peta Lokasi</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
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
                <h1 className="text-xl font-semibold">Analisis Data</h1>
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
                    <h2 className="text-2xl font-bold tracking-tight">Analisis Data Perangkat</h2>
                    <p className="text-muted-foreground">Visualisasi data dari sensor dan kamera</p>
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
                              <label htmlFor="perangkat">Perangkat</label>
                              <Select defaultValue="all">
                                <SelectTrigger id="perangkat" className="col-span-2 h-8">
                                  <SelectValue placeholder="Pilih perangkat" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">Semua Perangkat</SelectItem>
                                  <SelectItem value="DEV001">Sensor Lahan Padi A1</SelectItem>
                                  <SelectItem value="DEV003">Sensor Kolam Ikan B2</SelectItem>
                                  <SelectItem value="DEV005">Sensor Kandang Sapi C3</SelectItem>
                                  <SelectItem value="DEV007">Sensor Lahan Jagung D4</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label htmlFor="tipe">Tipe Data</label>
                              <Select defaultValue="all">
                                <SelectTrigger id="tipe" className="col-span-2 h-8">
                                  <SelectValue placeholder="Pilih tipe data" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">Semua Tipe</SelectItem>
                                  <SelectItem value="temperature">Suhu</SelectItem>
                                  <SelectItem value="humidity">Kelembaban</SelectItem>
                                  <SelectItem value="soil">Tanah</SelectItem>
                                  <SelectItem value="ai">AI/Deep Learning</SelectItem>
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
                      <CardTitle className="text-sm font-medium">Suhu Rata-rata</CardTitle>
                      <Thermometer className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">29.4°C</div>
                      <p className="text-xs text-muted-foreground">Rata-rata 14 hari terakhir</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Kelembaban Rata-rata</CardTitle>
                      <Droplets className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">70.2%</div>
                      <p className="text-xs text-muted-foreground">Rata-rata 14 hari terakhir</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Akurasi AI</CardTitle>
                      <Brain className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">94.5%</div>
                      <p className="text-xs text-muted-foreground">Akurasi model deep learning</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Prediksi Panen</CardTitle>
                      <LineChart className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+12%</div>
                      <p className="text-xs text-muted-foreground">Dibanding musim sebelumnya</p>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="environment" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="environment">Lingkungan</TabsTrigger>
                    <TabsTrigger value="soil">Pertanian</TabsTrigger>
                    <TabsTrigger value="fishery">Perikanan</TabsTrigger>
                    <TabsTrigger value="livestock">Peternakan</TabsTrigger>
                  </TabsList>

                  <TabsContent value="environment" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Grafik Suhu</CardTitle>
                            <CardDescription>Data suhu 14 hari terakhir</CardDescription>
                          </div>
                          <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Pilih Perangkat" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Semua Perangkat</SelectItem>
                              <SelectItem value="DEV001">Sensor Lahan Padi A1</SelectItem>
                              <SelectItem value="DEV003">Sensor Kolam Ikan B2</SelectItem>
                              <SelectItem value="DEV005">Sensor Kandang Sapi C3</SelectItem>
                              <SelectItem value="DEV007">Sensor Lahan Jagung D4</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[350px] w-full">
                          <TemperatureChart data={temperatureData} />
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Grafik Kelembaban</CardTitle>
                          <CardDescription>Data kelembaban 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <HumidityChart data={humidityData} />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Grafik Intensitas Cahaya</CardTitle>
                          <CardDescription>Data intensitas cahaya 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <LightChart data={lightData} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Data Lingkungan Terbaru</CardTitle>
                        <CardDescription>Pembacaan sensor terbaru dari semua lokasi</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b pb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-green-500"></div>
                              <span className="text-sm font-medium">Sensor Lahan Padi A1</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Thermometer className="h-4 w-4 text-red-500" />
                                <span className="text-sm">28°C</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Droplets className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">75%</span>
                              </div>
                              <span className="text-xs text-muted-foreground">2 menit yang lalu</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-b pb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                              <span className="text-sm font-medium">Sensor Kolam Ikan B2</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Thermometer className="h-4 w-4 text-red-500" />
                                <span className="text-sm">32°C</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Droplets className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">90%</span>
                              </div>
                              <span className="text-xs text-muted-foreground">10 menit yang lalu</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-b pb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                              <span className="text-sm font-medium">Sensor Kandang Sapi C3</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Thermometer className="h-4 w-4 text-red-500" />
                                <span className="text-sm">30°C</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Droplets className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">65%</span>
                              </div>
                              <span className="text-xs text-muted-foreground">15 menit yang lalu</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                              <span className="text-sm font-medium">Sensor Lahan Jagung D4</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Thermometer className="h-4 w-4 text-red-500" />
                                <span className="text-sm">29°C</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Droplets className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">60%</span>
                              </div>
                              <span className="text-xs text-muted-foreground">3 menit yang lalu</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Lihat Semua Data
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="soil" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
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
                          <CardTitle>Suhu Tanah</CardTitle>
                          <CardDescription>Data suhu tanah 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <SoilTemperatureChart data={soilTemperatureData} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Keasaman Tanah (pH)</CardTitle>
                          <CardDescription>Data pH tanah 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <SoilPhChart data={soilPhData} />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Electrical Conductivity (EC)</CardTitle>
                          <CardDescription>Data EC tanah 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <ECChart data={ecData} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Kandungan Nutrisi Tanah</CardTitle>
                        <CardDescription>Persentase kandungan nutrisi dalam tanah</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {nutrientData.map((nutrient) => (
                            <div key={nutrient.name} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{nutrient.name}</span>
                                <span className="text-sm">
                                  {nutrient.value}% (Optimal: {nutrient.optimal}%)
                                </span>
                              </div>
                              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${nutrient.value}%`,
                                    backgroundColor: nutrient.color,
                                  }}
                                />
                                <div
                                  className="absolute top-0 h-full w-1 rounded-full bg-white"
                                  style={{ left: `${nutrient.optimal}%` }}
                                />
                              </div>
                            </div>
                          ))}
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

                    {/* Konten dari tab AI & Deep Learning */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Fase Pertumbuhan Tanaman</CardTitle>
                          <CardDescription>Analisis fase pertumbuhan tanaman</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <PieChartWithCustomizedLabel data={growthPhaseData} />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Deteksi Penyakit Tanaman</CardTitle>
                          <CardDescription>Analisis kesehatan tanaman</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <PieChartWithCustomizedLabel data={diseaseDetectionData} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Prediksi Hasil Panen</CardTitle>
                        <CardDescription>Berdasarkan analisis deep learning</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="rounded-lg border bg-card p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Sprout className="h-5 w-5 text-green-600" />
                                <span className="font-medium">Padi</span>
                              </div>
                              <Badge className="bg-green-600">+15% dari prediksi awal</Badge>
                            </div>
                            <div className="mt-4 space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Prediksi Hasil:</span>
                                <span className="font-medium">5.8 ton/ha</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Waktu Panen:</span>
                                <span className="font-medium">15 Juni 2025</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Tingkat Keyakinan:</span>
                                <span className="font-medium">92%</span>
                              </div>
                            </div>
                            <Progress className="mt-4" value={75} />
                            <p className="mt-2 text-xs text-muted-foreground">
                              75% dari siklus pertumbuhan telah selesai
                            </p>
                          </div>

                          <div className="rounded-lg border bg-card p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Sprout className="h-5 w-5 text-yellow-600" />
                                <span className="font-medium">Jagung</span>
                              </div>
                              <Badge className="bg-yellow-600">+8% dari prediksi awal</Badge>
                            </div>
                            <div className="mt-4 space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Prediksi Hasil:</span>
                                <span className="font-medium">7.2 ton/ha</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Waktu Panen:</span>
                                <span className="font-medium">10 Juli 2025</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Tingkat Keyakinan:</span>
                                <span className="font-medium">89%</span>
                              </div>
                            </div>
                            <Progress className="mt-4" value={60} />
                            <p className="mt-2 text-xs text-muted-foreground">
                              60% dari siklus pertumbuhan telah selesai
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Lihat Semua Prediksi
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Deteksi Penyakit Terbaru</CardTitle>
                        <CardDescription>Hasil analisis gambar dengan deep learning</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-yellow-100 p-2">
                              <Bug className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Bercak Daun Terdeteksi</p>
                                <Badge variant="outline">Tingkat Rendah</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Terdeteksi bercak daun pada tanaman padi di area A1. Disarankan untuk melakukan
                                pemantauan lebih lanjut.
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Microscope className="mr-1 h-3 w-3" />
                                  Detail
                                </Button>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <Pill className="mr-1 h-3 w-3" />
                                  Rekomendasi Penanganan
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="rounded-full bg-red-100 p-2">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Busuk Akar Terdeteksi</p>
                                <Badge variant="destructive">Tingkat Sedang</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Terdeteksi busuk akar pada tanaman jagung di area D4. Diperlukan tindakan segera untuk
                                mencegah penyebaran.
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Microscope className="mr-1 h-3 w-3" />
                                  Detail
                                </Button>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <Pill className="mr-1 h-3 w-3" />
                                  Rekomendasi Penanganan
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Lihat Semua Deteksi
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="fishery" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Suhu Air</CardTitle>
                          <CardDescription>Data suhu air kolam 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <WaterTemperatureChart data={waterTemperatureData} />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Oksigen Terlarut</CardTitle>
                          <CardDescription>Data oksigen terlarut 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <DissolvedOxygenChart data={dissolvedOxygenData} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>pH Air</CardTitle>
                          <CardDescription>Data pH air kolam 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <WaterPhChart data={waterPhData} />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Kadar Amonia</CardTitle>
                          <CardDescription>Data kadar amonia 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <AmmoniaChart data={ammoniaData} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Prediksi Pertumbuhan Ikan</CardTitle>
                        <CardDescription>Berdasarkan analisis deep learning</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {fishGrowthPredictionData.map((fish) => (
                            <div key={fish.name} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Fish className="h-4 w-4 text-blue-500" />
                                  <span className="text-sm font-medium">{fish.name}</span>
                                </div>
                                <span className="text-sm">{fish.current}% dari target</span>
                              </div>
                              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-blue-500"
                                  style={{ width: `${fish.current}%` }}
                                />
                                <div
                                  className="absolute top-0 h-full w-1 rounded-full bg-white"
                                  style={{ left: `${fish.target}%` }}
                                />
                              </div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>
                                  Estimasi panen:{" "}
                                  {fish.name === "Lele"
                                    ? "45"
                                    : fish.name === "Nila"
                                      ? "60"
                                      : fish.name === "Gurame"
                                        ? "90"
                                        : "75"}{" "}
                                  hari lagi
                                </span>
                                <span>
                                  Berat rata-rata:{" "}
                                  {fish.name === "Lele"
                                    ? "250"
                                    : fish.name === "Nila"
                                      ? "300"
                                      : fish.name === "Gurame"
                                        ? "450"
                                        : "400"}{" "}
                                  gram
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex w-full gap-2">
                          <Button variant="outline" className="w-full">
                            Lihat Detail
                          </Button>
                          <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
                            Rekomendasi Pakan
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Deteksi Penyakit Ikan</CardTitle>
                        <CardDescription>Hasil analisis gambar dengan deep learning</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="h-[300px]">
                            <PieChartWithCustomizedLabel data={fishDiseaseDetectionData} />
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-start gap-4 rounded-lg border p-4">
                              <div className="rounded-full bg-yellow-100 p-2">
                                <Bacteria className="h-4 w-4 text-yellow-600" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium">Jamur Terdeteksi</p>
                                  <Badge variant="outline">Tingkat Rendah</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Terdeteksi jamur pada ikan nila di kolam B2. Disarankan untuk melakukan pemantauan
                                  lebih lanjut.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-4 rounded-lg border p-4">
                              <div className="rounded-full bg-red-100 p-2">
                                <Virus className="h-4 w-4 text-red-600" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium">Parasit Terdeteksi</p>
                                  <Badge variant="destructive">Tingkat Sedang</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Terdeteksi parasit pada ikan lele di kolam A3. Diperlukan tindakan segera untuk
                                  mencegah penyebaran.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Lihat Semua Deteksi
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="livestock" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Kualitas Udara Kandang</CardTitle>
                          <CardDescription>Data kualitas udara 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <AirQualityChart data={airQualityData} />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Aktivitas Ternak</CardTitle>
                          <CardDescription>Data aktivitas ternak 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <LivestockActivityChart data={livestockActivityData} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Konsumsi Pakan</CardTitle>
                          <CardDescription>Data konsumsi pakan 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <FeedConsumptionChart data={feedConsumptionData} />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Pertambahan Berat</CardTitle>
                          <CardDescription>Data pertambahan berat 14 hari terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            <WeightGainChart data={weightGainData} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Produktivitas Ternak</CardTitle>
                        <CardDescription>Analisis produktivitas ternak saat ini vs target</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="h-[300px]">
                            <LivestockRadarChart data={livestockProductivityData} />
                          </div>
                          <div className="space-y-4">
                            <div className="rounded-lg border p-4">
                              <h4 className="mb-2 font-medium">Rekomendasi Peningkatan</h4>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                  <HeartPulse className="mt-0.5 h-4 w-4 text-red-500" />
                                  <span>Tingkatkan pemantauan kesehatan dengan pemeriksaan rutin setiap 2 minggu</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Scales className="mt-0.5 h-4 w-4 text-blue-500" />
                                  <span>Sesuaikan komposisi pakan untuk meningkatkan pertumbuhan sebesar 10%</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Milk className="mt-0.5 h-4 w-4 text-green-500" />
                                  <span>Optimalkan jadwal pemerahan untuk meningkatkan produksi susu</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Egg className="mt-0.5 h-4 w-4 text-yellow-500" />
                                  <span>Tingkatkan kualitas pakan untuk meningkatkan produksi telur</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex w-full gap-2">
                          <Button variant="outline" className="w-full">
                            Lihat Detail
                          </Button>
                          <Button variant="default" className="w-full bg-purple-600 hover:bg-purple-700">
                            Rekomendasi Pakan
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Deteksi Kesehatan Ternak</CardTitle>
                        <CardDescription>Hasil analisis gambar dengan deep learning</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="h-[300px]">
                            <PieChartWithCustomizedLabel data={livestockHealthData} />
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-start gap-4 rounded-lg border p-4">
                              <div className="rounded-full bg-yellow-100 p-2">
                                <Stethoscope className="h-4 w-4 text-yellow-600" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium">Infeksi Ringan Terdeteksi</p>
                                  <Badge variant="outline">Tingkat Rendah</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Terdeteksi infeksi ringan pada sapi di kandang C3. Disarankan untuk melakukan
                                  pemantauan lebih lanjut.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-4 rounded-lg border p-4">
                              <div className="rounded-full bg-red-100 p-2">
                                <Lungs className="h-4 w-4 text-red-600" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium">Masalah Pernapasan Terdeteksi</p>
                                  <Badge variant="destructive">Tingkat Sedang</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Terdeteksi masalah pernapasan pada ayam di kandang A2. Diperlukan tindakan segera
                                  untuk mencegah penyebaran.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Lihat Semua Deteksi
                        </Button>
                      </CardFooter>
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
