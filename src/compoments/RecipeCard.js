/* eslint-disable react/require-default-props */
/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function RecipeCard({ recipe }) {
  const { title, thumbnail_url, views, created_at } = recipe;
  return (
    <CardContainer>
      <Thumbnail src={thumbnail_url} alt="default" />
      <Description>
        <Title>{title}</Title>
        <SubContainer>
          <span>{views}</span>
          <span>{created_at}</span>
        </SubContainer>
      </Description>
    </CardContainer>
  );
}
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail_url: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
  }),
};

const CardContainer = styled.span`
  width: 300px;
  height: 400px;
  box-shadow: 0px 0px 10px 3px #d4d0d0;
  display: inline-block;
  /* margin-left: 100px; */
  border-radius: 20px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 70%;
  border-bottom: 1px solid gainsboro;
`;
const Description = styled.div`
  padding: 10px;
`;
const Title = styled.p`
  font-weight: 800;
  margin-top: 2px;
`;
const SubContainer = styled.div`
  border-top: 2px solid orange;
  padding-top: 6px;
  display: flex;
  span {
    flex: 1 1 auto;
    font-size: 0.8rem;
    color: #7b7676;
  }
  text-align: center;
`;
