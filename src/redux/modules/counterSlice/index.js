import { createSlice } from "@reduxjs/toolkit";

// createSlice 函数接收一个配置对象作为参数，用于定义 slice 的各种属性
export const counterSlice = createSlice({
	// 为这个 slice 命名，通常用于在 Redux 开发者工具中标识该 slice，也会影响生成的 action type 的命名。
	name: "counter",
	initialState: {
		value: 0
	},
	//reducers 属性是一个对象，用于定义该 slice 的各种 action 对应的 reducer 函数。每个键值对代表一个 action 和对应的处理逻辑。
	reducers: {
		// 		incrementByAmount 是一个 action 的名称。
		// 对应的 reducer 函数接收两个参数：state 表示当前的状态，{ payload } 是解构赋值，用于获取 action 中的 payload 属性。
		// 在函数内部，将 state.value 增加 payload.value 的值。Redux Toolkit 内部使用了 immer 库，允许我们以可变的方式编写不可变的代码。
		incrementByAmount: (state, { payload }) => {
			// payload会接受传递过来的参数
			state.value += payload.value;
		},
		decrement: state => {
			state.value -= 1;
		},
	}
});

// counterSlice.actions 是一个包含所有 action creators 的对象。
export const { decrement, incrementByAmount } = counterSlice.actions;

// incrementAsync 是一个异步 action，它返回一个函数，该函数接收 dispatch 作为参数。
// 使用 setTimeout 模拟一个异步操作，延迟 1 秒后调用 dispatch 函数，触发 incrementByAmount action。
export const incrementAsync = amount => dispatch => {
	setTimeout(() => {
		dispatch(incrementByAmount(amount));
	}, 1000);
};


// selectCount 是一个选择器函数，用于从 Redux store 的状态中提取 counter slice 的 value 属性。
// 选择器函数可以帮助我们在组件中更方便地获取所需的状态。
export const selectCount = state => state.counter.value;

// counterSlice.reducer 是由 createSlice 函数自动生成的 reducer 函数。
// 通过 export default 导出该 reducer，以便在创建 Redux store 时使用。
export default counterSlice.reducer;
