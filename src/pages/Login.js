import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { ArrowBack } from "@mui/icons-material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
        url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    line-height: 1.5;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;

    background-color: ${(props) => (props.disabled ? "rgba(30,30,30, 0.2)" : "teal")};
`;

const Error = styled.span`
    color: red;
`;

const WrapperBack = styled.div`
    margin-top: 10px;
    width: 25%;
    padding: 20px;
    display: flex;
    justify-content: start;
    align-items: center;
    ${mobile({ width: "75%" })}
`;

const ArrowLeft = styled(ArrowBack)`
    margin-right: 10px;
`;

const LinkText = styled(Link)`
    font-size: 15px;
    color: black;

    &:hover {
        color: grey;
    }
`;

const ErrorMessage = styled.p`
    display: ${(props) => (props.errMsg ? "block" : "none")};
    background-color: lightpink;
    color: firebrick;
    font-weight: bold;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
`;

const Login = () => {
    const userRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { isFetching, error, errorMessage } = useSelector((state) => state.user);
    // console.log(isFetching, error, errMsg);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });

        // Set different kind of messages according to the server response.
        if (!error) {
            setUsername("");
            setPassword("");
            // navigate("/");
        }
    };

    return (
        <Container>
            <Wrapper>
                <ErrorMessage errMsg={error} aria-live="assertive">
                    {errorMessage || "Something went wrong..."}
                </ErrorMessage>
                <Title>SIGN IN</Title>
                <Form onSubmit={handleLogin}>
                    <Input ref={userRef} required autoComplete="off" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input required placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button disabled={!username || !password || isFetching}>LOGIN</Button>
                </Form>
                {/* <LinkText to="#">Do not remember the password?</LinkText> */}
                <LinkText to="/register">Create a new account</LinkText>
            </Wrapper>
            <WrapperBack>
                <ArrowLeft />
                <LinkText to="/">Back Home</LinkText>
            </WrapperBack>
        </Container>
    );
};

export default Login;
