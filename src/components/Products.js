import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
`;

const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // const URL_GET_PRODUCTS = cat ? `http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products";

        const getProducts = async () => {
            try {
                const res = await axios.get(cat ? `https://bloom-shop-api.onrender.com/api/products?category=${cat}` : "https://bloom-shop-api.onrender.com/api/products");
                setProducts(res.data.products);
            } catch (err) {}
        };
        getProducts();
    }, [cat]);

    useEffect(() => {
        if (cat) {
            const filters_user = products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value)));
            setFilteredProducts(filters_user);
        }
    }, [products, cat, filters]);

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt));
        } else if (sort === "asc") {
            setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
        } else {
            setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
        }
    }, [sort]);

    return <Container>{cat ? filteredProducts.map((item) => <Product item={item} key={item._id} />) : products.slice(0, 6).map((item) => <Product item={item} key={item._id} />)}</Container>;
};

export default Products;
