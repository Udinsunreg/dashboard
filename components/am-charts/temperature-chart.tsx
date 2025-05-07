"use client"

import { useEffect, useRef } from "react"

type TemperatureChartProps = {
  data: {
    date: string
    temperature: number
  }[]
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const scriptsLoaded = {
      am5: false,
      am5xy: false,
      am5themes: false,
    }

    // Function to check if all scripts are loaded
    const areAllScriptsLoaded = () => {
      return scriptsLoaded.am5 && scriptsLoaded.am5xy && scriptsLoaded.am5themes
    }

    // Function to render chart once all scripts are loaded
    const attemptRenderChart = () => {
      if (areAllScriptsLoaded() && chartRef.current) {
        try {
          renderChart()
        } catch (error) {
          console.error("Error rendering chart:", error)
        }
      }
    }

    // Load a script and set its loaded status
    const loadScript = (url: string, key: keyof typeof scriptsLoaded) => {
      return new Promise<void>((resolve) => {
        // Check if script already exists
        const existingScript = document.querySelector(`script[src="${url}"]`)
        if (existingScript) {
          scriptsLoaded[key] = true
          resolve()
          return
        }

        const script = document.createElement("script")
        script.src = url
        script.async = true
        script.onload = () => {
          scriptsLoaded[key] = true
          resolve()
        }
        document.body.appendChild(script)
      })
    }

    // Load all required scripts
    const loadAllScripts = async () => {
      await loadScript("https://cdn.amcharts.com/lib/5/index.js", "am5")
      await loadScript("https://cdn.amcharts.com/lib/5/xy.js", "am5xy")
      await loadScript("https://cdn.amcharts.com/lib/5/themes/Animated.js", "am5themes")

      // Wait a bit to ensure scripts are initialized
      setTimeout(attemptRenderChart, 100)
    }

    // Function to render the chart
    const renderChart = () => {
      if (!window.am5 || !window.am5xy || !window.am5themes_Animated || !chartRef.current) {
        console.error("AmCharts libraries not fully loaded or chart container not found")
        return
      }

      // Dispose of previous chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose()
      }

      // Create root element
      const root = window.am5.Root.new(chartRef.current)
      chartInstanceRef.current = root

      // Set themes
      root.setThemes([window.am5themes_Animated.new(root)])

      // Create chart
      const chart = root.container.children.push(
        window.am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
        }),
      )

      // Add cursor
      const cursor = chart.set(
        "cursor",
        window.am5xy.XYCursor.new(root, {
          behavior: "zoomX",
        }),
      )
      cursor.lineY.set("visible", false)

      // Create axes
      const xAxis = chart.xAxes.push(
        window.am5xy.CategoryAxis.new(root, {
          categoryField: "date",
          renderer: window.am5xy.AxisRendererX.new(root, {
            minGridDistance: 50,
          }),
          tooltip: window.am5.Tooltip.new(root, {}),
        }),
      )

      xAxis.data.setAll(data)

      const yAxis = chart.yAxes.push(
        window.am5xy.ValueAxis.new(root, {
          min: 15,
          max: 35,
          renderer: window.am5xy.AxisRendererY.new(root, {}),
        }),
      )

      // Add series
      const series = chart.series.push(
        window.am5xy.LineSeries.new(root, {
          name: "Suhu (°C)",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "temperature",
          categoryXField: "date",
          stroke: window.am5.color(0xef4444),
          fill: window.am5.color(0xef4444),
          tooltip: window.am5.Tooltip.new(root, {
            labelText: "{name}: [bold]{valueY}[/]",
          }),
        }),
      )

      series.strokes.template.setAll({
        strokeWidth: 3,
      })

      // Add gradient fill
      series.fills.template.setAll({
        fillOpacity: 0.5,
        visible: true,
      })

      // Add bullet
      series.bullets.push(() =>
        window.am5.Bullet.new(root, {
          sprite: window.am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill"),
            stroke: root.interfaceColors.get("background"),
            strokeWidth: 2,
          }),
        }),
      )

      series.data.setAll(data)

      // Add scrollbar
      chart.set(
        "scrollbarX",
        window.am5.Scrollbar.new(root, {
          orientation: "horizontal",
        }),
      )

      // Make stuff animate on load
      series.appear(1000)
      chart.appear(1000, 100)
    }

    // Start loading scripts
    loadAllScripts()

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose()
      }
    }
  }, [data])

  return <div ref={chartRef} className="w-full h-full" />
}
