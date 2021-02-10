/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import Recipe from "./Recipe";

export default function RecipeList({ recipes }) {
  console.log("이거", recipes);
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
  margin-top: 10px;
  height: 100%;
`;
const RecipeListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
