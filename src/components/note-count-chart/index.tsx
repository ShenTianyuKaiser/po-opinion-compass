import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface NoteCountChartProps {
  value: number
  title?: string
}

export default function NoteCountChart({ value, title = '笔记总数' }: NoteCountChartProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    // eslint-disable-next-line import/namespace
    const chart = echarts.init(ref.current)
    chart.setOption({
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: '40%',
          style: {
            text: value.toLocaleString(),
            fontSize: 56,
            fontWeight: 'bold',
            fill: '#2563eb',
          },
        },
        {
          type: 'text',
          left: 'center',
          top: '70%',
          style: {
            text: title,
            fontSize: 20,
            fill: '#666',
          },
        },
      ],
    })
    return () => chart.dispose()
  }, [value, title])

  return <div ref={ref} style={{ width: '100%', height: 180 }} />
}
