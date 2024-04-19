import React,{ lazy } from 'react'
import { Navigate } from "react-router-dom";
const Redux_test = lazy(() => import("../pages/Redux_test"));
const Home = lazy(() => import("../pages/Home"));
const News = lazy(() => import("../pages/Home/components/News"));
const Message = lazy(() => import("../pages/Home/components/Message"));
const Detail = lazy(() => import("../pages/Home/components/Detail"));
const Demo1 = lazy(() => import("../pages/Demo1"));
const Demo2 = lazy(() => import("../pages/Demo2"));

const routes = [
	{
		path: "/home",
		element: <Home />,
		children: [
			{
				path: "news",
				element: <News />
			},
			{
				path: "message",
				element: <Message />,
				children: [
					{
						// 使用params参数传递，routes文件里需要占位
						// path:'detail/:id/:title/:content',
						// 使用search/state参数传递，routes文件里不需要占位
						path: "detail",
						element: <Detail />
					}
				]
			}
		]
	},
	{
		path: "/redux_test",
		element: <Redux_test />
	},
	{
		path: "/demo1",
		element: <Demo1 />
	},
	{
		path: "/demo2",
		element: <Demo2 />
	},
	{
		path: "/",
		element: <Navigate to="/home" />
	}
];
export default routes;
