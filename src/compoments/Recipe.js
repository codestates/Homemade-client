import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const RecipeWrap = styled.div`
  display: inline-block;
  width: 272px;
  height: 342px;
  margin: 0.3rem;
  img {
    width: 210px;
    height: 210px;
  }
`;

const Thumnail = styled.div`
  width: 100%;
  height: 270px;
  img {
    width: 100%;
    height: 270px;
  }
`;

const RecipeInfo = styled.div`
  height: 72px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0.5rem;
  span {
    font-size: 0.9rem;
  }
`;

const Title = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
`;

const UserName = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
`;
export default function Recipe({ recipe }) {
  const { title, thumnailUrl, userName, rate, views } = recipe;
  return (
    <RecipeWrap>
      <Thumnail>
        <img src={thumnailUrl} alt={title} />
      </Thumnail>
      <RecipeInfo>
        <Title>{title}</Title>
        <UserName>{userName}</UserName>
        <div>
          <span>{rate}</span> &nbsp;
          <span>조회수 {views}</span>
        </div>
      </RecipeInfo>
    </RecipeWrap>
  );
}

Recipe.propTypes = {
  recipe: PropTypes.arrayOf(
    PropTypes.shape({
      thumnailUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      rate: PropTypes.string.isRequired,
      views: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
