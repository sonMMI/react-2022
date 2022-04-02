import Header from 'components/Header'
import ProductFeature from 'features/Product'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="*" element={<ProductFeature />} />
        <Route path="/products/*" element={<ProductFeature />} />
      </Routes>
    </div>
  )
}

export default App
