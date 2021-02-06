import React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import RecipeList from "../compoments/RecipeList";
import recipes from "../assets/recipes";

export default function RecipesContainer() {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const result = params.q ? params.q : params.category;
  return (
    <>
      <Result>{result}에 대한 결과입니다.</Result>
      <RecipeList recipes={recipes} />
    </>
  );
}
const Result = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;
`;
