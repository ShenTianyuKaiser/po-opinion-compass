import { Avatar } from 'antd-mobile'
import { EyeOutline, StarOutline } from 'antd-mobile-icons'

export default function UserInfoPanel() {
  return (
    <div className="flex items-center justify-between w-full h-14 bg-black sticky top-0 z-[10000] px-5 border-b-[0.5px] border-gray-700">
      <div className="w-full flex items-center gap-2">
        <Avatar className="rounded-full" src="/imgs/avatar.png" />
        <div className="text-lg font-medium text-white">保时捷小迷妹</div>
      </div>
      <div className="flex items-center gap-2 text-white">
        <div className="flex items-center gap-[2px]">
          <StarOutline fontSize={20} />
          <div className="text-[13px] whitespace-nowrap">今日TOP1</div>
        </div>
        <div className="flex items-center gap-[2px]">
          <EyeOutline fontSize={20} />
          <div className="text-[13px] whitespace-nowrap">已阅100</div>
        </div>
      </div>
    </div>
  )
}
