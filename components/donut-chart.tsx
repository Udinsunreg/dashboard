"use client"

import { useEffect, useRef } from "react"

// Mock data for fish species distribution
const speciesData = [
  { species: "Lele", value: 35 },
  { species: "Nila", value: 25 },
  { species: "Gurame", value: 20 },
  { species: "Mas", value: 15 },
  { species: "Patin", value: 5 },
]

export function DonutChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const scriptsLoaded = {
      am5: false,
      am5percent: false,
      am5themes: false,
    }

    // Function to check if all scripts are loaded
    const areAllScriptsLoaded = () => {
      return scriptsLoaded.am5 && scriptsLoaded.am5percent && scriptsLoaded.am5themes
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
      await loadScript("https://cdn.amcharts.com/lib/5/percent.js", "am5percent")
      await loadScript("https://cdn.amcharts.com/lib/5/themes/Animated.js", "am5themes")

      // Wait a bit to ensure scripts are initialized
      setTimeout(attemptRenderChart, 100)
    }

    // Function to render the chart
    const renderChart = () => {
      if (!window.am5 || !window.am5percent || !window.am5themes_Animated || !chartRef.current) {
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
        window.am5percent.PieChart.new(root, {
          radius: window.am5.percent(90),
          innerRadius: window.am5.percent(50),
          layout: root.horizontalLayout,
        }),
      )

      // Create series
      const series = chart.series.push(
        window.am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "value",
          categoryField: "species",
        }),
      )

      // Set data
      const chartData = speciesData.map((item) => ({
        species: item.species,
        value: item.value,
      }))

      series.data.setAll(chartData)

      // Disabling labels and ticks
      series.labels.template.set("visible", false)
      series.ticks.template.set("visible", false)

      // Adding gradients
      series.slices.template.set("strokeOpacity", 0)
      series.slices.template.set(
        "fillGradient",
        window.am5.RadialGradient.new(root, {
          stops: [
            {
              brighten: -0.8,
            },
            {
              brighten: -0.8,
            },
            {
              brighten: -0.5,
            },
            {
              brighten: 0,
            },
            {
              brighten: -0.5,
            },
          ],
        }),
      )

      // Create legend
      const legend = chart.children.push(
        window.am5.Legend.new(root, {
          centerY: window.am5.percent(50),
          y: window.am5.percent(50),
          layout: root.verticalLayout,
        }),
      )

      // Set value labels align to right
      legend.valueLabels.template.setAll({ textAlign: "right" })

      // Set width and max width of labels
      legend.labels.template.setAll({
        maxWidth: 140,
        width: 140,
        oversizedBehavior: "wrap",
      })

      legend.data.setAll(series.dataItems)

      // Play initial series animation
      series.appear(1000, 100)
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

  return <div ref={chartRef} className="w-full h-full" />
}
