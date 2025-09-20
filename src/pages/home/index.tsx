import { List, Card, Input, Button, Space, Modal, Toast } from 'antd-mobile'
import { HeartOutline, StarOutline, MessageOutline, AddOutline, CloseOutline } from 'antd-mobile-icons'
import { useState } from 'react'
import { useData } from 'src/hooks/useData'
import './index.less'

export default function Home() {
  const { data } = useData()
  // const { data, isInitialLoading, isError } = useListRecords()
  const items: any[] = (data?.items || []).filter((item: any) => item.fields['笔记标题']?.[0]?.text !== '')
  const [keywords, setKeywords] = useState<string[]>([])
  const [currentSubsribeInputValue, setCurrentSubsribeInputValue] = useState('')
  const [currentKeyword, setCurrentKeyword] = useState('')

  console.warn('------home---------', { data, items })

  const getItemTags = (item: any) => {
    const tagText = item.fields['笔记标签']?.[0]?.text
    return tagText?.split(',') || []
  }

  const getItemTitle = (item: any) => {
    return item.fields['笔记标题']?.[0]?.text || ''
  }

  const getImgSrc = (item: any) => {
    return item.fields['笔记封面图链接']?.[0]?.text || ''
  }

  const getLikeCount = (item: any) => {
    return item.fields['点赞数']?.[0]?.text || '0'
  }

  const getCommentCount = (item: any) => {
    return item.fields['评论数']?.[0]?.text || '0'
  }

  const getFavoriteCount = (item: any) => {
    return item.fields['收藏数']?.[0]?.text || '0'
  }

  const subscribe = () => {
    if (keywords.length >= 2) {
      Toast.show('最多只能订阅2个关键词')
      return
    }
    let inputValue = ''
    Modal.confirm({
      title: '订阅关键词',
      content: (
        <div>
          <div>输入你想订阅的关键词，最多可订阅2个</div>
          <div className="flex gap-4 items-center">
            <span>关键词</span>
            <Input
              className="bg-[#F2F4F7] rounded-full w-[155px] p-2 mt-2"
              placeholder="例如：保时捷911"
              onChange={(val: string) => {
                inputValue = val
              }}
            />
          </div>
        </div>
      ),
      onConfirm: () => {
        const value = inputValue.trim()
        if (!value) {
          Toast.show('请输入关键词')
          return
        }
        if (keywords.length >= 2) {
          Toast.show('最多只能订阅2个关键词')
          return
        }
        if (keywords.includes(value)) {
          Toast.show('该关键词已订阅')
          return
        }
        setKeywords([...keywords, value])
        setCurrentSubsribeInputValue('')
        setCurrentKeyword(value)
        Toast.show('订阅成功，后续有相关笔记会第一时间通知你~')
      },
      onCancel: () => {
        setCurrentSubsribeInputValue('')
      },
      confirmText: '订阅',
      cancelText: '取消',
    })
  }

  return (
    <div className="bg-blue-50">
      <div className="flex items-center justify-between h-14 w-full bg-black sticky top-0 z-20000 px-5">
        <div className="flex gap-2">
          {keywords.length > 0 ? (
            keywords.map((kw: string) => (
              <div key={kw} className="relative inline-block">
                <Button
                  className={currentKeyword === kw ? 'bg-blue-500 text-white' : 'bg-white text-black'}
                  fill="solid"
                  size="small"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentKeyword(kw)
                  }}
                >
                  <div className="pr-5">{kw}</div>
                </Button>
                <CloseOutline
                  fontSize={20}
                  className="absolute top-[-6px] right-[-6px] bg-white rounded-full border border-gray-200 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    setKeywords(keywords.filter((k) => k !== kw))
                    // 如果删除的是当前选中的关键词，重置 currentKeyword，如果还有其他关键词，选中第一个
                    if (currentKeyword === kw) {
                      setCurrentKeyword('')
                      if (keywords.length > 1) {
                        const newKeywords = keywords.filter((k) => k !== kw)
                        setCurrentKeyword(newKeywords[0])
                      }
                    }
                  }}
                />
              </div>
            ))
          ) : (
            <span className="text-white text-sm">未订阅关键词</span>
          )}
        </div>
        <Button className="bg-white" fill="solid" size="small" onClick={subscribe}>
          <Space>
            <AddOutline fontSize={20} className="mt-[6px]" />
            <div className="mt-1">订阅</div>
          </Space>
        </Button>
      </div>
      <List>
        {items?.map((item: any, index) => (
          <List.Item className="w-full relative" key={index}>
            {
              <Card className="rounded-2xl">
                {/*<div className='w-full flex justify-end items-center mb-2'>*/}
                {/*  <Avatar src={item.fields["头像链接"]?.[0]?.text} />*/}
                {/*  <div className='text-xs text-gray-800'>{item.fields["账号名称"]?.[0]?.text || ''}</div>*/}
                {/*</div>*/}
                <div className="absolute flex justify-center items-center top-5 left-5 w-[38px] h-[18px] bg-[#02000066] border-1 border-white rounded-[2px]">
                  <div className="text-white text-[11px]">笔记</div>
                </div>
                <img className="w-full h-[242px] object-fill rounded-t-2xl" src={getImgSrc(item)} />
                <div className="w-full h-[269px] text-sm leading-6 text-gray-800 p-5 overflow-y-auto">
                  {item.fields['笔记内容']?.[0]?.text || ''}
                </div>
                <div className="w-full flex gap-2 p-5 flex-wrap">
                  {getItemTags(item).map((label: string, idx: number) => (
                    <div
                      className="flex justify-center items-center w-fit h-[22px] px-2 text-black text-[11px] bg-[#F2F4F7] rounded-b"
                      key={idx}
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-between items-center p-5">
                  <Input className="bg-[#F2F4F7] rounded-full w-[155px] p-2" placeholder="pingdiansha~" />
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-[2px]">
                      <HeartOutline fontSize={20} />
                      <div className="text-[13px]">{getLikeCount(item)}</div>
                    </div>
                    <div className="flex items-center gap-[2px]">
                      <StarOutline fontSize={20} />
                      <div className="text-[13px]">{getFavoriteCount(item)}</div>
                    </div>
                    <div className="flex items-center gap-[2px]">
                      <MessageOutline fontSize={20} />
                      <div className="text-[13px]">{getCommentCount(item)}</div>
                    </div>
                  </div>
                </div>
              </Card>
            }
          </List.Item>
        ))}
      </List>
    </div>
  )
}
