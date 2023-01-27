import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { sliderItems } from "../data";
import { useState } from "react";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: seashell;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${(props) => props.direction === "left" && "10px"};
    right: ${(props) => props.direction === "right" && "10px"};
    cursor: pointer;
    opacity: 0.5;
    z-index: 1;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${(props) => props.bg};
`;
const ImgContainer = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Image = styled.img`
    height: 80%;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`;

const Title = styled.h1`
    font-size: 70px;
`;
const Desc = styled.p`
    margin: 50px 0;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`;
const Button = styled(Link)`
    text-decoration: none;
    border: 1px black solid;
    color: black;
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease;
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
    }
`;

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowBackIosOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map((item) => (
                    <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button to={`/products/${item.cat}`}>SHOW MORE</Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowForwardIosOutlined />
            </Arrow>
        </Container>
    );
};

export default Slider;
