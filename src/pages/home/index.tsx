import { List, Card, Input } from 'antd-mobile'
import { mockData } from 'src/pages/home/mock-data'
import { HeartOutline, StarOutline, MessageOutline } from 'antd-mobile-icons'
import './index.less'

export default function Home() {
  // const {data, isInitialLoading, isError} = useListRecords();
  const items = mockData.data?.items || []
  console.log('items:', items)

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

  return (
    <div className="bg-blue-50">
      <List>
        {items?.map((item: any, index) => (
          <List.Item className="w-full relative" key={index}>
            {getItemTitle(item) !== '' && (
              <Card className="rounded-2xl">
                {/*<div className='w-full flex justify-end items-center mb-2'>*/}
                {/*  <Avatar src={item.fields["头像链接"]?.[0]?.text} />*/}
                {/*  <div className='text-xs text-gray-800'>{item.fields["账号名称"]?.[0]?.text || ''}</div>*/}
                {/*</div>*/}
                <div className="absolute flex justify-center items-center top-5 left-5 w-[38px] h-[18px] bg-[#02000066] border-1 border-white rounded-[2px]">
                  <div className="text-white text-[11px]">笔记</div>
                </div>
                <img
                  className="w-full h-[242px] object-fill rounded-t-2xl"
                  src="https://sns-webpic-qc.xhscdn.com/202509201354/f753bcbf6edd2ca0d58981a9f107d37a/notes_pre_post/1040g3k831foqbvdpg6905nvqlhlgbvfu6he6md0!nd_dft_wlteh_webp_3"
                />
                <div className="w-full h-[269px] text-sm leading-6 text-gray-800 p-5 overflow-hidden">
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
            )}
          </List.Item>
        ))}
      </List>
    </div>
  )
}
