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
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
    },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
