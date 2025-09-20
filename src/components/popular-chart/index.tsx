import React, { useEffect } from 'react'
import * as echarts from 'echarts'

interface Note {
  title: string
  likes: number
}

interface PopularChartProps {
  data: Note[]
}

const PopularChart = (props: PopularChartProps) => {
  const { data } = props

  useEffect(() => {
    const chartDom = document.getElementById('popular-chart')
    // eslint-disable-next-line import/namespace
    const myChart = echarts.init(chartDom!)

    // 按点赞数排序，取前 5 条，并将点赞数最高的放在最上面
    const topNotes = [...data]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 5)
      .reverse()

    const option = {
      title: {
        text: '最热门的 5 条笔记',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: 'category',
        data: topNotes.map(() => ''), // Y 轴没有文字
        axisLabel: {
          show: false, // 隐藏 Y 轴文字
        },
        axisLine: {
          show: false, // 隐藏 Y 轴线
        },
        axisTick: {
          show: false, // 隐藏 Y 轴刻度
        },
      },
      series: [
        {
          name: '点赞数',
          type: 'bar',
          data: topNotes.map((note) => note.likes),
          label: {
            show: true,
            position: 'bottom', // 标签放在柱子上
            padding: [0, 0, 0, 100], // 标签和柱子之间的距离
            formatter: (params: any) => {
              const note = topNotes[params.dataIndex]
              return `${note.title} (${note.likes} 点赞)` // 拼接标题和点赞数
            },
          },
          itemStyle: {
            color: '#4caf50',
          },
        },
      ],
    }

    myChart.setOption(option)

    return () => {
      myChart.dispose()
    }
  }, [data])

  return <div id="popular-chart" style={{ width: '100%', height: '400px' }}></div>
}

export default PopularChart
