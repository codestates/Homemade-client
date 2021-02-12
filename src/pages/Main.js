import React from "react";
import styled from "styled-components";
import Banner from "../compoments/Banner";
import recipes from "../assets/recipes";
import Carousel from "../compoments/Carousel";

export default function Main() {
  const tempRecipes = recipes.slice(0, 9);
  console.log(tempRecipes);
  return (
    <MainContainer>
      <Banner />
      <Section isOdd>
        <EmptySpace />
        <CarouselContainer>
          <Title isOdd>이번주 인기 레시피</Title>
          <Carousel recipes={tempRecipes} />
        </CarouselContainer>
        <EmptySpace />
      </Section>
      <Section>
        <EmptySpace />
        <CarouselContainer>
          <Title>이번주 인기 레시피</Title>
          <Carousel recipes={tempRecipes} />
        </CarouselContainer>
        <EmptySpace />
      </Section>
      <Section isOdd>
        <EmptySpace />
        <CarouselContainer>
          <Title isOdd>이번주 인기 레시피</Title>
          <Carousel recipes={tempRecipes} />
        </CarouselContainer>
        <EmptySpace />
      </Section>
      <Section>
        <EmptySpace />
        <CarouselContainer>
          <Title>이번주 인기 레시피</Title>
          <Carousel recipes={tempRecipes} />
        </CarouselContainer>
        <EmptySpace />
      </Section>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: relative;
  unset: all;
  heigth: 100%;
`;

const Section = styled.section`
  background-color: #ffffff
  width: 100%;
  display: flex;

  ${({ isOdd }) => isOdd && `background-color: #f6f7fb `}
`;

const EmptySpace = styled.div`
  flex: 1;
`;

const Title = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  margin-left: 0.5rem;
  color: #f2701d;
  ${({ isOdd }) => isOdd && `color: #74b143 `}
`;

const CarouselContainer = styled.div`
  padding-top: 5rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
`;
