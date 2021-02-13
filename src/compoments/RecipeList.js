/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import Recipe from "./Recipe";

export default function RecipeList({ recipes }) {
  return (
    <RecipeListContainer>
      <RecipeListWrap>
        {recipes.map(recipe => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </RecipeListWrap>
    </RecipeListContainer>
  );
}
const RecipeListContainer = styled.div`
  position: relative;
  height: 100%;
  width: 80vw;
  margin: 0 auto;
`;
const RecipeListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
