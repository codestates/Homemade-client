import React, { useRef, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import { lighten, darken } from "polished";
import axios from "axios";
import { RecipeList, Loader } from "../compoments/index";

export default function RecipesContainer() {
  const [recipeList, setRecipeList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("조회순");
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

      if (sortOrder === "조회순") {
        recipes.sort((a, b) => b.views - a.views);
      } else {
        recipes.sort((a, b) => b.createdAt - a.createdAt);
      }

      allListLength.current = contentSum;
      setRecipeList(recipes);
      setIsLoading(false);
    } catch (err) {
      console.log("error 발생");
    }
  }, [queryParam, sortOrder]);

  const recipesPerPage = Math.ceil(allListLength.current / 20);
  const currentpage = Number(params.page);
  const currentPages = Array(recipesPerPage)
    .fill(firstPage)
    .map((el, idx) => el + idx);
  return (
    <>
      {!isLoading ? (
        <>
          <Result>
            <Title>{result}에 대한 결과입니다.</Title>
            <SortOrderWrap>
              <SortOrder
                type="button"
                onClick={e => setSortOrder(e.target.value)}
                value="조회순"
                active={sortOrder === "조회순"}
              >
                조회순
              </SortOrder>
              <SortOrder
                type="button"
                onClick={e => setSortOrder(e.target.value)}
                value="날짜순"
                active={sortOrder === "날짜순"}
              >
                날짜순
              </SortOrder>
            </SortOrderWrap>
          </Result>
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
        <div>
          <Loader />
        </div>
      )}
    </>
  );
}
const Result = styled.div`
  display: flex;
  position: relative;
  font-size: 1.35rem;
  heigth: 20rem;
  align-items: flex-end;
  justify-content: space-around;
  padding: 2rem;
  margin-bottom: 2rem;
  background-color: #f1f1f2;
`;

const Title = styled.span`
  flex: 3.6;
  padding-left: 10.5rem;
`;

const PageContainer = styled.div`
  width: fit-content;
  padding: 3rem;
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
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  &:hover {
    background-color: ${lighten(0.1, `#76A264`)};
  }
  &:active {
    background-color: ${darken(0.1, `#76A264`)};
  }
  a {
    display: inline-block;
    width: 36px;
    height: 36px;
    text-decoration: none;
    padding-top: 6px;
    color: black;
  }
  ${({ current }) =>
    current &&
    `
    background: #76A264;
  `}
`;

const SortOrderWrap = styled.span`
  flex: 1;
  display: flex;
  list-style: none;
  background-color: #eeeeee;
  &:hover {
    background-color: ${lighten(0.1, `#eeeeee`)};
  }
`;

const SortOrder = styled.button`
  font-size: 1rem;
  font-weight: 400;
  padding: 0.4rem 1rem;
  border: 1px solid #bbbbbb;
  cursor: pointer;

  ${({ active }) =>
    active &&
    `
    background-color:#76A264;
  `}
`;
