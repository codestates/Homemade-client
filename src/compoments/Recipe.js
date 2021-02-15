/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Recipe({ recipe }) {
  const { id, title, thumbnail_url, nickname, views } = recipe;
  // const starRate = Number(rate) * 20;
  return (
    <RecipeContainer to={`/recipe/${id}`}>
      <ImageConatiner>
        <Image src={thumbnail_url || "../images/recipe1.jpg"} alt={title} />
      </ImageConatiner>
      <SummaryConatiner>
        <RecipeTitle>{title || "무제"}</RecipeTitle>
        <WriterWrap>
          <Writer>글쓴이 : {nickname || "anonymous"}</Writer>
          <Views>조회수 : {views}</Views>
        </WriterWrap>
      </SummaryConatiner>
    </RecipeContainer>
  );
}

const RecipeContainer = styled(Link)`
  width: 22vw;
  height: 440px;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  box-shadow: 0px 0px 10px 3px #d4d0d0;
  text-decoration: none;
  border-radius: 20px;
`;

const ImageConatiner = styled.div`
  width: 100%;
  height: 70%;
  min-height: 70%;
  max-height: 100%;
  border-bottom: 1px solid lightgray;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in-out;
  border-radius: 20px 20px 0px 0px;
  &:hover {
    filter: brightness(90%);
  }
`;

const SummaryConatiner = styled.div`
  margin-top: 0.3rem;
`;

const RecipeTitle = styled.div`
  position: relative;
  font-size: 1.2rem;
  min-height: 46px;
  margin: 1rem 0 0 0;
  color: #333333;
  text-align: center;
  font-weight: 800;
`;

const WriterWrap = styled.div`
  padding-top: 10px;
  margin: 20px;
  border-top: 2px solid orange;
  font-size: 0.8rem;
  color: #666666;
  display: flex;
`;

const Writer = styled.span`
  font-size: 0.8rem;
  flex: 1;
`;

const Views = styled.span`
  padding-left: 0.3rem;
  font-size: 0.8rem;
  flex: 1;
  text-align: right;
`;
