import React, { useRef } from 'react'
import styled from 'styled-components'
import ProductsCard from './ProductsCard'

const ListProduct = styled.div`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 2rem 1.2rem;
  justify-items: center;
`

const Products = React.memo(({ products }) => {
  const ref = useRef(0)

  return (
    <ListProduct>
      <h2>render: {ref.current++}</h2>
      {products.map((product) => (
        <ProductsCard key={product._id} product={product} />
      ))}
    </ListProduct>
  )
})

export default Products
