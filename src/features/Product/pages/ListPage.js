import React, { useEffect, useMemo, useState } from 'react'
import Pagination from '../components/Pagination'
import Products from '../components/Products'
import Sorting from '../components/Sorting'
import { useMyContext } from '../context/store'
import { useQuery } from 'react-query'
import { getData } from 'api/productAPI'

const ListPage = () => {
  // const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(5)
  const { page, sort, refetching } = useMyContext()

  // const { search } = useLocation()

  // const { page, sort } = useMemo(() => {
  //   const page = new URLSearchParams(search).get('page') || 1
  //   const sort = new URLSearchParams(search).get('sort') || '-createdAt'
  //   return { page: Number.parseInt(page), sort: sort }
  // }, [search])

  //  ======use query custom hook=======
  // const { data, loading, error } = useQuery(
  //   `/products?limit=${limit}&page=${page}&sort=${sort}`,
  //   { saveCache: true, refetching }
  // )

  const key = `/products?limit=${limit}&page=${page}&sort=${sort}`
  const { data, isLoading, error } = useQuery(key, getData)

  // useEffect(() => {
  //   if (data?.products) setProducts(data?.products)
  // }, [data?.products])

  const totalPages = useMemo(() => {
    if (!data?.count) return 0
    return Math.ceil(data.count / limit)
  }, [data?.count, limit])

  return (
    <div>
      {/* Props Sorting: page={page} sort={sort}  */}
      <Sorting />
      {/* <Products products={products} /> */}
      {data && <Products products={data.products} />}
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}
      <Pagination totalPages={totalPages} />
      {/* Props Pagination: page={page} sort={sort}  */}
    </div>
  )
}

export default ListPage
