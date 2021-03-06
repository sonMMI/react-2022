import { deleteProduct } from 'api/productAPI'
import Modal from 'components/Header/Modal'
import ProductForm from 'components/Header/ProductForm'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import useMutation from '../hooks/useMutation'
import LazyLoadImg from './LazyLoadImg'

const StyledCard = styled.div`
  max-width: 350px;
  width: 100%;
  box-shadow: 2px 8px 20px #ccc;
  border-radius: 10px;
  padding: 1rem;
  transition: 0.5s linear;
  height: min-content;
  overflow: hidden;
  word-wrap: break-word;
  position: relative;

  &:hover {
    box-shadow: none;
    cursor: pointer;
  }
`

const Box = styled.div`
  & > h3 {
    text-transform: uppercase;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 0.3rem;
  }

  & > h3 > span {
    inset: 0;
    position: absolute;
    bottom: 65px;
  }

  & > h4 {
    color: crimson;
  }

  & > div {
    display: flex;
  }
`

const Button = styled.button`
  width: 100%;
  border: none;
  outline: none;
  color: white;
  text-align: center;
  padding: 10px 0;
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;

  ${(props) => {
    return (
      props.edit &&
      css`
        background: rgb(0, 172, 172);
        margin-right: 5px;
      `
    )
  }};

  ${(props) => {
    return (
      props.delete &&
      css`
        background: crimson;
        margin-left: 5px;
      `
    )
  }};
`

const ProductsCard = ({ product }) => {
  const [openProduct, setOpenProduct] = useState(false)
  const { mutate, loading } = useMutation()

  const handleDelete = (id) => {
    if (window.confirm('πAre you sure you want to delete?π')) {
      mutate(() => deleteProduct(id))
    }
  }

  return (
    <StyledCard>
      <LazyLoadImg url={product.image} title={product.title} />

      <Box>
        <h3>
          <Link to={`/products/${product._id}`}>
            <span>{product.title}</span>
          </Link>
        </h3>
        <h4>$ {product.price}</h4>

        <div>
          <Button edit onClick={() => setOpenProduct(true)}>
            Edit
          </Button>
          <Button
            delete
            onClick={() => handleDelete(product._id)}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Delete'}
          </Button>
        </div>
      </Box>

      {/*Product Form */}
      {openProduct && (
        <Modal titleText="Update Product" setOpen={setOpenProduct}>
          <ProductForm btnText="Update" data={product} />
        </Modal>
      )}
    </StyledCard>
  )
}

export default ProductsCard
