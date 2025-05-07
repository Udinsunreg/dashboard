"use client"

import { useEffect, useRef } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5percent from "@amcharts/amcharts5/percent"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

// Sample data for livestock breed distribution with blue-purple color scheme
// Including both base and lighter colors for gradients
const breedDistributionData = [
  {
    category: "Sapi Limosin",
    value: 43.5,
    color: 0x4361ee, // Bright blue
    lightColor: 0x6c8cff, // Lighter blue
  },
  {
    category: "Sapi Brahman",
    value: 26.1,
    color: 0x3a0ca3, // Deep purple-blue
    lightColor: 0x5823d5, // Lighter purple-blue
  },
  {
    category: "Sapi Simental",
    value: 17.4,
    color: 0x7209b7, // Purple
    lightColor: 0x9331d9, // Lighter purple
  },
  {
    category: "Sapi Bali",
    value: 13.0,
    color: 0x560bad, // Deep purple
    lightColor: 0x7729d1, // Lighter deep purple
  },
]

export function LivestockBreedDistributionChart() {
  const chartRef = useRef<am5.Root | null>(null)
  const chartDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Don't execute the rest of the code if the chart div doesn't exist
    if (!chartDivRef.current) return

    // Dispose of previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.dispose()
    }

    // Create root element
    const root = am5.Root.new(chartDivRef.current)
    chartRef.current = root

    // Set themes
    root.setThemes([am5themes_Animated.new(root)])

    // Create chart
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
        radius: am5.percent(90),
      }),
    )

    // Create series
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      }),
    )

    // Disable labels
    series.labels.template.set("forceHidden", true)
    series.ticks.template.set("forceHidden", true)

    // Create custom renderer for slices with gradient
    series.slices.template.adapters.add("fill", (fill, target) => {
      const dataItem = target.dataItem
      if (dataItem && dataItem.dataContext) {
        const context = dataItem.dataContext as any
        if (context.color && context.lightColor) {
          // Create a gradient using the predefined colors
          const gradient = am5.LinearGradient.new(root, {
            stops: [
              {
                color: am5.color(context.color),
                offset: 0,
              },
              {
                color: am5.color(context.lightColor),
                offset: 1,
              },
            ],
            rotation: 45,
          })
          return gradient
        }
      }
      return fill
    })

    // Style the slices
    series.slices.template.setAll({
      strokeWidth: 0,
      cornerRadius: 0,
      shadowOpacity: 0.1,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowColor: am5.color(0x000000),
    })

    // Add hover state
    series.slices.template.states.create("hover", {
      scale: 1.03,
      fillOpacity: 0.9,
    })

    // Set data
    series.data.setAll(breedDistributionData)

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(100),
        x: am5.percent(100),
        y: am5.percent(50),
        centerY: am5.percent(50),
        layout: root.verticalLayout,
        verticalCenter: "middle",
        marginLeft: 20,
      }),
    )

    // Style legend markers
    legend.markers.template.setAll({
      width: 16,
      height: 16,
      cornerRadius: 4,
    })

    // Apply gradient to legend markers
    legend.markerRectangles.template.adapters.add("fill", (fill, target) => {
      const dataItem = target.dataItem
      if (dataItem && dataItem.dataContext) {
        const context = dataItem.dataContext as any
        if (context.color && context.lightColor) {
          // Create a gradient using the predefined colors
          const gradient = am5.LinearGradient.new(root, {
            stops: [
              {
                color: am5.color(context.color),
                offset: 0,
              },
              {
                color: am5.color(context.lightColor),
                offset: 1,
              },
            ],
            rotation: 45,
          })
          return gradient
        }
      }
      return fill
    })

    // Hide value labels in legend
    legend.valueLabels.template.set("forceHidden", true)

    legend.data.setAll(series.dataItems)

    // Add animation
    series.appear(1000, 100)

    // Clean up on unmount
    return () => {
      if (root) {
        root.dispose()
      }
    }
  }, [])

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div ref={chartDivRef} style={{ width: "100%", height: "350px" }} />
    </div>
  )
}
