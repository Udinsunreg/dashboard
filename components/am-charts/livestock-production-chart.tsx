"use client"

import { useMemo } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import AmChartBase from "./am-chart-base"

interface LivestockProductionChartProps {
  data: {
    date: string
    target: number
    actual: number
    forecast?: number
  }[]
  height?: number
}

export default function LivestockProductionChart({ data, height = 400 }: LivestockProductionChartProps) {
  const chartId = useMemo(() => `livestock-production-chart-${Math.random().toString(36).substr(2, 9)}`, [])

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

      // Set color step
      chart.get("colors").set("step", 3)

      // Format data
      const formattedData = data.map((item) => ({
        date: new Date(item.date).getTime(),
        target: item.target,
        actual: item.actual,
        forecast: item.forecast,
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
      function createSeries(field: string, name: string, color: am5.Color, dashed = false) {
        const series = chart.series.push(
          am5xy.SmoothedXLineSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: field,
            valueXField: "date",
            stroke: color,
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "horizontal",
              getFillFromSprite: false,
              labelText: "[bold]{name}[/]\n{valueX.formatDate('yyyy-MM-dd')}: [bold]{valueY}[/]",
            }),
          }),
        )

        series.get("tooltip").get("background").setAll({
          fillOpacity: 0.7,
          fill: color,
          pointerBaseWidth: 0,
        })

        series.strokes.template.setAll({
          strokeWidth: 2,
        })

        if (dashed) {
          series.strokes.template.set("strokeDasharray", [5, 3])
        }

        series.data.setAll(formattedData)
        series.appear(1000)

        return series
      }

      // Create series
      createSeries("actual", "Actual Production", am5.color(0xd97706))
      createSeries("target", "Target Production", am5.color(0x78350f), true)

      // Create forecast series if data exists
      if (formattedData.some((item) => item.forecast !== undefined)) {
        createSeries("forecast", "Forecast", am5.color(0x92400e), true)
      }

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

      // Make stuff animate on load
      chart.appear(1000, 100)
    }
  }, [data])

  return <AmChartBase chartId={chartId} height={height} createChartFn={createChart} />
}
