import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Products from '../components/Products'

const ListPage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/products').then((res) => {
      setProducts(res.data.products)
    })
  }, [])

  return (
    <div>
      <Products products={products} />
    </div>
  )
}

export default ListPage
