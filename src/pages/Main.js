import React from "react";
import styled from "styled-components";
import Banner from "../compoments/Banner";
import bannerUrls from "../assets/bannerUrls";

export default function Main() {
  const { main } = bannerUrls;
  return (
    <MainContainer>
      <Banner url={main} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: relative;
  unset: all;
  heigth: 100%;
`;
