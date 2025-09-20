import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

interface WordCloudProps {
  id: string
  data: { name: string; value: number }[]
  title: string
}

const WordCloudChart = (props: WordCloudProps) => {
  const { id, data, title } = props

  useEffect(() => {
    const chartDom = document.getElementById(id)
    // eslint-disable-next-line import/namespace
    const myChart = echarts.init(chartDom!)

    const option = {
      title: {
        text: title,
        left: 'center',
      },
      tooltip: {
        show: true,
      },
      series: [
        {
          type: 'wordCloud',
          gridSize: 10,
          sizeRange: [12, 50], // 字体大小范围
          rotationRange: [-90, 90], // 文字旋转角度范围
          shape: 'star', // 词云形状，可选：'circle', 'cardioid', 'diamond', 'triangle-forward', 等
          textStyle: {
            normal: {
              color: () => {
                // 随机颜色
                return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
                  Math.random() * 256,
                )})`
              },
            },
          },
          data: data,
        },
      ],
    }

    myChart.setOption(option)

    return () => {
      myChart.dispose()
    }
  }, [data, title])

  return <div id={id} style={{ width: '100%', height: '500px' }}></div>
}

export default WordCloudChart
