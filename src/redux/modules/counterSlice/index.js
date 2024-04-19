import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
	name: "counter",
	initialState: {
		value: 0
	},
	reducers: {
		incrementByAmount: (state, { payload }) => {
			// payload会接受传递过来的参数
			state.value += payload.value;
		},
		decrement: state => {
			state.value -= 1;
		},
	}
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 异步加
export const incrementAsync = amount => dispatch => {
	setTimeout(() => {
		dispatch(incrementByAmount(amount));
	}, 1000);
};

export const selectCount = state => state.counter.value;

export default counterSlice.reducer;
