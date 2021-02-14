import React from "react";
import styled, { keyframes } from "styled-components";
import PropType from "prop-types";

// eslint-disable-next-line react/prop-types
export default function Intro({ setIntro }) {
  return (
    <Container type="button" onClick={() => setIntro(true)}>
      <Title>Welcome to our Kitchen</Title>
      <SubTitle>Yon can cook anything in Homemade</SubTitle>
      <div id="cooking">
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div id="area">
          <div id="sides">
            <div id="pan" />
            <div id="handle" />
          </div>
        </div>
      </div>
    </Container>
  );
}
Intro.propsTypes = {
  setIntro: PropType.func.isRequired,
};
const flip = keyframes`0% {
	transform: rotate(0deg);
}
5% {
	transform: rotate(-27deg);
}
30%,
50% {
	transform: rotate(0deg);
}
55% {
	transform: rotate(27deg);
}
83.3% {
	transform: rotate(0deg);
}
100% {
	transform: rotate(0deg);
}`;
const switchSide = keyframes`0% {
	transform: rotateY(0deg);
}
50% {
	transform: rotateY(180deg);
}
100% {
	transform: rotateY(0deg);
}`;
const pulse = keyframes`0% {
	transform: scale(1, 1);
	opacity: 0.25;
}
50% {
	transform: scale(1.2, 1);
	opacity: 1;
}
100% {
	transform: scale(1, 1);
	opacity: 0.25;
}
`;
const bubble = keyframes`0% {
	transform: scale(0.15, 0.15);
	top: 80%;
	opacity: 0;
}
50% {
	transform: scale(1.1, 1.1);
	opacity: 1;
}
100% {
	transform: scale(0.33, 0.33);
	top: 60%;
	opacity: 0;
}`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #8fd7e0;
  height: 100vh;
  width: 100vw;
	overflow: hidden;
	text-align: center;
	cursor:pointer;
  #cooking {
    position: relative;
    margin: 0 auto;
    top: 0;
    width: 75vh;
    height: 75vh;
    overflow: hidden;
  }
  .bubble {
    position: absolute;
    border-radius: 100%;
    box-shadow: 0 0 0.25vh #4d4d4d;
    opacity: 0;
  }
  &:.bubble:nth-child(1) {
    margin-top: 2.5vh;
    left: 58%;
    width: 2.5vh;
    height: 2.5vh;
    background-color: #454545;
    animation: ${bubble}2s cubic-bezier(0.53, 0.16, 0.39, 0.96) infinite;
  }
  .bubble:nth-child(2) {
    margin-top: 3vh;
    left: 52%;
    width: 2vh;
    height: 2vh;
    background-color: #3d3d3d;
    animation: ${bubble} 2s ease-in-out 0.35s infinite;
  }
  #cooking .bubble:nth-child(3) {
    margin-top: 1.8vh;
    left: 50%;
    width: 1.5vh;
    height: 1.5vh;
    background-color: #333;
    animation: ${bubble} 1.5s cubic-bezier(0.53, 0.16, 0.39, 0.96) 0.55s
      infinite;
  }
  #cooking .bubble:nth-child(4) {
    margin-top: 2.7vh;
    left: 56%;
    width: 1.2vh;
    height: 1.2vh;
    background-color: #2b2b2b;
    animation: ${bubble} 1.8s cubic-bezier(0.53, 0.16, 0.39, 0.96) 0.9s infinite;
  }
  #cooking .bubble:nth-child(5) {
    margin-top: 2.7vh;
    left: 63%;
    width: 1.1vh;
    height: 1.1vh;
    background-color: #242424;
    animation: ${bubble} 1.6s ease-in-out 1s infinite;
  }
  #area {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50%;
    background-color: transparent;
    transform-origin: 15% 60%;
    animation: ${flip} 2.1s ease-in-out infinite;
  }
  #sides {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: 15% 60%;
    animation: ${switchSide} 2.1s ease-in-out infinite;
  }
  #handle {
    position: absolute;
    bottom: 18%;
    right: 80%;
    width: 35%;
    height: 20%;
    background-color: transparent;
    border-top: 1vh solid #333;
    border-left: 1vh solid transparent;
    border-radius: 100%;
    transform: rotate(20deg) rotateX(0deg) scale(1.3, 0.9);
  }
  #pan {
    position: absolute;
    bottom: 20%;
    right: 30%;
    width: 50%;
    height: 8%;
    background-color: #333;
    border-radius: 0 0 1.4em 1.4em;
    transform-origin: -15% 0;
  }
`;
const Title = styled.h1`
  position: relative;
  margin: 0 auto;
  top: 25vh;
  width: 100vw;
  text-align: center;
  font-family: fantasy;
  font-size: 6vh;
  color: #333;
  opacity: 0.75;
  animation: ${pulse} 2.5s linear infinite;
`;

const SubTitle = styled.p`
  position: relative;
  margin: 0 auto;
  top: 30vh;
  width: 100vw;
  text-align: center;
  font-family: fantasy;
  font-size: 5vh;
  color: #333;
  opacity: 0.75;
  animation: ${pulse} 2.5s linear infinite;
`;
