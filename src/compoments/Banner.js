import React from "react";
import styled from "styled-components";

export default function Banner() {
  return (
    <BannerWrap>
      <BannerImg src="../images/banner.png" />
    </BannerWrap>
  );
}

const BannerWrap = styled.div`
  width: 1180px;
  margin: 0 auto;
`;

const BannerImg = styled.img`
  width: 1180px;
  max-height: 100%;
  margin: 0 auto;
`;
