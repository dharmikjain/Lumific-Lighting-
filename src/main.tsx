import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './AppRouter.tsx'
import './index.css'

console.log('main.tsx loading...')

// Clear loading message
const loading = document.getElementById('loading')
if (loading) {
  console.log('Clearing loading message')
  loading.remove()
} else {
  console.warn('Loading element not found')
}

const root = document.getElementById('root')
if (!root) {
  console.error('Root element not found!')
  throw new Error('Root element not found in HTML')
}

console.log('Creating React root and rendering App')
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)

console.log('App rendered successfully')
