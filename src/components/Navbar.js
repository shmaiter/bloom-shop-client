import React from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({ padding: "10px 0" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 15px;
    height: 25px;
`;

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })}
`;

const Center = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`;

const Logo = styled(Link)`
    text-decoration: none;
    color: teal;
    font-size: 2.5rem;
    font-weight: bold;
    ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 1rem;
    margin-left: 25px;
    cursor: pointer;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}

    &:hover {
        color: coral;
    }
`;

const Navbar = () => {
    const numOrders = useSelector((state) => state.cart.numOrders);
    // console.log(quantity);

    return (
        <Container>
            <Wrapper>
                <Left>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <Search style={{ color: "gray", fontSize: "16px", marginRight: "5px" }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo to="/">BLOOM</Logo>
                </Center>
                <Right>
                    <MenuItem to="/login">SIGN IN</MenuItem>
                    {/* Configure another way to logout */}
                    <MenuItem to="/logout">LOGOUT</MenuItem>

                    <MenuItem to="/cart">
                        <Badge badgeContent={numOrders} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
