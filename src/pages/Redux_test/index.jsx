import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { incrementByAmount, decrement, incrementAsync,selectCount } from "../../redux/modules/counterSlice/index.js";

export default function Redux_test() {
	// 通过useSelector直接拿到store中定义的value
	// const { value } = useSelector(store => store.counter);
	const value = useSelector(selectCount);

	// 通过useDispatch 派发事件
	const dispatch = useDispatch();

	const [amount, setAmount] = useState(1);

	return (
		<div className="row">
			<p>处理后的值{value}</p>
			<input style={{ marginBottom: "10px" }} value={amount} onChange={e => setAmount(+e.target.value)} />
			<br />
			<button
				onClick={() => {
					dispatch(incrementByAmount({ value: amount, otherValue: "test" }));
				}}
			>
				加(传参)
			</button>
			&nbsp;
			<button
				onClick={() => {
					dispatch(incrementAsync({ value: amount, name: "ren" }));
				}}
			>
				异步加
			</button>
			&nbsp;
			<button
				onClick={() => {
					dispatch(decrement());
				}}
			>
				减1
			</button>
		</div>
	);
}
