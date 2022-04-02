import React from 'react'
import styled from 'styled-components'
import usePagination from '../hooks/usePagination'

const StylePagination = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & > button {
    border: none;
    outline: none;
    background: transparent;
    border-radius: 5px;
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color 0.3s;
    cursor: pointer;
  }

  & > button.active {
    background-color: crimson;
    color: white;
  }

  & > button:hover:not(.active) {
    background-color: #ddd;
  }
`

const Pagination = React.memo(({ totalPages }) => {
  // props Pagination: page, sort
  const { firstArr, lastArr, isActive, prev, next, jump } =
    usePagination(totalPages) // props Pagination: page, sort

  return (
    <StylePagination>
      <button onClick={prev}>&laquo;</button>
      {firstArr.map((num) => (
        <button
          key={num}
          className={`${isActive(num)}`}
          onClick={() => jump(num)}
        >
          {num}
        </button>
      ))}

      {lastArr.length > 0 && <button>...</button>}

      {lastArr.map((num) => (
        <button
          key={num}
          className={`${isActive(num)}`}
          onClick={() => jump(num)}
        >
          {num}
        </button>
      ))}
      <button onClick={next}>&raquo;</button>
    </StylePagination>
  )
})

export default Pagination
