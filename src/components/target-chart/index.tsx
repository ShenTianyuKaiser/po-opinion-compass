import React, { useEffect } from 'react'
import * as echarts from 'echarts'

interface TargetChartProps {
  data: { name: string; value: number }[]
}

const TargetChart = (props: TargetChartProps) => {
  const { data } = props

  useEffect(() => {
    const chartDom = document.getElementById('target-chart')
    // eslint-disable-next-line import/namespace
    const myChart = echarts.init(chartDom!)

    const option = {
      title: {
        text: '笔记作者目的分布',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)', // 显示名称、数值和百分比
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: data.map((item) => item.name),
      },
      series: [
        {
          name: '作者目的',
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label: {
            formatter: '{b}: {c} ({d}%)', // 显示名称、数值和百分比
          },
        },
      ],
    }

    myChart.setOption(option)

    return () => {
      myChart.dispose()
    }
  }, [data])

  return <div id="target-chart" style={{ width: '100%', height: '400px' }}></div>
}

export default TargetChart
