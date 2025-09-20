import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useListRecords = () => {
  return useQuery(
    ['listRecords'],
    async () => {
      try {
        const result = await axios.get(
          `https://open.feishu.cn/open-apis/bitable/v1/apps/CasrbbRFqa0Eumscp4Sc24XonMc/tables/tbl4OGDrSPOrUjYi/records/search?page_size=20`,
          {
            headers: {
              Authorization: 'Bearer t-g1049kdy5XR5NY6ZET2COAICVJIVKITUBNI4V456',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          },
        )
        return result
      } catch (err: any) {
        console.error('error code', err.code)
        console.error('error message', err.message)
        throw new Error('Error calling the GRPC API')
      }
    },
    { staleTime: 0 },
  )
}
