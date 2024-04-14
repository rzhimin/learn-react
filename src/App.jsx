import React from 'react'
// eslint-disable-next-line
import { NavLink, Routes, Route, Navigate, useRoutes } from 'react-router-dom'
// eslint-disable-next-line
import About from './pages/About'
// eslint-disable-next-line
import Home from './pages/Home'
import Header from './components/Header'
import routes from './routes'

export default function App() {
  //根据路由表生成对应的路由规则
  const element = useRoutes(routes)
  // 是否active时候的类名切换
  function computedClassName({ isActive }) {
    return isActive ? 'list-group-item pageBg' : 'list-group-item'
  }
  return (
    <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <Header />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/* 路由链接*/}

            {/* v5有activeClassName,v6弃用了 className动态active类名添加 */}
            {/* <NavLink className={({ isActive }) => isActive ? 'list-group-item pageBg' : 'list-group-item'} to="/about">About</NavLink> */}
            {/* 动态active类名添加简写方式 定义一个func */}
            <NavLink className={computedClassName} to="/about">About</NavLink>

            <NavLink className={({ isActive }) => isActive ? 'list-group-item pageBg' : 'list-group-item'} to="/home">Home</NavLink>

            {/* 路由链接 */}
            {/* <NavLink className="list-group-item" to="/about">about</NavLink>
            // 加上属性end,子级路由匹配了的话，父级路由不高亮
            <NavLink className="list-group-item" end to="/home">Home</NavLink> */}
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              {/* 注册路由 可以使用如下方式，也可以采用路由表方式 */}
              {/*  <Routes>
                <Route path="/about" element={<About />} />
                {/* caseSensitive 用于指定匹配时是否区分大小写，默认为false */}
              {/* <Route path="/ABOUT" caseSensitive element={<About />} /> */}
              {/* <Route path="/home" element={<Home />} />
                <Route path='/' element={<Navigate to='/about' />}></Route>
              </Routes> */}
              {/* 路由表方式 */}
              {element}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
