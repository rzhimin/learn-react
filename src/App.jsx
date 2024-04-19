import React, { Suspense } from "react";
import { NavLink, Routes, Route, Navigate, useRoutes } from "react-router-dom";
import Header from "./components/Header";
import routes from "./routes";

export default function App() {
	//根据路由表生成对应的路由规则
	const element = useRoutes(routes);

	// 是否active时候的类名切换
	function computedClassName({ isActive }) {
		return isActive ? "list-group-item buttnActiceClass" : "list-group-item";
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
						{/* 加上属性end,子级路由匹配了的话，父级路由不高亮 */}
						<NavLink className="list-group-item" end to="/home">
							Home
						</NavLink>
						<NavLink className="list-group-item" to="/redux_test">
							React_test
						</NavLink>
						{/* v5有activeClassName,v6弃用了 className动态active类名添加 */}
						<NavLink
							className={({ isActive }) => (isActive ? "list-group-item buttnActiceClass" : "list-group-item")}
							to="/demo1"
						>
							Demo1
						</NavLink>
						{/* 动态active类名添加简写方式 定义一个func */}
						<NavLink className={computedClassName} to="/demo2">
							Thunk
						</NavLink>
					</div>
				</div>
				<div className="col-xs-6">
					<div className="panel">
						{/* 注册路由*/}
						<div className="panel-body">
							{/*方法一： Routes&Route,需要引入对应的组件 */}
							{/*<Routes>
                  <Route path="/home" element={<Home />} />
                  {/* caseSensitive 用于指定匹配时是否区分大小写，默认为false 
                  <Route path="/about" caseSensitive element={<Redux_test />} />
                  <Route path='/' element={<Navigate to='/home' />}></Route>
                </Routes> */}
							{/* 推荐方法二：路由表方式 */}
							<Suspense fallback={<h1>loading.....</h1>}>{element}</Suspense>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
