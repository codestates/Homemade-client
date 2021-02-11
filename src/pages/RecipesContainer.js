import React, { useRef, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import { lighten, darken } from "polished";
import axios from "axios";
import RecipeList from "../compoments/RecipeList";

export default function RecipesContainer() {
  const [recipeList, setRecipeList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const allListLength = useRef(null);

  const location = useLocation();
  const params = queryString.parse(location.search);
  const result = params.q ? params.q : params.category;

  let firstPage;

  const page = String(params.page);
  if (page.length > 1) {
    firstPage = Number(`${page.slice(0, page.length - 1)}0`);
  } else {
    firstPage = 1;
  }

  let query;

  if (Object.keys(params).includes("q")) {
    query = `q=${params.q || " "}&page=`;
  } else {
    query = `category=${params.category}&page=`;
  }

  const queryParam = `${query}${params.page}`;

  useEffect(async () => {
    try {
      setIsLoading(true);

      const data = await axios.get(
        `https://homemade2021.ml/recipes/recipes?${queryParam}`,
      );

      const { recipes, contentSum } = data.data.data;

      allListLength.current = contentSum;
      setRecipeList(recipes);
      setIsLoading(false);
    } catch (err) {
      console.log("error 발생");
    }
  }, [queryParam]);

  const recipesPerPage = Math.ceil(allListLength.current / 20);
  const currentpage = Number(params.page);
  const currentPages = Array(recipesPerPage)
    .fill(firstPage)
    .map((el, idx) => el + idx);
  return (
    <>
      {!isLoading ? (
        <>
          <Result>{result}에 대한 결과입니다.</Result>
          {recipeList.length === 0 && <div>레시피가 존재하지 않습니다.</div>}
          <RecipeList recipes={recipeList} />
          <PageContainer>
            <PageWrap>
              {firstPage === 1 ? (
                ""
              ) : (
                <PageItem>
                  <Link to={`/search?${query}${firstPage - 1}`}>&lt;</Link>
                </PageItem>
              )}
              {currentPages.map(el => {
                return String(el)[String(el).length - 1] === "0" ||
                  el > recipesPerPage ? (
                  ""
                ) : (
                  <PageItem key={el} current={currentpage === el}>
                    <Link to={`/search?${query}${el}`}>{el}</Link>
                  </PageItem>
                );
              })}
              {recipesPerPage >= firstPage + 9 && (
                <PageItem>
                  <Link to={`/search?${query}${firstPage + 10}`}>&gt;</Link>
                </PageItem>
              )}
            </PageWrap>
          </PageContainer>
        </>
      ) : (
        <div>loading...</div>
      )}
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

const PageContainer = styled.div`
  width: fit-content;
  padding: 3rem;
  height: 72px;
  margin: 0 auto;
  display: table;
  align-items: center;
  border-collapse: separate;
  border-spacing: 5px;
`;

const PageWrap = styled.ul`
  display: table-row;
`;

const PageItem = styled.li`
  display: table-cell;
  margin-left: 0.3rem;
  border: 1px solid #e6e7e8;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  font-size: 1.2rem;
  &:hover {
    background-color: ${lighten(0.1, `#6f6f6f`)};
    a {
      color: white;
    }
  }
  &:active {
    background-color: ${darken(0.1, `#6f6f6f`)};
    a {
      color: white;
    }
  }
  a {
    display: inline-block;
    width: 36px;
    height: 36px;
    text-decoration: none;
    color: black;
  }
  ${({ current }) =>
    current &&
    `
    background: #84ACCB;
  `}
`;
