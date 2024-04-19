import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// 引入redux相关
import { Provider } from "react-redux";
import { store } from "./redux/index.js";
// 创建一个根容器
const root = createRoot(document.getElementById("root"));
// 挂载app
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);
