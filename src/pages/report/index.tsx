import { useData } from 'src/hooks/useData'
import RadarChart from 'src/components/radar-chart'

export default function Report() {
  const { data } = useData()
  const items: any[] = (data?.items || []).filter((item: any) => item.fields['笔记标题']?.[0]?.text !== '')
  const radarChartData = {
    keyword: '关键词',
    noteCount: items.length,
    favoriteCount: items.reduce((sum, item) => sum + Number(item.fields['收藏数']?.[0]?.text || 0), 0),
    commentCount: items.reduce((sum, item) => sum + Number(item.fields['评论数']?.[0]?.text || 0), 0),
    shareCount: items.reduce((sum, item) => sum + Number(item.fields['分享数']?.[0]?.text || 0), 0),
    likeCount: items.reduce((sum, item) => sum + Number(item.fields['点赞数']?.[0]?.text || 0), 0),
  }

  return <div className="bg-blue-50 min-h-[900px]">{<RadarChart data={radarChartData} />}</div>
}
