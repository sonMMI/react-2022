import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useMyContext } from '../context/store'

const DEFAULT_OPTION = {
  sizeCache: 100,
  saveCache: false,
  refetchInterval: 1000,
}

const useQuery = (url, opt = DEFAULT_OPTION.saveCache) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  const { cache } = useMyContext()
  const option = { ...DEFAULT_OPTION, ...opt }

  const clearCache = useCallback(() => {
    if (Object.keys(cache.current).length >= option.sizeCache)
      return (cache.current = {})
  }, [cache, option.sizeCache])

  useEffect(() => {
    let here = true

    if (cache.current[url]) {
      setData(cache.current[url]) // Data client === Data server when update => delete return
    } else {
      setLoading(true)
    }

    const delayDebounce = setTimeout(
      () => {
        axios
          .get(url)
          .then((res) => {
            if (!here) return
            setData(res.data)
            if (option.saveCache) {
              cache.current[url] = res.data
            }
          })
          .catch((err) => {
            if (!here) return
            setError(err.response.data.msg)
            toast.error(err.response.data.msg)
          })
          .finally(() => {
            if (!here) return
            setLoading(false)
          })
      },
      cache.current[url] ? option.refetchInterval : 0
    )

    clearCache()

    return () => {
      here = false
      clearTimeout(delayDebounce)
    }
  }, [
    url,
    cache,
    clearCache,
    option.saveCache,
    option.refetchInterval,
    option.refetching,
  ])

  return { data, loading, error }
}

export default useQuery
