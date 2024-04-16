import React from 'react'
import About from '../pages/About'
import Home from '../pages/Home'
import Message from '../pages/Message'
import News from '../pages/News'
import Detail from '../pages/Detail'
import { Navigate } from 'react-router-dom'

export default [
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'news',
        element: <News />,
      },
      {
        path: 'message',
        element: <Message />,
        children: [
          {
            // 使用params参数传递，routes文件里需要占位
            // path:'detail/:id/:title/:content',
            // 使用search/state参数传递，routes文件里不需要占位
            path: 'detail',
            element: <Detail />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/about" />,
  },
]
