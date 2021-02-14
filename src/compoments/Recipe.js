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
          <Writer>{nickname || "anonymous"}</Writer>
          <Views>({views})</Views>
        </WriterWrap>
      </SummaryConatiner>
    </RecipeContainer>
  );
}

const RecipeContainer = styled(Link)`
  width: 18vw;
  height: 16vh;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  margin-bottom: 5rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  text-decoration: none;
`;

const ImageConatiner = styled.div`
  width: 100%;
  max-height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    filter: brightness(90%);
  }
`;

const SummaryConatiner = styled.div`
  margin-top: 0.3rem;
`;

const RecipeTitle = styled.p`
  font-size: 1.3rem;
  margin: 1rem 0 0 0;
  color: #333333;
`;

const WriterWrap = styled.div`
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: #666666;
`;

const Writer = styled.span`
  font-size: 0.8rem;
`;

const Views = styled.span`
  padding-left: 0.3rem;
  font-size: 0.8rem;
`;
