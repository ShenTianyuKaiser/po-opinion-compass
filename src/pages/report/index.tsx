import { List } from 'antd-mobile'
import { useData } from 'src/hooks/useData'
import RadarChart from 'src/components/radar-chart'
import AuthorTypeChart from 'src/components/author-type-chart'
import TargetChart from 'src/components/target-chart'
import EmotionChart from 'src/components/emotion-chart'
import WordCloudChart from 'src/components/word-cloud-chart'
import PopularChart from 'src/components/popular-chart'

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

  const authorData = [
    { name: '经销商', value: 40 },
    { name: '车评人', value: 30 },
    { name: '网红', value: 20 },
    { name: '车主', value: 50 },
    { name: '品牌爱好者', value: 10 },
  ]

  const targetData = [
    { name: '种草', value: 70 },
    { name: '测评', value: 20 },
    { name: '晒单', value: 10 },
    { name: '其他', value: 5 },
  ]

  const emotionData = [
    { name: '正面', noteValue: 60, commentValue: 120 },
    { name: '中性', noteValue: 30, commentValue: 60 },
    { name: '负面', noteValue: 10, commentValue: 20 },
  ]

  // 把item中的笔记标题都取出来，做成词云数据
  const noteData = []
  const noteMap: any = {}
  items.forEach((item) => {
    const title = item.fields['笔记标题']?.[0]?.text || ''
    const words = title.split(' ')
    words.forEach((word: string) => {
      if (noteMap[word]) {
        noteMap[word] += 1
      } else {
        noteMap[word] = 1
      }
    })
  })
  for (const word in noteMap) {
    noteData.push({ name: word, value: noteMap[word] })
  }

  // 把items中所有的标签取出来，做成词云数据
  const tagData = []
  const tagMap: any = {}
  items.forEach((item) => {
    const tags = item.fields['笔记标签']?.[0]?.text.split(',') || []
    tags.forEach((tag: string) => {
      if (tagMap[tag]) {
        tagMap[tag] += 1
      } else {
        tagMap[tag] = 1
      }
    })
  })
  for (const tag in tagMap) {
    tagData.push({ name: tag, value: tagMap[tag] })
  }

  // 把items中所有的作者取出来，做成词云数据
  const authorDataCloud = []
  const authorMap: any = {}
  items.forEach((item) => {
    const author = item.fields['账号名称']?.[0]?.text || ''
    if (authorMap[author]) {
      authorMap[author] += 1
    } else {
      authorMap[author] = 1
    }
  })
  for (const author in authorMap) {
    authorDataCloud.push({ name: author, value: authorMap[author] })
  }

  // 最热的五条笔记,按点赞数排序，点赞数降序排列
  const popularData = items
    .map((item) => ({
      title: item.fields['笔记标题']?.[0]?.text || '',
      likes: Number(item.fields['点赞数']?.[0]?.text || 0),
    }))
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5)

  return (
    <div className="bg-blue-50 min-h-[900px]">
      <List>
        <List.Item title="关键词声量分布">
          <RadarChart data={radarChartData} />
        </List.Item>
        <List.Item title="作者类型分布">
          <AuthorTypeChart data={authorData} />
        </List.Item>
        <List.Item title="作者发笔记意图分布">
          <TargetChart data={targetData} />
        </List.Item>
        <List.Item title="情感分布分析">
          <EmotionChart data={emotionData} />
        </List.Item>
        <List.Item title="词云图">
          <div>
            <WordCloudChart id="note-word-cloud-chart" data={noteData} title="笔记词云" />
            <WordCloudChart id="tag-word-cloud-chart" data={tagData} title="话题标签词云" />
            <WordCloudChart id="author-word-cloud-chart" data={authorDataCloud} title="作者词云" />
          </div>
        </List.Item>
        <List.Item title="最热的五条笔记">
          <PopularChart data={popularData} />
        </List.Item>
      </List>
    </div>
  )
}
