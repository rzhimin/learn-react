import React, { useState } from "react";
import { Navigate, Outlet, NavLink, useOutlet } from "react-router-dom";

export default function Home() {
	// 用来呈现当前组件中渲染的嵌套路由对象，没有挂载为null
	console.log("useOutlet()输出值：", useOutlet());

	const [sum, setSum] = useState(1);

	return (
		<div>
			<h3>我是Home的内容</h3>
			<h4>主要展示路由和传参</h4>
			<h4>控制台打印了useOutLet的结果</h4>
			{/* 简单操作 */}
			<div>
				{/* 点击后会跳转到Redux_test页面  默认push模式 replace默认为false  */}
				{sum === 2 ? <Navigate to="/redux_test" replace={true} /> : <h4>当前sum的值是：{sum}</h4>}
				<button style={{ marginBottom: "10px" }} onClick={() => setSum(2)}>
					点我将sum变为2,并跳至redux_test页面
				</button>
			</div>
			{/* 路由嵌套 */}
			<div>
				<ul className="nav nav-tabs" style={{ marginBottom: "10px" }}>
					<li>
						<NavLink className="list-group-item" to="news">
							News
						</NavLink>
					</li>
					<li>
						<NavLink className="list-group-item" to="message">
							Message
						</NavLink>
					</li>
				</ul>
				{/* 指定路由组件呈现的位置 */}
				<Outlet />
			</div>
		</div>
	);
}
