"use client"

import { useMemo } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import AmChartBase from "./am-chart-base"

interface LivestockGrowthChartProps {
  data: {
    date: string
    goat: number
    sheep: number
    cattle: number
  }[]
  height?: number
}

export default function LivestockGrowthChart({ data, height = 400 }: LivestockGrowthChartProps) {
  const chartId = useMemo(() => `livestock-growth-chart-${Math.random().toString(36).substr(2, 9)}`, [])

  const createChart = useMemo(() => {
    return (root: am5.Root) => {
      // Create chart
      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          layout: root.verticalLayout,
          pinchZoomX: true,
        }),
      )

      // Format data
      const formattedData = data.map((item) => ({
        date: new Date(item.date).getTime(),
        goat: item.goat,
        sheep: item.sheep,
        cattle: item.cattle,
      }))

      // Add cursor
      const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}))
      cursor.lineY.set("visible", false)

      // Create X axis
      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0.3,
          baseInterval: {
            timeUnit: "month",
            count: 1,
          },
          renderer: am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true,
            minGridDistance: 60,
          }),
          tooltip: am5.Tooltip.new(root, {}),
        }),
      )

      // Create Y axis
      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.3,
          renderer: am5xy.AxisRendererY.new(root, {}),
        }),
      )

      // Function to create series
      function createSeries(field: string, name: string, color: am5.Color) {
        const series = chart.series.push(
          am5xy.LineSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: field,
            valueXField: "date",
            stroke: color,
            fill: color,
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "horizontal",
              labelText: "[bold]{name}[/]\n{valueX.formatDate('yyyy-MM-dd')}: [bold]{valueY}[/]",
            }),
          }),
        )

        series.strokes.template.setAll({
          strokeWidth: 2,
        })

        // Add bullet
        series.bullets.push(() =>
          am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
              stroke: color,
              strokeWidth: 2,
              fill: am5.color(0xffffff),
              radius: 4,
            }),
          }),
        )

        series.data.setAll(formattedData)
        series.appear(1000)

        return series
      }

      // Create series
      createSeries("goat", "Goat Growth", am5.color(0xd97706))
      createSeries("sheep", "Sheep Growth", am5.color(0x92400e))
      createSeries("cattle", "Cattle Growth", am5.color(0x78350f))

      // Set date formatter
      root.dateFormatter.setAll({
        dateFormat: "yyyy-MM-dd",
        dateFields: ["valueX"],
      })

      // Add legend
      const legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50,
        }),
      )

      legend.data.setAll(chart.series.values)

      // Add scrollbar
      chart.set(
        "scrollbarX",
        am5.Scrollbar.new(root, {
          orientation: "horizontal",
        }),
      )

      // Make stuff animate on load
      chart.appear(1000, 100)
    }
  }, [data])

  return <AmChartBase chartId={chartId} height={height} createChartFn={createChart} />
}
