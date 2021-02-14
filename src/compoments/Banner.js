import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

export default function Banner({ url }) {
  return (
    <BannerWrap>
      <BannerImg src={url} />
    </BannerWrap>
  );
}

const BannerWrap = styled.div`
  width: 100%;
  height: 60vh;
  margin: 0 auto;
`;

const BannerImg = styled.img`
  width: 100%;
  max-height: 100%;
  margin: 0 auto;
`;

Banner.propTypes = {
  url: propTypes.string.isRequired,
};
