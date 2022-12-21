import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
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
                const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products");
                setProducts(res.data.products);
            } catch (err) {}
        };
        getProducts();
    }, [cat]);

    useEffect(() => {
        console.log("filters: ", filters);
        if (cat) {
            const filters_user = products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value)));
            console.log("filters user ", filters_user);
            setFilteredProducts(filters_user);
        }
    }, [products, cat, filters]);
    return (
        <Container>
            {filteredProducts.map((item) => (
                <Product item={item} key={item._id} />
            ))}
        </Container>
    );
};

export default Products;
