"use client"

import { useMemo } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5percent from "@amcharts/amcharts5/percent"
import AmChartBase from "./am-chart-base"

interface LivestockDistributionChartProps {
  data: {
    category: string
    value: number
    color?: string
  }[]
  height?: number
}

export default function LivestockDistributionChart({ data, height = 400 }: LivestockDistributionChartProps) {
  const chartId = useMemo(() => `livestock-distribution-chart-${Math.random().toString(36).substr(2, 9)}`, [])

  const createChart = useMemo(() => {
    return (root: am5.Root) => {
      // Create chart
      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          radius: am5.percent(90),
          innerRadius: am5.percent(50),
          layout: root.horizontalLayout,
        }),
      )

      // Create series
      const series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "value",
          categoryField: "category",
        }),
      )

      // Set custom colors if provided
      series.set(
        "colors",
        am5.ColorSet.new(root, {
          colors: data.map((item) => (item.color ? am5.color(item.color) : undefined)),
        }),
      )

      // Adding gradients
      series.slices.template.set("strokeOpacity", 0)
      series.slices.template.set(
        "fillGradient",
        am5.RadialGradient.new(root, {
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

      // Disabling labels and ticks
      series.labels.template.set("visible", false)
      series.ticks.template.set("visible", false)

      // Create legend
      const legend = chart.children.push(
        am5.Legend.new(root, {
          centerY: am5.percent(50),
          y: am5.percent(50),
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

      // Set data
      series.data.setAll(data)

      // Play initial series animation
      series.appear(1000, 100)
    }
  }, [data])

  return <AmChartBase chartId={chartId} height={height} createChartFn={createChart} />
}
