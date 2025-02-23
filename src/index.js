import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// App 是应用的根组件，通常包含路由配置和全局布局
import App from "./App";
// 引入redux相关
import { Provider } from "react-redux";
import { store } from "./redux/index.js";
// 创建一个根容器
// createRoot 是 React 18 引入的新 API，用于创建 React 应用的根容器，替代了之前的 ReactDOM.render。支持并发渲染（Concurrent Rendering），提供了更好的性能和用户体验。
const root = createRoot(document.getElementById("root"));
// 挂载app
root.render(
	// 使用 HTML5 的 history API 来保持 UI 和 URL 的同步
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);
