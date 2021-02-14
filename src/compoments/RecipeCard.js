/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function RecipeCard({ data }) {
  return (
    <>
      {data.map(item => (
        <CardContainer>
          <Thumbnail src={item.src} alt="default" />
          <Description>
            <Title>{item.title}</Title>
            <View>view: {item.view}</View>
          </Description>
        </CardContainer>
      ))}
    </>
  );
}
RecipeCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};
const CardContainer = styled.div`
  border-radius: 12px;
  min-width: 33.3%;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border: 5px solid #eee;
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 360px;
  display: block;
  object-fit: cover;
  border-bottom: 1px solid #eeeeee;

  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    filter: brightness(90%);
  }
`;
const Description = styled.div`
  padding: 0.4rem;
`;
const Title = styled.h2`
  font-weight: 800;
  magrin: 0;
`;
const View = styled.p`
  margin: 0;
  text-align: right;
  color: #bbbbbb;
`;
