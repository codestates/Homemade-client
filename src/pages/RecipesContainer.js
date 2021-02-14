/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import { lighten, darken } from "polished";
import axios from "axios";
import { GrGremlin } from "react-icons/gr";
import { RecipeList, Loader, Banner } from "../compoments/index";
import bannerUrls from "../assets/bannerUrls";

export default function RecipesContainer() {
  const [recipeList, setRecipeList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("조회순");
  const bannerUrl = useRef(null);
  const allListLength = useRef(null);

  const location = useLocation();
  const params = queryString.parse(location.search);
  const result = params.q ? params.q : params.category;

  if (!isLoading && params.category) {
    bannerUrl.current = bannerUrls[result];
  } else {
    bannerUrl.current = "./banner/koreanFood.jpg";
  }

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

      console.log(params.q);
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
          <Banner url={bannerUrl.current} />
          <Result>
            <Wrap>
              <Title>{result} 에 대한 결과입니다.</Title>
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
            </Wrap>
          </Result>

					{
						recipeList.length > 0 ?
          <RecipeList recipes={recipeList} />
						:
						<Icon>
							<GrGremlin size="333" color="#fff"/>
							<Message>먹을게 하나도 없네..</Message>
						</Icon>
					}
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
  width: 80vw;
  margin: 0 auto;
  background: black;
  border-radius: 20px;
  height: 55px;
  color: white;
`;

const Wrap = styled.div`
	display: flex;
	margin-top:55px;
  flex-direction: row;
  position: relative;
  font-size: 1.2rem;
  heigth: 100%
  align-items: flex-end;
  justify-content: space-between;
`;

const Title = styled.p`
  padding-left: 30px;
  flex: 1000;
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
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  &:hover {
    background-color: ${lighten(0.1, `#153450`)};
  }
  &:active {
    background-color: ${darken(0.1, `#153450`)};
  }
  a {
    color: #ffffff;
    display: inline-block;
    width: 36px;
    height: 36px;
    text-decoration: none;
    padding-top: 6px;
  }
  ${({ current }) =>
    current &&
    `
    background: #153450;
  `}
`;

const SortOrderWrap = styled.p`
  flex: 1;
  display: flex;
  list-style: none;
  border: 2px solid white;
  border-radius: 15px;
  margin-top: 11px;
  margin-right: 20px;
`;

const SortOrder = styled.button`
  font-size: 1rem;
  font-weight: 400;
  min-width: 80px;
  cursor: pointer;
	border-radius: 12px;
	background:black;
	outline: 0;
	color:white;
  height: 28px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

  ${({ active }) =>
    active &&
    `
		color: black ;
    background-color:white;
  `}
`;

const Icon = styled.div`
text-align: -webkit-center;
margin-top: 100px;
`;

const Message = styled.p`font-size:2rem;`;