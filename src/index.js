import axios from 'axios'
import { ContextProvider } from 'features/Product/context/store'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }},
})

axios.defaults.baseURL = 'https://restful-nodejs.herokuapp.com/api'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
