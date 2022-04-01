import React from 'react'
import styled from 'styled-components'

const StyleProductInfo = styled.div`
  padding: 1.5rem 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  justify-items: center;

  & > img {
    width: 100%;
    height: 450px;
    display: block;
    object-fit: contain;
  }
`

const BoxInfo = styled.div`
  width: 100%;

  & > h2 {
    font-size: xx-large;
  }

  & > h3 {
    color: crimson;
    margin: 0.5rem 0;
    font-size: x-large;
  }

  & > p {
    color: #777;
    margin: 0.6rem 0;
    font-size: larger;
    font-weight: 400;
    word-wrap: break-word;
  }

  & > h4 {
    color: #999;
    text-align: right;
    margin: 0.6rem 0;
    font-size: larger;
  }

  & > button {
    width: 100%;
    border: none;
    outline: none;
    background: #333;
    color: white;
    text-align: center;
    padding: 15px 0;
    margin-top: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
  }
`

const ProductInfo = ({ product }) => {
  return (
    <StyleProductInfo>
      <img src={product.image} alt={product.title} />
      <BoxInfo>
        <h2>{product.title}</h2>
        <h3>$ {product.price}</h3>
        <p>{product.description}</p>
        <h4>Category: {product.category}</h4>
        <button>Add To Cart</button>
      </BoxInfo>
    </StyleProductInfo>
  )
}

export default ProductInfo
