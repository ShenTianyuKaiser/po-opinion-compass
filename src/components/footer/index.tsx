import React, { ReactNode } from 'react'
import { Footer } from 'antd-mobile'
import { ChipItem } from 'antd-mobile/es/components/footer'
import { useNavigate } from 'react-router-dom'
import { HistogramOutline, SearchOutline, UserOutline } from 'antd-mobile-icons'

import './index.less'

interface IProps {
  leftNode?: ReactNode
}
export function FooterPanel(props: IProps) {
  const navigate = useNavigate()
  const chips: ChipItem[] = [
    {
      text: (
        <div className="flex flex-col items-center">
          <SearchOutline fontSize={20} />
          发现
        </div>
      ),
      type: 'link',
    },
    {
      text: (
        <div className="flex flex-col items-center">
          <HistogramOutline fontSize={20} />
          报告
        </div>
      ),
      type: 'link',
    },
    {
      text: (
        <div className="flex flex-col items-center">
          <UserOutline fontSize={20} />
          我的
        </div>
      ),
      type: 'link',
    },
  ]

  const onChipClick = (item: ChipItem, index: number) => {
    console.log('click chip:', item, index)
    // 通过路由跳转
    switch (index) {
      case 0:
        navigate('/')
        break
      case 1:
        navigate('/report')
        break
      case 2:
        navigate('/me')
        break
      default:
        break
    }
  }

  return (
    <div className="fixed left-0 bottom-0 flex w-full items-center justify-between border bg-opacity-70 px-4 md:px-12">
      <Footer className="w-full justify-around" chips={chips} onChipClick={onChipClick} />
    </div>
  )
}
