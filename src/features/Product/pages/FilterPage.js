import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Products from '../components/Products'
import Sorting from '../components/Sorting'
import { useMyContext } from '../context/store'
import useQuery from '../hooks/useQuery'

const Button = styled.button`
  background: white;
  border: 2px solid green;
  padding: 10px 20px;
  margin: 10px auto;
  font-weight: 600;
  text-transform: uppercase;
  display: block;
  cursor: pointer;
`
const FilterPage = () => {
  const { sort } = useMyContext()
  const { option, value } = useParams()
  
  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [stop, setStop] = useState(false)
  
  const btnRef = useRef()

  const { data, loading, error } = useQuery(
    `/products?price[${option}]=${value}&sort=${sort}&limit=${limit}&page=${page}`
  )

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => [...prev, ...data.products])
      if (data.products.length < limit) setStop(true)
    }
  }, [data?.products, limit])

  useEffect(() => {
    setProducts([])
    setPage(1)
    setStop(false)
  }, [value, sort])

  return (
    <div>
      <Sorting />
      <Products products={products} />
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <Button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={stop}
        ref={btnRef}
      >
        Load more
      </Button>
    </div>
  )
}

export default FilterPage
