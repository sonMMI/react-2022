import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const StyledSearchForm = styled.form`
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > input {
    background: transparent;
    border: none;
    border-bottom: 1px solid teal;
    outline: none;
    height: 2rem;
    padding: 0 0.5rem;
    flex: 1;
  }

  & > button {
    background: #555;
    border: none;
    outline: none;
    height: 2rem;
    padding: 0 1rem;
    margin-left: 7px;
    cursor: pointer;
    font-weight: 600;
    font-size: medium;
    color: white;
  }
`

const SearchForm = () => {
  const inputRef = useRef()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = inputRef.current.value
    if (!value.trim()) return

    return navigate(`/search/${value}`)
  }

  return (
    <div>
      <StyledSearchForm onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button>Search</button>
      </StyledSearchForm>
    </div>
  )
}

export default SearchForm
