"use client"

import { useMemo } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5percent from "@amcharts/amcharts5/percent"
import AmChartBase from "./am-chart-base"

interface LivestockHealthChartProps {
  data: {
    category: string
    value: number
  }[]
  height?: number
}

export default function LivestockHealthChart({ data, height = 400 }: LivestockHealthChartProps) {
  const chartId = useMemo(() => `livestock-health-chart-${Math.random().toString(36).substr(2, 9)}`, [])

  const createChart = useMemo(() => {
    return (root: am5.Root) => {
      // Create chart
      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          endAngle: 270,
          layout: root.verticalLayout,
          innerRadius: am5.percent(60),
        }),
      )

      // Create series
      const series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          endAngle: 270,
        }),
      )

      // Set colors
      series.set(
        "colors",
        am5.ColorSet.new(root, {
          colors: [
            am5.color(0xd97706), // amber-600
            am5.color(0xf59e0b), // amber-500
            am5.color(0xfbbf24), // amber-400
            am5.color(0xfcd34d), // amber-300
            am5.color(0xfde68a), // amber-200
            am5.color(0xfef3c7), // amber-100
            am5.color(0xfffbeb), // amber-50
          ],
        }),
      )

      // Add gradient
      const gradient = am5.RadialGradient.new(root, {
        stops: [{ color: am5.color(0x000000) }, { color: am5.color(0x000000) }, {}],
      })

      // Style slices
      series.slices.template.setAll({
        fillGradient: gradient,
        strokeWidth: 2,
        stroke: am5.color(0xffffff),
        cornerRadius: 10,
        shadowOpacity: 0.1,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowColor: am5.color(0x000000),
        fillPattern: am5.GrainPattern.new(root, {
          maxOpacity: 0.2,
          density: 0.5,
          colors: [am5.color(0x000000)],
        }),
      })

      // Hover state
      series.slices.template.states.create("hover", {
        shadowOpacity: 1,
        shadowBlur: 10,
      })

      // Style ticks
      series.ticks.template.setAll({
        strokeOpacity: 0.4,
        strokeDasharray: [2, 2],
      })

      // Hidden state
      series.states.create("hidden", {
        endAngle: -90,
      })

      // Create legend
      const legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          marginTop: 15,
          marginBottom: 15,
        }),
      )

      legend.markerRectangles.template.adapters.add("fillGradient", () => undefined)

      legend.data.setAll(series.dataItems)

      // Set data
      series.data.setAll(data)

      // Play initial series animation
      series.appear(1000, 100)
    }
  }, [data])

  return <AmChartBase chartId={chartId} height={height} createChartFn={createChart} />
}
