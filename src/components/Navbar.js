import React from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { mobile } from "../responsive";
import { NavLink } from "react-router-dom";
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

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
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

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    margin-left: 25px;
    cursor: pointer;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
    const quantity = useSelector((state) => state.cart.quantity);
    // console.log(quantity);

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <Search style={{ color: "gray", fontSize: "16px", marginRight: "5px" }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>
                        <NavLink to="/" style={{ textDecoration: "none" }}>
                            BLOOM
                        </NavLink>
                    </Logo>
                </Center>
                <Right>
                    <MenuItem>
                        <NavLink to="/register">REGISTER</NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/login">SIGN IN</NavLink>
                    </MenuItem>
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <NavLink to="/cart">
                                <ShoppingCartOutlined />
                            </NavLink>
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
