import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    const USER = true;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />}></Route>
                <Route path="/cart" element={<Cart />} />
                <Route path="/products/:category" element={<ProductList />} />
                <Route path="/product/:id" element={<Product />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
