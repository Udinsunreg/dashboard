"use client"

import { useEffect, useRef } from "react"

// Mock data for fisheries sales analysis
const salesData = [
  { date: "2023-01-16", market0: 71, market1: 75, sales0: 5, sales1: 9 },
  { date: "2023-01-17", market0: 74, market1: 78, sales0: 4, sales1: 6 },
  { date: "2023-01-18", market0: 78, market1: 88, sales0: 5, sales1: 2 },
  { date: "2023-01-19", market0: 85, market1: 89, sales0: 8, sales1: 9 },
  { date: "2023-01-20", market0: 82, market1: 89, sales0: 9, sales1: 6 },
  { date: "2023-01-21", market0: 83, market1: 85, sales0: 3, sales1: 5 },
  { date: "2023-01-22", market0: 88, market1: 92, sales0: 5, sales1: 7 },
  { date: "2023-01-23", market0: 85, market1: 90, sales0: 7, sales1: 6 },
  { date: "2023-01-24", market0: 85, market1: 91, sales0: 9, sales1: 5 },
  { date: "2023-01-25", market0: 80, market1: 84, sales0: 5, sales1: 8 },
  { date: "2023-01-26", market0: 87, market1: 92, sales0: 4, sales1: 8 },
  { date: "2023-01-27", market0: 84, market1: 87, sales0: 3, sales1: 4 },
  { date: "2023-01-28", market0: 83, market1: 88, sales0: 5, sales1: 7 },
  { date: "2023-01-29", market0: 84, market1: 87, sales0: 5, sales1: 8 },
  { date: "2023-01-30", market0: 81, market1: 85, sales0: 4, sales1: 7 },
]

export function CombinedChart() {
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
            minorGridEnabled: true,
          }),
          tooltip: window.am5.Tooltip.new(root, {}),
          tooltipDateFormat: "yyyy-MM-dd",
        }),
      )

      const yAxis0 = chart.yAxes.push(
        window.am5xy.ValueAxis.new(root, {
          renderer: window.am5xy.AxisRendererY.new(root, {
            pan: "zoom",
          }),
        }),
      )

      const yRenderer1 = window.am5xy.AxisRendererY.new(root, {
        opposite: true,
      })
      yRenderer1.grid.template.set("forceHidden", true)

      const yAxis1 = chart.yAxes.push(
        window.am5xy.ValueAxis.new(root, {
          renderer: yRenderer1,
          syncWithAxis: yAxis0,
        }),
      )

      // Add series
      // Actual sales column series (wider, light blue)
      const columnSeries1 = chart.series.push(
        window.am5xy.ColumnSeries.new(root, {
          name: "Actual sales",
          xAxis: xAxis,
          yAxis: yAxis0,
          valueYField: "sales1",
          valueXField: "date",
          clustered: false,
          tooltip: window.am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{name}: {valueY}",
          }),
        }),
      )

      columnSeries1.columns.template.setAll({
        width: window.am5.percent(60),
        fillOpacity: 0.5,
        fill: window.am5.color(0xa5d7f7),
        strokeOpacity: 0,
      })

      columnSeries1.data.processor = window.am5.DataProcessor.new(root, {
        dateFields: ["date"],
        dateFormat: "yyyy-MM-dd",
      })

      // Target sales column series (narrower, dark blue)
      const columnSeries0 = chart.series.push(
        window.am5xy.ColumnSeries.new(root, {
          name: "Target sales",
          xAxis: xAxis,
          yAxis: yAxis0,
          valueYField: "sales0",
          valueXField: "date",
          clustered: false,
          tooltip: window.am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{name}: {valueY}",
          }),
        }),
      )

      columnSeries0.columns.template.setAll({
        width: window.am5.percent(40),
        fill: window.am5.color(0x4682b4),
        strokeOpacity: 0,
      })

      // Market days line series (solid line)
      const series0 = chart.series.push(
        window.am5xy.SmoothedXLineSeries.new(root, {
          name: "Market days",
          xAxis: xAxis,
          yAxis: yAxis1,
          valueYField: "market0",
          valueXField: "date",
          tooltip: window.am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{name}: {valueY}",
          }),
        }),
      )

      series0.strokes.template.setAll({
        strokeWidth: 2,
        stroke: window.am5.color(0x4169e1),
      })

      // Add bullets to market days series
      series0.bullets.push(() => {
        return window.am5.Bullet.new(root, {
          sprite: window.am5.Circle.new(root, {
            stroke: series0.get("fill"),
            strokeWidth: 2,
            fill: root.interfaceColors.get("background"),
            radius: 5,
          }),
        })
      })

      // Market days all line series (dotted line)
      const series1 = chart.series.push(
        window.am5xy.SmoothedXLineSeries.new(root, {
          name: "Market days all",
          xAxis: xAxis,
          yAxis: yAxis1,
          valueYField: "market1",
          valueXField: "date",
        }),
      )

      series1.strokes.template.setAll({
        strokeWidth: 2,
        strokeDasharray: [2, 2],
        stroke: window.am5.color(0x9370db),
      })

      // Add tooltip to market days all series
      const tooltip1 = series1.set(
        "tooltip",
        window.am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
        }),
      )
      tooltip1.label.set("text", "{name}: {valueY}")

      // Add bullets to market days all series
      series1.bullets.push(() => {
        return window.am5.Bullet.new(root, {
          sprite: window.am5.Circle.new(root, {
            stroke: series1.get("fill"),
            strokeWidth: 2,
            fill: root.interfaceColors.get("background"),
            radius: 5,
          }),
        })
      })

      // Add scrollbar
      const scrollbar = chart.set(
        "scrollbarX",
        window.am5xy.XYChartScrollbar.new(root, {
          orientation: "horizontal",
          height: 60,
        }),
      )

      // Create axes for scrollbar
      const sbDateAxis = scrollbar.chart.xAxes.push(
        window.am5xy.DateAxis.new(root, {
          baseInterval: {
            timeUnit: "day",
            count: 1,
          },
          renderer: window.am5xy.AxisRendererX.new(root, {}),
        }),
      )

      const sbValueAxis0 = scrollbar.chart.yAxes.push(
        window.am5xy.ValueAxis.new(root, {
          renderer: window.am5xy.AxisRendererY.new(root, {}),
        }),
      )

      const sbValueAxis1 = scrollbar.chart.yAxes.push(
        window.am5xy.ValueAxis.new(root, {
          renderer: window.am5xy.AxisRendererY.new(root, {}),
        }),
      )

      // Add series to scrollbar
      const sbSeries0 = scrollbar.chart.series.push(
        window.am5xy.ColumnSeries.new(root, {
          valueYField: "sales0",
          valueXField: "date",
          xAxis: sbDateAxis,
          yAxis: sbValueAxis0,
        }),
      )

      sbSeries0.columns.template.setAll({
        fillOpacity: 0.5,
        fill: window.am5.color(0xcccccc),
        strokeOpacity: 0,
      })

      // Add line series to scrollbar
      const sbSeries1 = scrollbar.chart.series.push(
        window.am5xy.LineSeries.new(root, {
          valueYField: "market0",
          valueXField: "date",
          xAxis: sbDateAxis,
          yAxis: sbValueAxis1,
        }),
      )

      // Create legend
      const legend = chart.children.push(
        window.am5.Legend.new(root, {
          x: window.am5.p50,
          centerX: window.am5.p50,
        }),
      )
      legend.data.setAll(chart.series.values)

      // Set data
      columnSeries1.data.setAll(salesData)
      columnSeries0.data.setAll(salesData)
      series0.data.setAll(salesData)
      series1.data.setAll(salesData)
      sbSeries0.data.setAll(salesData)
      sbSeries1.data.setAll(salesData)

      // Make stuff animate on load
      series0.appear(1000)
      series1.appear(1000)
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
  }, [])

  return (
    <div className="w-full h-[500px]">
      <div ref={chartRef} className="w-full h-full" />
    </div>
  )
}
