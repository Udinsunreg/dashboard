"use client"

import { useEffect, useRef, useState } from "react"
import { BarChart } from "lucide-react"

// Update the component to accept a year prop
export default function StockChart({ selectedYear = "all" }: { selectedYear?: string }) {
  const chartDivRef = useRef<HTMLDivElement>(null)
  const [chartError, setChartError] = useState(false)
  const [loading, setLoading] = useState(true)
  const chartRef = useRef<any>(null) // Store chart reference for later use

  // Use a simpler approach with a single useEffect for script loading and chart initialization
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return

    let chart: any = null
    const scriptElements: HTMLScriptElement[] = []
    let mounted = true

    const loadScripts = async () => {
      try {
        // Create and load scripts in sequence
        const loadScript = (src: string): Promise<void> => {
          return new Promise((resolve, reject) => {
            const script = document.createElement("script")
            script.src = src
            script.async = true
            script.onload = () => resolve()
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
            document.head.appendChild(script)
            scriptElements.push(script)
          })
        }

        // Load scripts in sequence to ensure proper initialization
        await loadScript("https://cdn.amcharts.com/lib/4/core.js")
        await loadScript("https://cdn.amcharts.com/lib/4/charts.js")
        await loadScript("https://cdn.amcharts.com/lib/4/themes/animated.js")

        // Wait a moment to ensure scripts are fully initialized
        await new Promise((resolve) => setTimeout(resolve, 100))

        if (!mounted) return

        // Initialize chart after scripts are loaded
        initializeChart()
      } catch (error) {
        console.error("Error loading amCharts scripts:", error)
        if (mounted) setChartError(true)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    const initializeChart = () => {
      try {
        // Access the globally loaded amCharts libraries
        const am4core = window.am4core
        const am4charts = window.am4charts
        const am4themes_animated = window.am4themes_animated

        if (!am4core || !am4charts) {
          throw new Error("amCharts libraries not loaded properly")
        }

        // Apply animated theme
        if (am4core.useTheme && am4themes_animated) {
          am4core.useTheme(am4themes_animated)
        }

        // Create chart
        chart = am4core.create(chartDivRef.current, am4charts.XYChart)
        chartRef.current = chart // Store chart reference for later use
        chart.padding(0, 15, 0, 15)
        chart.colors.step = 3

        // Enable chart cursor
        chart.cursor = new am4charts.XYCursor()
        chart.cursor.behavior = "zoomX"
        chart.cursor.lineX.strokeWidth = 2
        chart.cursor.lineX.stroke = am4core.color("#000")
        chart.cursor.lineX.strokeOpacity = 0.1
        chart.cursor.lineY.disabled = true

        // Generate monthly data from 2023 to 2025
        const data = []

        // Starting values
        let agriculture = 1200 // Pertanian
        let fishery = 800 // Perikanan
        let livestock = 1000 // Peternakan

        // Seasonal factors (multipliers) for each month (1-based)
        const seasonalFactors = {
          agriculture: [0.9, 0.85, 0.95, 1.1, 1.2, 1.15, 1.05, 1.0, 1.1, 1.15, 1.05, 1.0],
          fishery: [0.95, 0.9, 0.85, 0.9, 1.0, 1.1, 1.15, 1.2, 1.15, 1.05, 1.0, 0.95],
          livestock: [1.0, 0.95, 0.9, 0.95, 1.0, 1.05, 1.1, 1.15, 1.2, 1.1, 1.05, 1.0],
        }

        // Generate data for each month from Jan 2023 to Dec 2025
        for (let year = 2023; year <= 2025; year++) {
          for (let month = 0; month < 12; month++) {
            // Apply seasonal factors
            const seasonalAgriculture = agriculture * seasonalFactors.agriculture[month]
            const seasonalFishery = fishery * seasonalFactors.fishery[month]
            const seasonalLivestock = livestock * seasonalFactors.livestock[month]

            // Add random variation (±5%)
            const randomFactor = () => 0.95 + Math.random() * 0.1

            // Calculate final values with seasonal and random factors
            const agricultureValue = Math.round(seasonalAgriculture * randomFactor())
            const fisheryValue = Math.round(seasonalFishery * randomFactor())
            const livestockValue = Math.round(seasonalLivestock * randomFactor())

            // Add data point
            data.push({
              date: new Date(year, month, 15),
              agriculture: agricultureValue,
              fishery: fisheryValue,
              livestock: livestockValue,
            })

            // Apply growth trend for next month
            agriculture *= 1 + 0.08 / 12
            fishery *= 1 + 0.06 / 12
            livestock *= 1 + 0.07 / 12
          }
        }

        chart.data = data

        // Create axes
        const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
        dateAxis.renderer.grid.template.location = 0
        dateAxis.renderer.minGridDistance = 50
        dateAxis.renderer.grid.template.strokeOpacity = 0.1
        dateAxis.renderer.labels.template.fill = am4core.color("#888")
        dateAxis.tooltip.background.fill = am4core.color("#fff")
        dateAxis.tooltip.background.stroke = dateAxis.renderer.grid.template.stroke
        dateAxis.tooltip.background.strokeWidth = 1
        dateAxis.tooltip.label.fill = am4core.color("#000")
        dateAxis.tooltip.label.padding(8, 8, 8, 8)

        // Format date axis to show month and year
        dateAxis.dateFormats.setKey("year", "yyyy")
        dateAxis.periodChangeDateFormats.setKey("month", "MMM yyyy")

        // Value axis
        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis.tooltip.disabled = true
        valueAxis.renderer.grid.template.strokeOpacity = 0.1
        valueAxis.renderer.labels.template.fill = am4core.color("#888")
        valueAxis.renderer.minWidth = 60

        // Format value axis with thousand separators
        valueAxis.numberFormatter = new am4core.NumberFormatter()
        valueAxis.numberFormatter.numberFormat = "#,###"
        valueAxis.title.text = "Produksi (ton)"
        valueAxis.title.fill = am4core.color("#888")

        // Define sector colors
        const sectorColors = {
          agriculture: "#27ae60", // Green for agriculture
          fishery: "#3498db", // Blue for fishery
          livestock: "#e67e22", // Orange for livestock
        }

        // Create series
        function createSeries(field, name, color) {
          const series = chart.series.push(new am4charts.LineSeries())
          series.dataFields.dateX = "date"
          series.dataFields.valueY = field
          series.name = name
          series.tooltipText = "{name}: [bold]{valueY.formatNumber('#,###')}[/] ton"
          series.tooltip.getFillFromObject = false
          series.tooltip.background.fill = am4core.color("#fff")
          series.tooltip.background.stroke = am4core.color(color)
          series.tooltip.background.strokeWidth = 2
          series.tooltip.label.fill = am4core.color("#000")
          series.stroke = am4core.color(color)
          series.fill = am4core.color(color)
          series.fillOpacity = 0.2

          // Make line smoother
          series.tensionX = 0.8
          series.tensionY = 0.8

          // Add bullets
          const bullet = series.bullets.push(new am4charts.CircleBullet())
          bullet.circle.strokeWidth = 2
          bullet.circle.radius = 4
          bullet.circle.fill = am4core.color("#fff")
          bullet.circle.stroke = am4core.color(color)

          // Only show bullets when hovering
          bullet.hiddenState.properties.opacity = 0

          // Add hover state
          const hoverState = bullet.states.create("hover")
          hoverState.properties.scale = 1.7

          return series
        }

        // Create series with sector-specific colors
        const agricultureSeries = createSeries("agriculture", "Pertanian", sectorColors.agriculture)
        const fisherySeries = createSeries("fishery", "Perikanan", sectorColors.fishery)
        const livestockSeries = createSeries("livestock", "Peternakan", sectorColors.livestock)

        // Add legend
        chart.legend = new am4charts.Legend()
        chart.legend.position = "top"
        chart.legend.contentAlign = "right"
        chart.legend.paddingBottom = 20
        chart.legend.labels.template.fill = am4core.color("#888")

        // Add scrollbar
        chart.scrollbarX = new am4charts.XYChartScrollbar()
        chart.scrollbarX.series.push(agricultureSeries)
        chart.scrollbarX.series.push(fisherySeries)
        chart.scrollbarX.series.push(livestockSeries)
        chart.scrollbarX.parent = chart.bottomAxesContainer

        // Function to show all data or zoom to a specific year
        const zoomToYear = (year) => {
          if (!chart || !dateAxis) return

          if (year === "all") {
            // Show all data from 2023 to 2025
            const startDate = new Date(2023, 0, 1)
            const endDate = new Date(2025, 11, 31)

            // Set the min/max of the axis instead of just zooming
            dateAxis.min = startDate.getTime()
            dateAxis.max = endDate.getTime()

            // Ensure the chart renders the full range
            chart.invalidateData()
          } else {
            // Zoom the date axis to the selected year
            const startDate = new Date(Number.parseInt(year), 0, 1)
            const endDate = new Date(Number.parseInt(year), 11, 31)
            dateAxis.zoomToDates(startDate, endDate)
          }
        }

        // Make sure to show all data initially by setting the min/max dates directly
        const startDate = new Date(2023, 0, 1)
        const endDate = new Date(2025, 11, 31)
        dateAxis.min = startDate.getTime()
        dateAxis.max = endDate.getTime()

        // Force chart to update with the full range
        chart.invalidateData()

        // Store the zoom function in the chart reference for later use
        chartRef.current.zoomToYear = zoomToYear
      } catch (error) {
        console.error("Error initializing amCharts:", error)
        if (mounted) setChartError(true)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    // Apply amCharts theme unconditionally
    if (typeof window !== "undefined" && window.am4core && window.am4themes_animated) {
      // window.am4core.useTheme(window.am4themes_animated)
    }

    // Start loading scripts
    loadScripts()

    // Cleanup function
    return () => {
      mounted = false
      if (chart) {
        chart.dispose()
      }
      // Remove script elements to prevent memory leaks
      scriptElements.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })
    }
  }, [])

  // Effect to handle year changes
  useEffect(() => {
    if (chartRef.current && chartRef.current.zoomToYear) {
      if (selectedYear === "all") {
        chartRef.current.zoomToYear("all")
      } else {
        chartRef.current.zoomToYear(Number.parseInt(selectedYear))
      }
    }
  }, [selectedYear])

  // Show fallback if there's an error
  if (chartError) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-md border border-dashed">
        <div className="text-center">
          <BarChart className="mx-auto h-16 w-16 text-muted-foreground opacity-20" />
          <h3 className="mt-4 text-lg font-medium">Chart Visualization</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The interactive chart could not be loaded. Please try refreshing the page.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <div ref={chartDivRef} style={{ width: "100%", height: "400px" }}></div>
      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="text-center">
            <div className="mb-2 h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading chart...</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Add TypeScript declarations for amCharts global objects
declare global {
  interface Window {
    am4core: any
    am4charts: any
    am4themes_animated: any
  }
}
