import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import FilterForm from './FilterForm'
import Modal from './Modal'
import ProductForm from './ProductForm'
import SearchForm from './SearchForm'

const StyledHeader = styled.div`
  width: 100%;
  padding: 1.5rem 1rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 11;
  background: white;

  & > nav {
    display: flex;
    list-style: none;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    & > p {
      font-weight: 600;
      font-size: larger;
      color: darkblue;
      text-transform: uppercase;
      margin: 0 1rem;
      cursor: pointer;
    }
  }
`

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)

  return (
    <StyledHeader>
      <nav>
        <p>
          <Link to="/">Home</Link>
        </p>
        <p onClick={() => setOpenCreate(true)}>Create Product</p>
        <p onClick={() => setOpenSearch(true)}>Search</p>
        <p onClick={() => setOpenFilter(true)}>Filter</p>
      </nav>

      {/* Modal Create Product */}
      {openCreate && (
        <Modal titleText="Create Product" setOpen={setOpenCreate}>
          <ProductForm btnText="Add" />
        </Modal>
      )}

      {/* Modal Search */}
      {openSearch && (
        <Modal titleText="Search" setOpen={setOpenSearch}>
          <SearchForm />
        </Modal>
      )}

      {/* Modal Filter */}
      {openFilter && (
        <Modal titleText="Filter" setOpen={setOpenFilter}>
          <FilterForm />
        </Modal>
      )}
    </StyledHeader>
  )
}

export default Header
