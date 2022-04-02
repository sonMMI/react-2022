import Header from 'components/Header'
import DetailPage from 'features/Product/pages/DetailPage'
import FilterPage from 'features/Product/pages/FilterPage'
import ListPage from 'features/Product/pages/ListPage'
import SearchPage from 'features/Product/pages/SearchPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/products" element={<ListPage />} />
        <Route path="/products/:id" element={<DetailPage />} />
        <Route path="/search/:value" element={<SearchPage />} />
        <Route path="/filter/:option/:value" element={<FilterPage />} />
      </Routes>
    </div>
  )
}

export default App
