import React from "react";
import styled, { keyframes } from "styled-components";

export default function Loader() {
  return <LoaderBody />;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border: 16px solid #f3f3f3;
  border-top: 16px solid #008000;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 1.5s linear infinite;
`;
