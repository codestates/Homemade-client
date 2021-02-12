/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styled from "styled-components";
import Recipe from "./Recipe";

export default function Carousel({ recipes }) {
  const [recipe] = useState(recipes);
  const [currentRecipeIdx, setCurrentRecipeIdx] = useState(0);

  const prevSlide = () => {
    const resetToVeryBack = currentRecipeIdx === 0;

    const index = resetToVeryBack ? recipe.length - 1 : currentRecipeIdx - 1;

    setCurrentRecipeIdx(index);
  };

  const nextSlide = () => {
    const resetIndex = currentRecipeIdx === recipe.length - 1;

    const index = resetIndex ? 0 : currentRecipeIdx + 1;

    setCurrentRecipeIdx(index);
  };

  const activeRecipeFromState = recipe.slice(
    currentRecipeIdx,
    currentRecipeIdx + 4,
  );
  const recipeToDisplay =
    activeRecipeFromState.length < 4
      ? [
          ...activeRecipeFromState,
          ...recipe.slice(0, 4 - activeRecipeFromState.length),
        ]
      : activeRecipeFromState;

  return (
    <CarouselContainer>
      <Button type="button" onClick={prevSlide} left>
        &lt;
      </Button>
      {recipeToDisplay.map(recipeInfo => (
        <Recipe key={recipeInfo} recipe={recipeInfo} />
      ))}
      <Button type="button" onClick={nextSlide} right>
        &gt;
      </Button>
    </CarouselContainer>
  );
}

const CarouselContainer = styled.div`
  position: relative;
  height: 100%;
`;
const Button = styled.button`
  border: none;
  cursor: pointer;
  background-color: #f6f7fb;
  position: absolute;
  top: 40%;
  transform: translateY(-40%);
  font-size: 3rem;
  &:focus {
    outline: none;
  }
  ${({ left }) =>
    left &&
    `
  left: -2.5%;
  `};

  ${({ right }) =>
    right &&
    `
    right: -2.5%;
  `};
`;
