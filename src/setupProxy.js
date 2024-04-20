// 配置代理
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api1",
		createProxyMiddleware({
			//遇见/api1前缀的请求，就会触发该代理配置
			target: "http://localhost:5000", //请求转发给谁
			changeOrigin: true, //控制服务器收到的请求头中Host的值
			pathRewrite: { "^/api1": "" } //重写请求路径(必须)
		})
	);
	app.use(
		"/api2",
		createProxyMiddleware({
			//遇见/api2前缀的请求，就会触发该代理配置
			target: "http://localhost:5001", //请求转发给谁
			changeOrigin: true, //控制服务器收到的请求头中Host的值
			pathRewrite: { "^/api2": "" } //重写请求路径(必须)
		})
	);
};