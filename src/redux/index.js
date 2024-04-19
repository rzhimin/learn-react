// redux index 创建store
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxPromise from "redux-promise";
import combineReducer from "./modules/index.js";

//数据持久化配置
const persistConfig = {
	key: "root",
	storage, //在localStorge中生成key为root的值
	blacklist: [] //不持久数据的黑名单
};

// 合并数据
const reducer = combineReducers(combineReducer);

// 持久化数据
const myPersistReducer = persistReducer(persistConfig, reducer);

// 自定义的中间件myMiddleware：创建一个 middleware 函数。这个函数会接收一个 store 作为参数，这个 store 对象包含了 dispatch 方法和应用的状态。
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
	reducer: myPersistReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(middleWares)
});

//持久化仓库
export const persistor = persistStore(store);
