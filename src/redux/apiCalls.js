import { loginFailure, logingSuccess, loginStart } from "./userRedux";
import { publicRequest, userRequest } from "../requestedMethods";
import { addProduct, getProductFailure, getProductStart, getProductSuccess } from "./cartRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post("/auth/login", user);
        console.log(res.data);
        dispatch(logingSuccess(res.data));

        // getOrdersByUser(dispatch, res.data._id, res.data.accessToken);
    } catch (err) {
        let errorMessage = null;
        if (err.res?.status === 400) {
            errorMessage = "Missing Username or Password";
        } else if (err.res?.status === 401) {
            errorMessage = "Unauthorized";
        } else {
            errorMessage = "Login Failed";
        }
        console.log("apiCalls.Error", errorMessage);
        dispatch(loginFailure(errorMessage));
    }
};

export const getUserCart = async (dispatch, userId, token) => {
    const res = await axios.get(`http://localhost:5000/api/carts/${userId}`, { headers: { token: `Bearer ${token}` } });
    console.log(res.data);
    res.data.products?.forEach((product) => {
        dispatch(
            addProduct({
                ...product,
            })
        );
    });
};

export const saveUserCart = async (dispatch, cart, user) => {
    const token = user.accessToken;
    const userId = user._id;
    const userProducts = cart.products.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
        title: product.title,
        img: product.img,
        size: product.size,
        color: product.color,
        price: product.price,
    }));

    console.log("userProducts", userProducts);
    const userCart = {
        userId: userId,
        products: userProducts,
    };
    console.log("userCart", userCart);
    /* 
    {
        "userId":"63ae33397fa1e8dcbfe10859",
        "products":[
            {
                productId:63a245a3461eba5536be9af7,
                quantity:1
                title: { type: String, required: true, unique: true },
                img: { type: String, required: true },
                size: { type: Array },
                color: { type: Array },
                price: { type: Number },
            }
        ],
    }

*/

    await axios.post("http://localhost:5000/api/carts", userCart, { headers: { token: `Bearer ${token}` } });
    // console.log("responseCart: ", res.data);
};

export const getOrdersByUser = async (dispatch, id, token) => {
    // dispatch(getProductStart());

    try {
        // BUG WITH requestedMethods not sending on time the token.
        const res = await axios.get(`http://localhost:5000/api/orders/${id}`, { headers: { token: `Bearer ${token}` } });
        console.log("responseOrders: ", res.data);
        // dispatch(getProductSuccess(res.data));
    } catch (err) {
        console.log(err);
        // dispatch(getProductFailure());
    }
};
