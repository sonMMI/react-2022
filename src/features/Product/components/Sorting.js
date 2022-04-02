import React from 'react'
import styled from 'styled-components'
import useCustomRouter from '../hooks/useCustomRouter'

const StyleSort = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > select {
    margin-right: 5px;
    border: 2px solid rgb(0, 172, 172);
    color: rgb(0, 172, 172);
  }

  & > h2 {
    color: rgb(0, 172, 172);
    text-transform: uppercase;
    letter-spacing: 0.06rem;
    cursor: pointer;
  }
`

const Sorting = React.memo(({ page, sort }) => {
  const { pushQuery } = useCustomRouter()

  const handleChange = (e) => {
    const { value } = e.target
    pushQuery({
      page,
      sort: value,
    })
  }

  return (
    <StyleSort>
      <select onChange={handleChange} value={sort}>
        <option value="-createAt">Newest</option>
        <option value="createAt">Oldest</option>
        <option value="-price">Hight-Low</option>
        <option value="price">Low-Hight</option>
      </select>
      <h2>&#8678;Sort</h2>
    </StyleSort>
  )
})

export default Sorting
