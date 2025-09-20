import { useEffect, useState } from 'react'
import { universeAPI } from 'src/apis'

export const useData = () => {
  const [data, setData] = useState()
  useEffect(() => {
    universeAPI.getList().then((res) => {
      console.warn('res', res)
    })
  }, [])
}
