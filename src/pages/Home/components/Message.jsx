import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Message() {
	// 编程式导航需要使用useNavigate
	const navigate = useNavigate();

	const [messages] = useState([
		{ id: "001", title: "消息1", content: "锄禾日当午" },
		{ id: "002", title: "消息2", content: "汗滴禾下土" },
		{ id: "003", title: "消息3", content: "谁知盘中餐" },
		{ id: "004", title: "消息4", content: "粒粒皆辛苦" }
	]);

	// 属性只能加state,param和search参数直接加到路径中
	function showDetail(m) {
		navigate("detail", {
			replace: false,
			state: {
				id: m.id,
				title: m.title,
				content: m.content
			}
		});
	}

	return (
		<div>
			<ul>
				{messages.map(m => {
					return (
						// 路由链接
						<li key={m.id}>
						{/* 使用params参数传递，routes文件里需要占位 */}
							{/* <Link to={`detail/${m.id}/${m.title}/${m.content}`}>{m.title}</Link> */}
						{/* 使用search参数传递，routes文件里不需要占位 */}
							{/* <Link to={`detail?id=${m.id}&title=${m.title}&content=${m.content}`}>{m.title}</Link> */}
						{/* 使用state参数传递，routes文件里不需要占位 */}
							<Link
								to="detail"
								state={{
									id: m.id,
									title: m.title,
									content: m.content
								}}
							>
								{m.title}
							</Link>
							&nbsp;
							{/* 使用编程式导航跳转 */}
							<button onClick={() => showDetail(m)}>查看详情</button>
						</li>
					);
				})}
			</ul>
			<hr />
			{/* 指定路由组件的展示位置 */}
			<Outlet />
		</div>
	);
}
