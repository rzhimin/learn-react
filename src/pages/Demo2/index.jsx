import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addProductAsync, addProductPost, productListGet } from "../../redux/modules/productSlice/index.js";
import ProductChild from './components/children.jsx'

export default function Demo2() {
	// useRef是一个钩子（Hook），它被用来创建一个引用（reference），这个引用可以指向任何值，并且在整个组件的生命周期中保持不变。useRef在处理需要保持跨渲染状态的DOM元素或者其他对象时非常有用。
	const nameRef = useRef();

	const { list: productList, isLoading } = useSelector(state => state.product);

	const dispatch = useDispatch();

	//引入thunk函数
	const onAdd = () => {
		//thunk函数的使用，跟普通的action creator的使用一样
		dispatch(addProductAsync({ name: nameRef.current.value }));
		dispatch(addProductPost({ name: nameRef.current.value }));
	};

	//组件挂载后请求商品数据
	useEffect(() => {
		dispatch(productListGet());
	}, []);

	return (
		<div>
			我是商品页面
			<br />
			商品名：
			<input ref={nameRef} required />
			<br />
			{isLoading ? <div>请求数据中... </div> : productList.map((item, index) => <li key={index}>商品名：{item.name}</li>)}
			<button onClick={onAdd}>新增商品</button>
			<ProductChild />
		</div>
	);
}
