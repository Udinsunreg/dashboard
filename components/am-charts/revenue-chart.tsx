"use client"

import { useEffect, useRef } from "react"

type RevenueChartProps = {
  data: {
    date: string
    target: number
    actual: number
    forecast?: number
    trend?: number
  }[]
}

export function RevenueChart({ data }: RevenueChartProps) {
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

      root.dateFormatter.setAll({
        dateFormat: "yyyy-MM-dd",
        dateFields: ["valueX"],
      })

      // Create chart
      const chart = root.container.children.push(
        window.am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
          layout: root.verticalLayout,
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
        window.am5xy.DateAxis.new(root, {
          baseInterval: { timeUnit: "day", count: 1 },
          renderer: window.am5xy.AxisRendererX.new(root, {
            minGridDistance: 50,
          }),
          tooltip: window.am5.Tooltip.new(root, {}),
        }),
      )

      const yAxis = chart.yAxes.push(
        window.am5xy.ValueAxis.new(root, {
          renderer: window.am5xy.AxisRendererY.new(root, {}),
        }),
      )

      // Add series
      const actualSeries = chart.series.push(
        window.am5xy.LineSeries.new(root, {
          name: "Pendapatan Aktual (Juta Rp)",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "actual",
          valueXField: "date",
          stroke: window.am5.color(0x22c55e),
          fill: window.am5.color(0x22c55e),
          tooltip: window.am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{name}: [bold]{valueY}[/]",
          }),
        }),
      )

      actualSeries.strokes.template.setAll({
        strokeWidth: 3,
      })

      // Add bullet
      actualSeries.bullets.push(() =>
        window.am5.Bullet.new(root, {
          sprite: window.am5.Circle.new(root, {
            radius: 6,
            fill: actualSeries.get("fill"),
            stroke: root.interfaceColors.get("background"),
            strokeWidth: 2,
          }),
        }),
      )

      // Add target series with dashed line
      const targetSeries = chart.series.push(
        window.am5xy.LineSeries.new(root, {
          name: "Target Pendapatan (Juta Rp)",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "target",
          valueXField: "date",
          stroke: window.am5.color(0x3b82f6),
          fill: window.am5.color(0x3b82f6),
          tooltip: window.am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{name}: [bold]{valueY}[/]",
          }),
        }),
      )

      targetSeries.strokes.template.setAll({
        strokeWidth: 2,
        strokeDasharray: [5, 5],
      })

      // Add bullet
      targetSeries.bullets.push(() =>
        window.am5.Bullet.new(root, {
          sprite: window.am5.Circle.new(root, {
            radius: 4,
            fill: targetSeries.get("fill"),
            stroke: root.interfaceColors.get("background"),
            strokeWidth: 2,
          }),
        }),
      )

      // Process data
      const processedData = data.map((item) => ({
        date: new Date(item.date).getTime(),
        target: item.target,
        actual: item.actual,
        forecast: item.forecast,
        trend: item.trend,
      }))

      actualSeries.data.setAll(processedData)
      targetSeries.data.setAll(processedData)

      // Add legend
      const legend = chart.children.push(
        window.am5.Legend.new(root, {
          centerX: window.am5.p50,
          x: window.am5.p50,
        }),
      )

      legend.data.setAll(chart.series.values)

      // Add scrollbar
      chart.set(
        "scrollbarX",
        window.am5.Scrollbar.new(root, {
          orientation: "horizontal",
        }),
      )

      // Make stuff animate on load
      actualSeries.appear(1000)
      targetSeries.appear(1000)
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
