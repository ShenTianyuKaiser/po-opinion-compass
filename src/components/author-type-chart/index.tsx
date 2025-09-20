import React, { useEffect } from 'react'
import * as echarts from 'echarts'

interface PieChartProps {
  data: { name: string; value: number }[]
}

const AuthorTypeChart = (props: PieChartProps) => {
  const { data } = props

  useEffect(() => {
    const chartDom = document.getElementById('pie-chart')
    // eslint-disable-next-line import/namespace
    const myChart = echarts.init(chartDom!)

    const option = {
      title: {
        text: '作者类型分布',
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
          name: '作者类型',
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

  return <div id="pie-chart" style={{ width: '100%', height: '500px' }}></div>
}

export default AuthorTypeChart
