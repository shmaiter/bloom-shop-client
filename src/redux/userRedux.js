import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        errorMessage: "",
    },
    reducers: {
        // every action uses a payload that is passed as an argument from the dispatch function
        // inside the module that makes the call.
        loginStart: (state) => {
            state.error = false;
            state.errorMessage = "";
            state.isFetching = true;
        },
        logingSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.errorMessage = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
        },
    },
});

export const { loginStart, logingSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
