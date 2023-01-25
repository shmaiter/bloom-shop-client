import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        numOrders: 0,
        total: 0,
    },
    reducers: {
        // every action uses a payload that is passed as an argument from the dispatch function
        // inside the module that makes the call.
        addProduct: (state, action) => {
            state.numOrders += 1;
            // console.log(action.payload);
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        // GET ALL
        getProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.numOrders += action.payload.orders?.length;
            state.products = action.payload.orders;
        },
        getProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        // Clean afte logout
        cleanUserCart: (state) => {
            state.products = [];
            state.numOrders = 0;
            state.total = 0;
        },
    },
});

export const { addProduct, populateCart, cleanUserCart, getProductStart, getProductSuccess, getProductFailure } = cartSlice.actions;
export default cartSlice.reducer;
