import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Products from '../components/Products'
import useQuery from '../hooks/useQuery'

const SearchPage = () => {
  const [products, setProducts] = useState([])

  const { value } = useParams()
  console.log(value)
  const { data, loading, error } = useQuery(`/products?search=${value}`)

  useEffect(() => {
    if (data?.products) setProducts(data?.products)
  }, [data?.products])

  return (
    <div>
      <Products products={products} />
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
    </div>
  )
}

export default SearchPage
