import { useEffect, useState } from 'react'
import { universeAPI } from 'src/apis'

export const useData = () => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    universeAPI.getList().then((res) => {
      console.warn('res', res)
      if (res && res.data && res.data.code === 0) setData(res.data.data)
    })
  }, [])

  return {
    data,
  }
}
