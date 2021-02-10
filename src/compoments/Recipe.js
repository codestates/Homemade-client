/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Recipe({ recipe }) {
  const { id, title, rate, thumbnail_url, nickname, views } = recipe;
  const starRate = Number(rate) * 20;
  return (
    <RecipeWrap to={`/recipe/${id}`}>
      <Thumnail>
        <img src={thumbnail_url || "../images/recipe1.jpg"} alt={title} />
      </Thumnail>
      <RecipeInfo>
        <Title>{title || "무제"}</Title>
        <UserName>{nickname || "anonymous"}</UserName>
        <div>
          <StarRating>
            <span
              style={{ width: `${starRate || 50}%` }}
              className="star-ratings-sprite-rating"
            />
          </StarRating>
          &nbsp;
          <span>view: {views}</span>
        </div>
      </RecipeInfo>
    </RecipeWrap>
  );
}

const RecipeWrap = styled(Link)`
  color: black;
  text-decoration: none;
  display: inline-block;
  width: 80%;
  height: 350px;
  margin: 2rem;
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
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #e6e7e8;
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

const StarRating = styled.div`
  display: inline-block;
  margin-top: 0.2rem;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2605/star-rating-sprite.png")
    repeat-x;
  font-size: 0;
  height: 21px;
  line-height: 0;
  overflow: hidden;
  text-indent: -999em;
  width: 110px;

  span {
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2605/star-rating-sprite.png")
      repeat-x;
    background-position: 0 100%;
    float: left;
    height: 21px;
    display: block;
  }
`;
