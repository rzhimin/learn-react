import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
//定义初始state
//list表示商品列表，isLoading表示是否为正在请求数据的状态
const initialState = { list: [], isLoading: false };
//创建slice
const slice = createSlice({
	//定义域名称
	name: "product",
	//传入初始state
	initialState,
	//定义reducers
	reducers: {
		//这个reducer用来把商品数据存储到store中
		addProduct: (state, action) => {
			state.list.push(action.payload);
		},
		//这个reducer用来更改isLoading
		changeState: (state, action) => {
			state.isLoading = action.payload;
		}
	},
	//extraReducer设置createAsyncThunk创建的thunk被dispatch后的reducer处理器
	extraReducers(builder) {
		builder
			.addCase(addProductPost.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(addProductPost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.list.push(action.payload);
			})
			.addCase(productListGet.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(productListGet.fulfilled, (state, action) => {
				return { list: action.payload, isLoading: false };
			})
			.addCase(productListGet.rejected, (state, action) => {
				state.isLoading = false;
			});
	}
});
//导出action creator
export const { addProduct, changeState } = slice.actions;
//导出thunk函数
//addProductAsync为thunk函数的创建函数，它返回一个thunk函数
//返回的thunk函数中我们就可以编写异步代码了
export const addProductAsync = payload => (dispatch, getState) => {
	//触发action ，改变isLoading的状态
	dispatch(changeState(true));
	setTimeout(() => {
		dispatch(addProduct(payload));
		//触发action ，改变isLoading的状态
		dispatch(changeState(false));
	}, 1000);
};

//使用createAsyncThunk创建thunk
//接收的第一个参数是action 的 type的前缀
//第二个参数是一个函数，用来返回payload
export const addProductPost = createAsyncThunk("product/addProductPost", item => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(item);
		}, 1000);
	});
});

//创建获取商品数据的thunk
export const productListGet = createAsyncThunk("product/productListGet", async () => {
	return await new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([{ name: "苹果1" }, { name: "香蕉" }, { name: "蓝莓3" }]);
		}, 1000);
	});
});

// createSelector是一个函数，它允许我们从 Redux store 中选择部分状态数据，并将其作为参数传递给一个 memoized 函数，以避免在相同的输入下重复计算。
export const selectList = createSelector(
	/**
	 * 第一部分参数是一个或者多个输入选择器函数
	 * 用户选择redux store中的一部分状态，并将其
	 * 作为计算函数的参数
	 * 这些输入选择器函数可以是任何具有选择状态的功能
	 */
	// 所有的state,导出product.list给下一位选手
	state => state.product.list,
	/**
	 * 只有当前模块的数据
	 * 发生改变的时候
	 * 才会触发这一系列的方法
	 */
	list => {
		console.log("重新计算list");
		return list.filter(item => item.name.length > 2);
	}
);

//导出reducer
export default slice.reducer;
