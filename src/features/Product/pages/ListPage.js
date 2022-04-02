import React, { useEffect, useMemo, useState } from 'react'
import Pagination from '../components/Pagination'
import Products from '../components/Products'
import Sorting from '../components/Sorting'
import { useMyContext } from '../context/store'
import useQuery from '../hooks/useQuery'

const ListPage = () => {
  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(5)
  const { page, sort } = useMyContext()

  // const { search } = useLocation()

  // const { page, sort } = useMemo(() => {
  //   const page = new URLSearchParams(search).get('page') || 1
  //   const sort = new URLSearchParams(search).get('sort') || '-createdAt'
  //   return { page: Number.parseInt(page), sort: sort }
  // }, [search])

  const { data, loading, error } = useQuery(
    `/products?limit=${limit}&page=${page}&sort=${sort}`
  )

  useEffect(() => {
    if (data?.products) setProducts(data?.products)
  }, [data?.products])

  const totalPages = useMemo(() => {
    if (!data?.count) return 0
    return Math.ceil(data.count / limit)
  }, [data?.count, limit])

  return (
    <div>
      <Sorting /> {/* Props Sorting: page={page} sort={sort}  */}
      <Products products={products} />
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <Pagination totalPages={totalPages} />
      {/* Props Pagination: page={page} sort={sort}  */}
    </div>
  )
}

export default ListPage
