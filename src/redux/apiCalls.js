import { loginFailure, logingSuccess, loginStart } from "./userRedux";
import { publicRequest } from "../requestedMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post("/auth/login", user);
        // console.log(res.data);
        dispatch(logingSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};
