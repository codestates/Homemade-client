/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Recipe from "./Recipe";
import chunk from "../common/utils/utils";

export default function RecipeList({ recipes }) {
  const recipeParts = chunk(recipes, 4);
  return (
    <Container>
      {recipeParts.map(part => (
        <ListContainer key={nanoid()}>
          {part.map(recipe => (
            <Recipe key={nanoid()} recipe={recipe} />
          ))}
        </ListContainer>
      ))}
    </Container>
  );
}

const ListContainer = styled.div`
  padding: 2rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: no-wrap;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 92.5vw;
`;
