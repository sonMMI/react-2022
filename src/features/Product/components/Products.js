import React from 'react'
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

const Products = ({ products }) => {
  return (
    <ListProduct>
      {products.map((product) => (
        <ProductsCard key={product._id} product={product} />
      ))}
    </ListProduct>
  )
}

export default Products
