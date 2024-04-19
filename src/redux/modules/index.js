import counterSlice from "./counterSlice/index.js";
import productSlice from "./productSlice/index.js";

const combineReducer = {
	counter: counterSlice,
	product: productSlice
};

export default combineReducer;
