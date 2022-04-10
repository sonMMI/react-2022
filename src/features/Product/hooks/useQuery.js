import axios from 'axios'
import { useCallback, useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'
import { initialState, reduce } from '../context/reducers/queryReducer'
import { useMyContext } from '../context/store'

const DEFAULT_OPTION = {
  sizeCache: 100,
  saveCache: false,
  refetchInterval: 1000,
}

const useQuery = (url, opt = DEFAULT_OPTION.saveCache) => {
  const [query, dispatch] = useReducer(reduce, initialState)

  const { cache } = useMyContext()
  const option = { ...DEFAULT_OPTION, ...opt }

  const clearCache = useCallback(() => {
    if (Object.keys(cache.current).length >= option.sizeCache)
      return (cache.current = {})
  }, [cache, option.sizeCache])

  useEffect(() => {
    let here = true

    if (cache.current[url]) {
      // Data client === Data server when update => delete return
      // setData(cache.current[url])
      dispatch({ type: 'SUCCESS', payload: cache.current[url] })
    }

    const delayDebounce = setTimeout(
      () => {
        if (!cache.current[url]) {
          dispatch({ type: 'LOADING' })
        }

        axios
          .get(url)
          .then((res) => {
            if (!here) return
            // setData(res.data)
            dispatch({ type: 'SUCCESS', payload: res.data })
            if (option.saveCache) {
              cache.current[url] = res.data
            }
          })
          .catch((err) => {
            if (!here) return
            // setError(err.response.data.msg)
            dispatch({ type: 'ERROR', payload: err.response.data.msg })
            toast.error(err.response.data.msg)
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

  return { ...query }
}

export default useQuery
