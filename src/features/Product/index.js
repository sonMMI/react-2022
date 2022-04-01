import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DetailPage from './pages/DetailPage'
import ListPage from './pages/ListPage'

const ProductFeature = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path=":id" element={<DetailPage />} />
      </Routes>
    </div>
  )
}

export default ProductFeature
