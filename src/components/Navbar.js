import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import { cleanUserCart } from "../redux/cartRedux";
import { getOrdersByUser, saveUserCart } from "../redux/apiCalls";

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
    margin-left: 30px;
    text-decoration: none;
    color: teal;
    font-size: 3rem;
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
    /* border: solid 1px black; */
    color: black;
    font-size: 1rem;
    font-weight: bolder;
    margin-left: 25px;
    cursor: pointer;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}

    &:hover {
        color: coral;
    }
`;

const SimpleModal = styled.div`
    display: ${(props) => (props.isModal ? "block" : "none")};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
`;
const ModalContent = styled.div`
    margin: 10% auto;
    width: 60% !important;
    padding: 20px;
    background-color: white;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
    animation-name: modalopen;
    animation-duration: var(--modal-duration);
`;
const ModalButtons = styled.div`
    display: flex;
    justify-content: center;
`;
const ModalButton = styled.button`
    padding: 8px 100px;
    margin: 10px;
    cursor: pointer;
`;

const UserGreeting = styled.span`
    text-decoration: none;
    color: black;
    font-size: 1rem;
    margin-left: 25px;
    cursor: pointer;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Name = styled(UserGreeting)`
    margin-left: 0;
    font-weight: bolder;
    color: teal;
`;

const Navbar = () => {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const numOrders = cart.numOrders;
    const user = useSelector((state) => state.user?.currentUser);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (user !== null) {
    //         getOrdersByUser(dispatch, user._id);
    //     }
    // }, [dispatch, user]);

    const renderModal = () => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    };
    const handleLogout = () => {
        console.log("cart:", cart, "user: ", user);
        saveUserCart(dispatch, cart, user);
        dispatch(logout());
        dispatch(cleanUserCart());
        navigate("/");
    };

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo to="/">BLOOM</Logo>
                </Left>
                {/* <Center>
                </Center> */}
                <Right>
                    {user ? (
                        <>
                            <UserGreeting>
                                Welcome back <Name>{user.username.toUpperCase()}</Name>
                            </UserGreeting>
                            <MenuItem onClick={renderModal}>LOGOUT</MenuItem>
                            <SimpleModal isModal={modal}>
                                <ModalContent>
                                    <p>Are you sure do you want to logout?</p>
                                    <ModalButtons>
                                        <ModalButton className="modalBtn yes" onClick={handleLogout}>
                                            YES
                                        </ModalButton>
                                        <ModalButton className="modalBtn no" onClick={renderModal}>
                                            NO
                                        </ModalButton>
                                    </ModalButtons>
                                </ModalContent>
                            </SimpleModal>
                            <MenuItem to="/cart">
                                <Badge badgeContent={numOrders} color="primary">
                                    <ShoppingCartOutlined />
                                </Badge>
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem to="/register">REGISTER</MenuItem>
                            <MenuItem to="/login">SIGN IN</MenuItem>
                        </>
                    )}
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
