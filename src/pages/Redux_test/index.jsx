import React, { useState, useRef, useEffect } from "react";
// useSelector 用于从 Redux store 中选取状态，useDispatch 用于派发 action
import { useSelector, useDispatch } from "react-redux";

import { incrementByAmount, decrement, incrementAsync, selectCount } from "../../redux/modules/counterSlice/index.js";

import { addProductAsync, addProductPost, productListGet } from "../../redux/modules/productSlice/index.js";

import ProductChild from "./components/children.jsx";

export default function Redux_test() {
	// 通过useSelector直接拿到store中定义的value
	const value = useSelector(selectCount);
	// 手动编写选择器函数的方式
	// const { value } = useSelector(store => store.counter);

	// useDispatch 是一个 Hook，用于获取 Redux store 的 dispatch 函数。通过 dispatch 函数可以派发 action 来更新 store 中的状态。
	const dispatch = useDispatch();

	const [amount, setAmount] = useState(1);

	// useRef是一个钩子（Hook），它被用来创建一个引用（reference），这个引用可以指向任何值，并且在整个组件的生命周期中保持不变。useRef在处理需要保持跨渲染状态的DOM元素或者其他对象时非常有用。
	const nameRef = useRef();

	const { list: productList, isLoading } = useSelector(state => state.product);

	//引入thunk函数
	const onAdd = () => {
		// thunk函数的使用，跟普通的action creator的使用一样
		// dispatch(addProductAsync({ name: nameRef.current.value }));
		dispatch(addProductPost({ name: nameRef.current.value }));
	};

	//组件挂载后请求商品数据
	useEffect(() => {
		dispatch(productListGet());
	}, [dispatch]);

	return (
		<>
			<h2>Rudex案例</h2>
			<div className="row">
				<h3>案例一</h3>
				<p>处理后的值{value}</p>
				加多少：
				<input style={{ marginBottom: "10px" }} value={amount} onChange={e => setAmount(+e.target.value)} />
				<br />
				<button
					onClick={() => {
						dispatch(incrementByAmount({ value: amount, otherValue: "test" }));
					}}
				>
					直接加(输入框里的值)
				</button>
				&nbsp;
				<button
					onClick={() => {
						dispatch(incrementAsync({ value: amount, name: "ren" }));
					}}
				>
					异步加(一秒后加)
				</button>
				&nbsp;
				<button
					onClick={() => {
						dispatch(decrement());
					}}
				>
					直接减1
				</button>
			</div>
			<div className="row">
				<h3>案例二</h3>
				<div>
					我是商品页面
					<br />
					商品名：
					<input ref={nameRef} />
					<br />
					{isLoading ? <div>请求数据中... </div> : productList.map((item, index) => <li key={index}>商品名：{item.name}</li>)}
					<button onClick={onAdd}>新增商品</button>
					<ProductChild />
				</div>
			</div>
		</>
	);
}
