import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Pagination from '../components/Pagination'
import Products from '../components/Products'
import useQuery from '../hooks/useQuery'

const ListPage = () => {
  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const { search } = useLocation()

  const { data, loading, error } = useQuery(
    `/products?limit=${limit}&page=${page}`
  )

  useEffect(() => {
    if (data?.products) setProducts(data?.products)
  }, [data?.products])

  const totalPages = useMemo(() => {
    if (!data?.count) return 0
    return Math.ceil(data.count / limit)
  }, [data?.count, limit])

  useEffect(() => {
    const page = new URLSearchParams(search).get('page') || 1
    setPage(Number.parseInt(page))
  }, [search])

  return (
    <div>
      <Products products={products} />
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <Pagination totalPages={totalPages} page={page} />
    </div>
  )
}

export default ListPage
