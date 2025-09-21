import React, { useEffect } from 'react'
import * as echarts from 'echarts'

interface RadarChartProps {
  data: RadarData
}

interface RadarData {
  max: number
  keyword: string
  favoriteCount: number
  commentCount: number
  likeCount: number
}

const RadarChart = (props: RadarChartProps) => {
  const { data } = props
  const { max, keyword, favoriteCount, likeCount, commentCount } = data

  useEffect(() => {
    // 初始化 ECharts 实例
    if (!data) return

    const chartDom = document.getElementById('radar-chart')
    // eslint-disable-next-line import/namespace
    const myChart = echarts.init(chartDom!)

    // 配置项
    const option = {
      title: {
        text: '关键词相关笔记声量分布',
        left: 'center',
      },
      tooltip: {},
      legend: {
        data: [keyword],
        bottom: 0,
      },
      radar: {
        // 定义雷达图的维度
        indicator: [
          { name: '收藏数', max },
          { name: '评论数', max },
          { name: '点赞数', max },
        ],
        radius: '65%',
        center: ['50%', '50%'],
      },
      series: [
        {
          name: '关键词对比',
          type: 'radar',
          data: [
            {
              value: [favoriteCount, commentCount, likeCount], // 关键词2的数据
              name: keyword,
            },
          ],
          label: {
            show: true, // 显示数值
            formatter: (params: any) => params.value, // 格式化显示的数值
            color: '#000', // 数值文字颜色
            fontSize: 12, // 数值文字大小
          },
        },
      ],
    }

    // 设置配置项
    myChart.setOption(option)

    // 清理函数，防止内存泄漏
    return () => {
      myChart.dispose()
    }
  }, [data])

  return (
    <div>
      <div id="radar-chart" style={{ width: '100%', height: '500px' }}></div>
    </div>
  )
}

export default RadarChart
