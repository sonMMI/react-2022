import ProductFeature from 'features/Product'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ProductFeature />} />
        <Route path="/products/*" element={<ProductFeature />} />
      </Routes>
    </div>
  )
}

export default App
