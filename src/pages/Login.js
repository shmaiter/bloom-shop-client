import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getOrdersByUser, getUserCart, login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { ArrowBack } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { publicRequest, userRequest } from "../requestedMethods";
import { loginFailure, logingSuccess, loginStart } from "../redux/userRedux";

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
    display: ${(props) => (props.isError ? "block" : "none")};
    background-color: lightpink;
    color: firebrick;
    font-weight: bold;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
`;

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isFetching = useSelector((state) => state.user.isFetching);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const res = await publicRequest.post("/auth/login", { username, password });
            const user = res.data;
            dispatch(logingSuccess(user));
            getUserCart(dispatch, user._id, user.accessToken);
            setUsername("");
            setPassword("");
            navigate("/");
        } catch (err) {
            dispatch(loginStart());
            if (!err.status) {
                setErrMsg("No Server Response");
            } else if (err.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    };

    return (
        <Container>
            <Wrapper>
                <ErrorMessage ref={errRef} isError={errMsg} aria-live="assertive">
                    {errMsg}
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
