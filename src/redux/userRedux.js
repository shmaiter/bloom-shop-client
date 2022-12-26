import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        // every action uses a payload that is passed as an argument from the dispatch function
        // inside the module that makes the call.
        loginStart: (state) => {
            state.isFetching = true;
        },
        logingSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { loginStart, logingSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
