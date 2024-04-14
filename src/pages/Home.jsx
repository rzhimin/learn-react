import React, { useState } from 'react'
import { Navigate, Outlet, NavLink, useOutlet } from 'react-router-dom'

export default function Home() {
	// 用来呈现当前组件中渲染的嵌套路由对象，没有挂载为null
	console.log('###',useOutlet())
	const [sum, setSum] = useState(1)
	return (
		<div>
			<h3>我是Home的内容</h3>
			<div>
				{/* 点击后会跳转到About页面  默认push模式 replace默认为false  */}
				{sum === 2 ? <Navigate to="/about" replace={true} /> : <h4>当前sum的值是：{sum}</h4>}
				<button onClick={() => setSum(2)}>点我将sum变为2</button>
			</div>
			{/* 路由嵌套 */}
			<div>
				<ul className="nav nav-tabs">
					<li>
						<NavLink className="list-group-item" to="news">News</NavLink>
					</li>
					<li>
						<NavLink className="list-group-item" to="message">Message</NavLink>
					</li>
				</ul>
				{/* 指定路由组件呈现的位置 */}
				<Outlet />
			</div>
		</div>
	)
}
