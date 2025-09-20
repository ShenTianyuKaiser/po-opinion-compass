import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer u-eZ52eZfLpcZUGOTudELsxck1gMFhk5GrpG20lkgw2A_j',
}

export const universeAPI = {
  getList: () => {
    const appToken = 'CasrbbRFqa0Eumscp4Sc24XonMc'
    const tableId = 'tbl4OGDrSPOrUjYi'
    const url = `/api/feishu/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records/search`
    return axios.post(url, {}, { headers })
  },
}

export const useListRecords = () => {
  return useQuery(
    ['listRecords'],
    async () => {
      try {
        const result = await axios.get(
          `/api/feishu/open-apis/bitable/v1/apps/CasrbbRFqa0Eumscp4Sc24XonMc/tables/tbl4OGDrSPOrUjYi/records/search?page_size=20`,
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
