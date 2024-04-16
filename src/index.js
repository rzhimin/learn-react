import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// 创建一个根容器
const root = createRoot(document.getElementById('root'))
// 挂载app
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
