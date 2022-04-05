import { createProduct, updateProduct } from 'api/productAPI'
import useMutation from 'features/Product/hooks/useMutation'
import React, { useRef } from 'react'
import styled from 'styled-components'

const StyledProductForm = styled.div`
  & > form > input {
    width: 100%;
    height: 35px;
    background: transparent;
    margin: 0.5rem 0;
    border: none;
    outline: none;
    border-bottom: 1px solid teal;
  }

  & > button {
    width: 100%;
    padding: 0.6rem 1rem;
    margin-top: 0.5rem;
    border: none;
    outline: none;
    background: #555;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: 600;
    cursor: pointer;
  }
`

const ProductForm = ({ btnText, data }) => {
  const multiRef = useRef()
  const { mutate, loading } = useMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    const children = multiRef.current.children

    const newData = [...children].reduce((obj, child) => {
      return { ...obj, [child.name]: child.value }
    }, {})

    if (data) {
      const newArr = { ...newData, price: Number.parseInt(newData.price) }
      const result = shallowEqual(newArr, data)
      if (result) return

      mutate(() => updateProduct({ id: data._id, newData }))
    } else {
      mutate(() => createProduct(newData))
    }
  }

  function shallowEqual(obj1, obj2) {
    // obj1 = newData(because: key: newData < key: OldData)
    const keys = Object.keys(obj1)

    for (let key of keys) {
      if (obj1[key] !== obj2[key]) {
        return false
      }
    }
    return true
  }

  return (
    <StyledProductForm>
      <form ref={multiRef} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Product title"
          required
          defaultValue={data?.title}
        />
        <input
          type="text"
          name="description"
          placeholder="Product description"
          required
          defaultValue={data?.description}
        />
        <input
          type="text"
          name="price"
          placeholder="Product price"
          required
          defaultValue={data?.price}
        />
        <input
          type="text"
          name="category"
          placeholder="Product category"
          required
          defaultValue={data?.category}
        />
        <input
          type="text"
          name="image"
          placeholder="Product image"
          required
          defaultValue={data?.image}
        />
      </form>
      <button onClick={handleSubmit} disabled={loading}>
        {btnText}
      </button>
    </StyledProductForm>
  )
}

export default ProductForm
