//pages/ProductChild.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectList } from "../../../redux/modules/productSlice";
function ProductChild() {
	/**
	 * 如果要使用selector里面的数据
	 * 那么必须要通过useSelector
	 * 然后把对应的方法传入就可以拿到
	 * 返回值
	 */
	// const list=useSelector(state=>state.product.list.filter(item=>item.name.length>2))
	const filteredList = useSelector(selectList);

	useEffect(() => {
		console.log("子元素重新渲染");
	});

	return (
		<div>
			子元素:
			{filteredList.map(item => (
				<li key={item.name}>{item.name}</li> // 渲染为列表项元素
			))}
		</div>
	);
}
// 为了让子组件跳过没有必要的渲染，我们可以将 子组件包装在 React.memo() 中，这可以确保组件只有在 props 真正更改时才会重新渲染。
export default React.memo(ProductChild);
