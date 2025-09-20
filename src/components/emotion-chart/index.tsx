import React, { useEffect } from 'react'
import * as echarts from 'echarts'

interface EmotionChartProps {
  data: { name: string; noteValue: number; commentValue: number }[]
}

const EmotionChart = (props: EmotionChartProps) => {
  const { data } = props

  useEffect(() => {
    const chartDom = document.getElementById('emotion-chart')
    // eslint-disable-next-line import/namespace
    const myChart = echarts.init(chartDom!)

    const option = {
      title: {
        text: '笔记与评论情感分布对比',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        data: ['笔记', '评论'],
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.name),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '笔记',
          type: 'bar',
          data: data.map((item) => item.noteValue),
          itemStyle: { color: '#4caf50' }, // 绿色
        },
        {
          name: '评论',
          type: 'bar',
          data: data.map((item) => item.commentValue),
          itemStyle: { color: '#2196f3' }, // 蓝色
        },
      ],
    }

    myChart.setOption(option)

    return () => {
      myChart.dispose()
    }
  }, [data])

  return <div id="emotion-chart" style={{ width: '100%', height: '400px' }}></div>
}

export default EmotionChart
