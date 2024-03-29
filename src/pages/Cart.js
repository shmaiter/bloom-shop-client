import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const LinkButton = styled(Link)`
    text-decoration: none;
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: solid 2px black;
    background-color: ${(props) => (props.type === "filled" ? "black" : "transparent")};
    color: ${(props) => (props.type === "filled" ? "white" : "black")};
`;

const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`;
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`;

const stripePromise = loadStripe("pk_test_51LphZaF3kGH0WubnimbrbyA0PohGGDY2u3Y8KDeVL58qcMPNP0Upoy35aABhHrISEPt9JHv23Fj9SMi1cHWKRLEZ00zjEEY7VQ");

const Cart = () => {
    const [clientSecret, setClientSecret] = useState("");
    const cart = useSelector((state) => state.cart);

    const handleCheckout = async () => {
        await fetch("http://localhost:5000/api/checkout/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: { amount: cart.total } }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("done: ", data);
                setClientSecret(data.clientSecret);
            });
    };

    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <>
            {clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            ) : (
                <Container>
                    <Navbar />

                    <Wrapper>
                        <Title>YOUR BAG</Title>
                        <Top>
                            <LinkButton to={"/products"}>CONTINUE SHOPPING</LinkButton>
                            <TopTexts>
                                <TopText>Shopping Bag(2)</TopText>
                                <TopText>Your Wishlist (0)</TopText>
                            </TopTexts>
                            {/* <LinkButton type="filled">CHECKOUT NOW</LinkButton> */}
                        </Top>
                        <Bottom>
                            <Info>
                                {cart.products.map((product) => (
                                    <Product key={product._id}>
                                        <ProductDetail>
                                            <Image src={product.img} />
                                            <Details>
                                                <ProductName>
                                                    <b>Product:</b> {product.title}
                                                </ProductName>
                                                <ProductId>
                                                    <b>ID:</b> {product._id}
                                                </ProductId>
                                                <ProductColor color={product.color} />
                                                <ProductSize>
                                                    <b>Size:</b> {product.size}
                                                </ProductSize>
                                            </Details>
                                        </ProductDetail>
                                        <PriceDetail>
                                            <ProductAmountContainer>
                                                <Add />
                                                <ProductAmount>{product.quantity}</ProductAmount>
                                                <Remove />
                                            </ProductAmountContainer>
                                            <ProductPrice>$ {product.quantity * product.price}</ProductPrice>
                                        </PriceDetail>
                                    </Product>
                                ))}
                                <Hr />
                            </Info>
                            <Summary>
                                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                                <SummaryItem>
                                    <SummaryItemText>Subtotal</SummaryItemText>
                                    <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                                    <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>Shipping Discount</SummaryItemText>
                                    <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem type="total">
                                    <SummaryItemText>Total</SummaryItemText>
                                    <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                                </SummaryItem>
                                <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
                            </Summary>
                        </Bottom>
                    </Wrapper>
                    <Footer />
                </Container>
            )}
        </>
    );
};

export default Cart;
