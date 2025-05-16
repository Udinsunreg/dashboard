"use client"

import { useEffect, useRef, useState } from "react"
import { BarChart } from "lucide-react"

export default function TimeSeriesChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartError, setChartError] = useState(false)
  const [loading, setLoading] = useState(true)

  // Use a simpler approach with a single useEffect for script loading and chart initialization
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return

    const chart: any = null
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
        await loadScript("https://cdn.amcharts.com/lib/5/index.js")
        await loadScript("https://cdn.amcharts.com/lib/5/xy.js")
        await loadScript("https://cdn.amcharts.com/lib/5/themes/Animated.js")

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
        // Access the global amCharts objects
        const am5 = window.am5
        const am5xy = window.am5xy
        const am5themes_Animated = window.am5themes_Animated

        if (!am5 || !am5xy || !am5themes_Animated) {
          throw new Error("amCharts modules not available")
        }

        // Dispose of previous chart if it exists
        if (chartRef.current._am5) {
          chartRef.current._am5.dispose()
        }

        // Create root element
        const root = am5.Root.new(chartRef.current)
        chartRef.current._am5 = root

        // Set themes
        root.setThemes([am5themes_Animated.new(root)])

        // Create chart
        const chart = root.container.children.push(
          am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
          }),
        )

        // Define data
        const data = [
          {
            month: "Jan",
            pertanian: 65,
            perikanan: 30,
            peternakan: 35,
          },
          {
            month: "Feb",
            pertanian: 60,
            perikanan: 30,
            peternakan: 40,
          },
          {
            month: "Mar",
            pertanian: 75,
            perikanan: 40,
            peternakan: 60,
          },
          {
            month: "Apr",
            pertanian: 75,
            perikanan: 40,
            peternakan: 55,
          },
          {
            month: "May",
            pertanian: 55,
            perikanan: 35,
            peternakan: 45,
          },
          {
            month: "Jun",
            pertanian: 55,
            perikanan: 25,
            peternakan: 40,
          },
          {
            month: "Jul",
            pertanian: 40,
            perikanan: 20,
            peternakan: 35,
          },
          {
            month: "Aug",
            pertanian: 40,
            perikanan: 25,
            peternakan: 35,
          },
          {
            month: "Sep",
            pertanian: 60,
            perikanan: 25,
            peternakan: 40,
          },
          {
            month: "Oct",
            pertanian: 75,
            perikanan: 35,
            peternakan: 50,
          },
          {
            month: "Nov",
            pertanian: 85,
            perikanan: 45,
            peternakan: 60,
          },
          {
            month: "Dec",
            pertanian: 90,
            perikanan: 50,
            peternakan: 65,
          },
        ]

        // Create Y-axis
        const yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            min: 0,
            max: 220,
            strictMinMax: true,
            renderer: am5xy.AxisRendererY.new(root, {
              strokeOpacity: 0.1,
            }),
          }),
        )

        // Create X-Axis
        const xAxis = chart.xAxes.push(
          am5xy.CategoryAxis.new(root, {
            categoryField: "month",
            renderer: am5xy.AxisRendererX.new(root, {
              strokeOpacity: 0,
              minGridDistance: 30,
            }),
          }),
        )
        xAxis.data.setAll(data)

        // Create series
        function createSeries(name, field, color) {
          const series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
              name: name,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: field,
              categoryXField: "month",
              stacked: true,
              tooltip: am5.Tooltip.new(root, {
                pointerOrientation: "horizontal",
                labelText: "{name} : {valueY}",
              }),
            }),
          )

          series.columns.template.setAll({
            fillOpacity: 0.9,
            strokeOpacity: 0,
            cornerRadiusTL: 0,
            cornerRadiusTR: 0,
          })

          series.set("fill", am5.color(color))
          series.data.setAll(data)

          series.appear(1000, 100)
        }

        // Create series for each category with appropriate colors
        createSeries("Pertanian", "pertanian", am5.color(0x4a731c))
        createSeries("Perikanan", "perikanan", am5.color(0x216e6a))
        createSeries("Peternakan", "peternakan", am5.color(0x3a1603))

        // Add legend
        const legend = chart.children.push(
          am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50,
            layout: root.horizontalLayout,
            marginTop: 15,
          }),
        )
        legend.data.setAll(chart.series.values)

        // Add cursor
        chart.set(
          "cursor",
          am5xy.XYCursor.new(root, {
            behavior: "zoomY",
          }),
        )

        // Make stuff animate on load
        chart.appear(1000, 100)
      } catch (error) {
        console.error("Error initializing amCharts:", error)
        if (mounted) setChartError(true)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    // Start loading scripts
    loadScripts()

    // Cleanup function
    return () => {
      mounted = false
      if (chartRef.current && chartRef.current._am5) {
        chartRef.current._am5.dispose()
      }
      // Remove script elements to prevent memory leaks
      scriptElements.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })
    }
  }, [])

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
      <div ref={chartRef} className="h-[400px] w-full" />
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
    am5: any
    am5xy: any
    am5themes_Animated: any
  }
}
