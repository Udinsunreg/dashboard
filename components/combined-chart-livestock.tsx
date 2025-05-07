"use client"

import { useEffect, useRef } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

export function CombinedChartLivestock() {
  const chartRef = useRef<am5.Root | null>(null)

  useEffect(() => {
    // Initialize chart only once
    if (!chartRef.current) {
      const root = am5.Root.new("livestock-chart-div")
      chartRef.current = root

      // Set themes
      root.setThemes([am5themes_Animated.new(root)])

      // Create chart
      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
          paddingLeft: 0,
        }),
      )

      // Add cursor
      const cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          behavior: "none",
          xAxis: chart.xAxes.getIndex(0),
          yAxis: chart.yAxes.getIndex(0),
        }),
      )
      cursor.lineY.set("visible", false)

      // Create axes
      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0.2,
          baseInterval: {
            timeUnit: "day",
            count: 1,
          },
          renderer: am5xy.AxisRendererX.new(root, {}),
          tooltip: am5.Tooltip.new(root, {}),
        }),
      )

      // Primary Y-axis for milk production (liters)
      const yAxis1 = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
          tooltip: am5.Tooltip.new(root, {}),
        }),
      )

      yAxis1.children.push(
        am5.Label.new(root, {
          rotation: -90,
          text: "Produksi Susu (liter)",
          y: am5.p50,
          centerX: am5.p50,
        }),
      )

      // Secondary Y-axis for weight gain (kg)
      const yAxis2 = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {
            opposite: true,
          }),
          tooltip: am5.Tooltip.new(root, {}),
        }),
      )

      yAxis2.children.push(
        am5.Label.new(root, {
          rotation: 90,
          text: "Pertambahan Berat (kg)",
          y: am5.p50,
          centerX: am5.p50,
        }),
      )

      // Create series for milk production
      const milkSeries = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Produksi Susu",
          xAxis: xAxis,
          yAxis: yAxis1,
          valueYField: "milk",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY} liter",
          }),
          stroke: am5.color(0x1976d2),
          fill: am5.color(0x1976d2),
        }),
      )

      milkSeries.strokes.template.setAll({
        strokeWidth: 2,
      })

      // Create series for weight gain
      const weightSeries = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Pertambahan Berat",
          xAxis: xAxis,
          yAxis: yAxis2,
          valueYField: "weight",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY} kg",
          }),
          stroke: am5.color(0x388e3c),
          fill: am5.color(0x388e3c),
        }),
      )

      weightSeries.strokes.template.setAll({
        strokeWidth: 2,
        strokeDasharray: [3, 3],
      })

      // Create series for feed consumption
      const feedSeries = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Konsumsi Pakan",
          xAxis: xAxis,
          yAxis: yAxis1,
          valueYField: "feed",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY} kg",
          }),
        }),
      )

      feedSeries.columns.template.setAll({
        fillOpacity: 0.5,
        strokeOpacity: 0,
        fill: am5.color(0xffa000),
      })

      // Add legend
      const legend = chart.children.push(am5.Legend.new(root, {}))
      legend.data.setAll(chart.series.values)

      // Add scrollbar
      chart.set(
        "scrollbarX",
        am5.Scrollbar.new(root, {
          orientation: "horizontal",
        }),
      )

      // Sample data
      const data = [
        {
          date: new Date(2023, 0, 1).getTime(),
          milk: 15.2,
          weight: 0.7,
          feed: 12.5,
        },
        {
          date: new Date(2023, 0, 5).getTime(),
          milk: 15.5,
          weight: 0.75,
          feed: 12.8,
        },
        {
          date: new Date(2023, 0, 10).getTime(),
          milk: 16.1,
          weight: 0.8,
          feed: 13.2,
        },
        {
          date: new Date(2023, 0, 15).getTime(),
          milk: 16.5,
          weight: 0.85,
          feed: 13.5,
        },
        {
          date: new Date(2023, 0, 20).getTime(),
          milk: 16.8,
          weight: 0.9,
          feed: 13.8,
        },
        {
          date: new Date(2023, 0, 25).getTime(),
          milk: 17.2,
          weight: 0.95,
          feed: 14.0,
        },
        {
          date: new Date(2023, 0, 30).getTime(),
          milk: 17.5,
          weight: 1.0,
          feed: 14.2,
        },
      ]

      milkSeries.data.setAll(data)
      weightSeries.data.setAll(data)
      feedSeries.data.setAll(data)

      // Make stuff animate on load
      milkSeries.appear(1000)
      weightSeries.appear(1000)
      feedSeries.appear(1000)
      chart.appear(1000, 100)
    }

    return () => {
      // Clean up chart when component unmounts
      if (chartRef.current) {
        chartRef.current.dispose()
      }
    }
  }, [])

  return <div id="livestock-chart-div" className="h-[400px] w-full" />
}
