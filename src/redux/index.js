import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxPromise from "redux-promise";
import combineReducer from "./modules/index.js";

//数据持久化配置
const persistConfig = {
	key: "root",//存储在 localStorage 中的键名（打开浏览器开发者工具可在 Application > Local Storage 看到）
	storage, //在localStorge中生成key为root的值
	blacklist: [] //在此数组中的 Reducer 名称不会被持久化（例如临时弹窗状态）
};

// 合并Reducers
const reducer = combineReducers(combineReducer);

// 创建持久化 Reducer 
// 将普通 Reducer 包装成支持持久化的 Reducer
// 原理：在每次状态变化时自动将数据保存到 storage（此处为 localStorage）
const myPersistReducer = persistReducer(persistConfig, reducer);

// 自定义的中间件myMiddleware
// 创建一个可查看 Action 分发前后状态的日志中间件
// 中间件的基本结构是一个高阶函数，它接收 store 作为参数，返回一个新的函数，这个新函数又接收 next 作为参数，再返回一个接收 action 的函数。
const myMiddleware = store => next => action => {
	// 在这里可以访问 action 和 store.getState()
	console.log("Action before dispatch:", action, store.getState());
	const result = next(action); // 调用 next() 方法来执行正常的 dispatch 流程
	console.log("Action after dispatch:", action, store.getState());
	return result;
};

// 添加多个中间件,redux-thunk中间件由rtk默认引入了,有顺序要求
const middleWares = [reduxPromise, myMiddleware];

// rtk方法configureStore创建一个store
// 任何通过 store.dispatch(action) 发送的动作都会被 middleWares 处理。在上面的例子中，myMiddleware 会在动作被 dispatch 之前和之后打印日志。
export const store = configureStore({
	// 使用持久化处理后的根 Reducer
	reducer: myPersistReducer,
	// 组合默认中间件和自定义中间件
	// serializableCheck: false  关闭对非序列化数据（如函数）的严格检查（因 redux-persist 的特殊数据结构需要）
	// .concat(middleWares) 将自定义中间件追加到默认中间件之后
	middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(middleWares)
});

// 创建一个持久化管理器，用于控制持久化流程（如手动触发存储）
export const persistor = persistStore(store);
