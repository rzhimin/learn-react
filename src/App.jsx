import React, { Suspense } from "react";
import { NavLink, Routes, Route, Navigate, useRoutes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Redux_test from "./pages/Redux_test";
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
						{/* 加上属性end 完全匹配 /home 时，链接才会激活*/}
						<NavLink className="list-group-item" end to="/home">
							Home
						</NavLink>
						<NavLink className="list-group-item" to="/redux_test">
							redux_test
						</NavLink>
						{/* v5有activeClassName,v6弃用了 */}
						{/* 1.className用动态active类名添加 */}
						<NavLink
							className={({ isActive }) => (isActive ? "list-group-item buttnActiceClass" : "list-group-item")}
							to="/demo1"
						>
							Demo1
						</NavLink>
						{/* 2.定义一个func */}
						<NavLink className={computedClassName} to="/demo2">
							Demo2
						</NavLink>
					</div>
				</div>
				<div className="col-xs-6">
					<div className="panel">
						{/* 注册路由*/}
						<div className="panel-body">
							{/*方法一： Routes&Route,需要引入对应的组件 */}
							<Routes>
								{/* path为精准匹配 caseSensitive匹配时是否区分大小写（默认为 false）*/}
								<Route path="/home1" caseSensitive={true} element={<Home />} />
								{/* caseSensitive 用于指定匹配时是否区分大小写，默认为false  */}
								<Route path="/Redux_test1" caseSensitive element={<Redux_test />} />
								{/*Navigate重定向  URL 会从 / 变为 /home */}
								<Route path="/" element={<Navigate to="/home" />}></Route>
							</Routes>
							{/* 推荐方法二：路由表方式 */}
							{/* Suspense 是 React 提供的一个特性，用于在组件加载过程中显示一个备用内容（fallback），通常用于优化性能和用户体验。*/}
							<Suspense fallback={<h1>loading.....</h1>}>{element}</Suspense>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
