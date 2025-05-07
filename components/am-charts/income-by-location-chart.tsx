"use client"

import { useEffect, useRef } from "react"

// Mock data for income by location
const incomeByLocationData = [
  { location: "Kandang A", value: 35 },
  { location: "Kandang B", value: 25 },
  { location: "Kandang C", value: 20 },
  { location: "Kandang D", value: 15 },
  { location: "Kandang E", value: 5 },
]

export function IncomeByLocationChart() {
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
          panX: false,
          panY: false,
          wheelX: "none",
          wheelY: "none",
          layout: root.verticalLayout,
        }),
      )

      // Create axes
      const yAxis = chart.yAxes.push(
        window.am5xy.CategoryAxis.new(root, {
          categoryField: "location",
          renderer: window.am5xy.AxisRendererY.new(root, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9,
          }),
        }),
      )

      yAxis.data.setAll(incomeByLocationData)

      const xAxis = chart.xAxes.push(
        window.am5xy.ValueAxis.new(root, {
          renderer: window.am5xy.AxisRendererX.new(root, {}),
          min: 0,
        }),
      )

      // Add series
      const series = chart.series.push(
        window.am5xy.ColumnSeries.new(root, {
          name: "Income",
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: "value",
          categoryYField: "location",
          tooltip: window.am5.Tooltip.new(root, {
            pointerOrientation: "left",
            labelText: "{categoryY}: {valueX}%",
          }),
        }),
      )

      // Set custom gradient fill for columns
      series.columns.template.setAll({
        fillOpacity: 0.9,
        strokeOpacity: 0,
        cornerRadiusTR: 5,
        cornerRadiusBR: 5,
      })

      // Create a gradient for the fill
      const gradient = window.am5.LinearGradient.new(root, {
        stops: [
          { color: window.am5.color(0xd97706) }, // amber-600
          { color: window.am5.color(0xfbbf24) }, // amber-400
        ],
      })

      series.columns.template.set("fill", gradient)

      // Add column hover state
      series.columns.template.states.create("hover", {
        fillOpacity: 1,
      })

      // Add labels
      series.bullets.push(() => {
        return window.am5.Bullet.new(root, {
          locationX: 1,
          sprite: window.am5.Label.new(root, {
            text: "{valueX}%",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: window.am5.p50,
            centerX: window.am5.p50,
            populateText: true,
          }),
        })
      })

      // Set data
      series.data.setAll(incomeByLocationData)

      // Make stuff animate on load
      series.appear()
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
    <div className="w-full h-[300px]">
      <div ref={chartRef} className="w-full h-full" />
    </div>
  )
}
