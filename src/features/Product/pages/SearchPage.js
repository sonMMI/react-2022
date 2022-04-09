import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Products from '../components/Products'
import Sorting from '../components/Sorting'
import { useMyContext } from '../context/store'
import useInfinityQuery from '../hooks/useInfinityQuery'

const SearchPage = () => {
  const { sort } = useMyContext()
  const { value } = useParams()

  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(5)
  const [stop, setStop] = useState(false)
  const [firstLoad, setFirstLoad] = useState(false)

  const { BtnRender, data, loading, error } = useInfinityQuery({
    url: `/products?search=${value}&sort=${sort}&limit=${limit}`,
    dependencies: [value, sort],
    opt: { stop, firstLoad },
  })

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => [...prev, ...data.products])
      setFirstLoad(true)
      if (data.products.length < limit) setStop(true)
    }
  }, [data?.products, limit])

  useEffect(() => {
    setProducts([])
    setStop(false)
    setFirstLoad(false)
  }, [value, sort])

  return (
    <div>
      <Sorting />
      <Products products={products} />
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      {BtnRender()}
    </div>
  )
}

export default SearchPage
