import styled from "styled-components";
import { mobile } from "../responsive";
import { ArrowBack } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Info } from "@mui/icons-material";
import { publicRequest } from "../requestedMethods";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
        url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;
const WrapperBack = styled.div`
    margin-top: 10px;
    width: 40%;
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

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 10px;
`;
const Form = styled.form`
    display: flex;
    flex-flow: column wrap;
`;
const Input = styled.input`
    flex: 1;
    width: 90%;
    margin: 5px 0;
    padding: 10px;
`;
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    color: white;
    cursor: pointer;
    background-color: ${(props) => (props.disabled ? "rgba(30,30,30, 0.2)" : "teal")};

    /* &:hover {
        transition: all 0.3s ease;
        color: white;
    } */
`;

const ErrorMessage = styled.p`
    display: ${(props) => (props.isError ? "block" : "none")};
    background-color: lightpink;
    color: firebrick;
    font-weight: bold;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
`;

const UserNote = styled.p`
    display: ${(props) => (props.note ? "block" : "none")};
    font-size: 0.75rem;
    border-radius: 0.5rem;
    background: lightcoral;
    color: #fff;
    padding: 0.25rem;
    width: 93%;
`;

const EmailNote = styled(UserNote)`
    display: ${(props) => (props.note ? "block" : "none")};
`;

const PwdNote = styled(UserNote)`
    display: ${(props) => (props.note ? "block" : "none")};
`;
const MatchNote = styled(UserNote)`
    display: ${(props) => (props.note ? "block" : "none")};
`;

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const EMAIL_REGEX = /^([\w.-])+@([\w-])\.([\w]+)$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
// const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    const handleCreate = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(username);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(pwd);

        if (!v1 && !v2 && !v3) {
            return;
        }

        const user = {
            username: username,
            email: email,
            password: pwd,
        };

        try {
            await publicRequest.post("/auth/register/", user);
            // console.log("response:", res.data);

            setUsername("");
            setEmail("");
            setPwd("");
            setMatchPwd("");
            navigate("/login");
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration Failed");
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
                <Title>CREATE AN ACCOUNT</Title>
                <Form onSubmit={handleCreate}>
                    <Input
                        type="text"
                        id="username"
                        ref={userRef}
                        placeholder="username"
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <UserNote id="uidnote" note={userFocus && username && !validName}>
                        <Info sx={{ fontSize: 18, marginRight: 1 }} />
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, dots, hyphens allowed.
                    </UserNote>

                    <Input
                        type="email"
                        id="email"
                        autoComplete="off"
                        placeholder="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <EmailNote id="emailnote" note={emailFocus && email && !validEmail}>
                        <Info sx={{ fontSize: 18, marginRight: 1 }} />
                        Username can be up to 64 characters long and domain name up to 253 characters.
                        <br />
                        Usarname allows letters, digits and the next especial characters:
                        <br />! # $ % & ' * + - / = ? ^ _ ` {"|"} ~
                        <br />
                        Character . ( period, dot or fullstop) provided that it is not the first or last character and it will not come one after the other.
                        <br />
                        The domain name [in, com, info] part contains letters, digits, hyphens, and dots. At least 2 and up to 4 characters long.
                    </EmailNote>

                    <Input
                        type="password"
                        id="password"
                        placeholder="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />

                    <PwdNote id="pwdnote" note={pwdFocus && !validPwd}>
                        <Info sx={{ fontSize: 18, marginRight: 1 }} />
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number and a special character.
                        <br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{" "}
                        <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </PwdNote>

                    <Input
                        type="password"
                        id="confirmnote"
                        placeholder="confirm password"
                        required
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <MatchNote id="confirmnote" note={matchFocus && !validMatch}>
                        <Info sx={{ fontSize: 18, marginRight: 1 }} />
                        Must match the first password input field.
                    </MatchNote>

                    <Agreement>
                        By creating an account, I consent to the preocessing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button disabled={!validName || !validPwd || !validMatch}>CREATE</Button>
                </Form>
            </Wrapper>
            <WrapperBack>
                <ArrowLeft />
                <LinkText to="/">Back Home</LinkText>
            </WrapperBack>
        </Container>
    );
};

export default Register;
