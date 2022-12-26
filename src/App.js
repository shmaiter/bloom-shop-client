import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import "./App.css";

const App = () => {
    let user = true;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/success" element={<Success />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products/:category" element={<ProductList />} />
                <Route path="/product/:id" element={<Product />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
