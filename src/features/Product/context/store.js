import react, { useContext, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export const Store = react.createContext()

export const useMyContext = () => useContext(Store)

export const ContextProvider = ({ children }) => {
  const { search } = useLocation()
  const cache = useRef({})

  const { page, sort } = useMemo(() => {
    const page = new URLSearchParams(search).get('page') || 1
    const sort = new URLSearchParams(search).get('sort') || '-createdAt'
    return { page: Number.parseInt(page), sort: sort }
  }, [search])

  const value = { page, sort, cache }

  return <Store.Provider value={value}>{children}</Store.Provider>
}
