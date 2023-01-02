import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestedMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div``;
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImageContainer = styled.div`
    flex: 1;
`;
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: contain;
    ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
    ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
    font-weight: 200;
`;
const Desc = styled.p`
    margin: 20px 0px;
`;
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 10px;
    border: 2px solid teal;
    background-color: white;
    font-weight: 500;
    cursor: ${(props) => (props.isError ? "not-allowed" : "pointer")};
    &:hover {
        background-color: ${(props) => (props.isError ? "white" : "teal")};
        transition: all 0.3s ease;
        color: ${(props) => (props.isError ? "black" : "white")};
    }
`;

const Notification = styled.p`
    display: ${(props) => (props.isError ? "block" : "none")};
    /* display: none; */
    border: 3px solid red;
    color: red;
    padding: 10px;
    margin-top: 20px;
    font-weight: bold;
`;

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const [error, setError] = useState(false);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest("/products/" + id);
                setProduct(res.data.product);
                setColor(res.data.product.color[0]);
                setSize(res.data.product.size[0]);
            } catch (err) {}
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleAddToCart = () => {
        if (currentUser) {
            // update the cart
            dispatch(addProduct({ ...product, quantity, color, size }));
        } else {
            setError(true);
            console.log("You need to be loged in to make an order to any product");
        }
    };

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImageContainer>
                    <Image src={product.img} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => (
                                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((s) => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("inc")} />
                        </AmountContainer>
                        <Button onClick={handleAddToCart} isError={error}>
                            ADD TO CART
                        </Button>
                    </AddContainer>
                    <Notification isError={error}>You need to be loged in to add products to the cart</Notification>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product;
