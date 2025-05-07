"use client"

import { useEffect, useRef } from "react"

type ProductionChartProps = {
  data: {
    month: string
    sapi: number
    kambing: number
    domba: number
    unggas: number
  }[]
}

export function ProductionChart({ data }: ProductionChartProps) {
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
        window.am5xy.CategoryAxis.new(root, {
          categoryField: "month",
          renderer: window.am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
          }),
          tooltip: window.am5.Tooltip.new(root, {}),
        }),
      )

      xAxis.data.setAll(data)

      const yAxis = chart.yAxes.push(
        window.am5xy.ValueAxis.new(root, {
          renderer: window.am5xy.AxisRendererY.new(root, {}),
        }),
      )

      // Add series
      function createSeries(name: string, field: string, color: any) {
        const series = chart.series.push(
          window.am5xy.ColumnSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: field,
            categoryXField: "month",
            stacked: true,
            fill: color,
            stroke: color,
            tooltip: window.am5.Tooltip.new(root, {
              pointerOrientation: "horizontal",
              labelText: "{name}: [bold]{valueY}[/]",
            }),
          }),
        )

        series.columns.template.setAll({
          tooltipY: window.am5.percent(10),
          templateField: "columnSettings",
        })

        series.data.setAll(data)
        series.appear(1000)

        return series
      }

      // Create series with colors
      createSeries("Sapi", "sapi", window.am5.color(0x0088fe))
      createSeries("Kambing", "kambing", window.am5.color(0x00c49f))
      createSeries("Domba", "domba", window.am5.color(0xffbb28))
      createSeries("Unggas", "unggas", window.am5.color(0xff8042))

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
