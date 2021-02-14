/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserRecipe() {
  // myrecipes 상태
  // eslint-disable-next-line no-unused-vars
  const [myRecipes, setMyRecipes] = useState([]);
  // carousel 상태
  const slideRef = useRef(null);
  const TOTAL_SLIDES = myRecipes ? Math.floor(myRecipes.length / 4) : 0;
  const myRecipesQuantity = myRecipes ? myRecipes.length : 0;
  const [currentSlide, setCurrentSlide] = useState(0);

  // carousel의 다음 슬라이드
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  // carousel의 이전 슬라이드
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  const handleRequestUserRecipes = () => {
    const { accessToken } = JSON.parse(localStorage.getItem("loggedInfo"));
    try {
      axios
        .get("https://homemade2021.ml/users/myrecipes", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then(res => {
          setMyRecipes(res.data.data.recipes);
          // for (const el of res.data.data.recipes) {
          //   setMyRecipes([
          //     ...myRecipes,
          //     {
          //       id: el.id,
          //       title: el.title,
          //       thumbnailUrl: el.thumbnail_uri,
          //       createdAt: el.createdAt,
          //     },
          //   ]);
          // }
        });
    } catch (err) {
      console.log(err);
    }
  };
  // myrecipes 최초 1회 요청
  useEffect(() => {
    handleRequestUserRecipes();
  }, []);
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);
  return (
    <div>
      <MyrecipesTitle>My Recipe </MyrecipesTitle>
      <RecipeQuantity>총 : {myRecipesQuantity} 개</RecipeQuantity>
      <Container>
        <SliderContainer ref={slideRef}>
          {myRecipes.length > 0 ? (
            myRecipes.map(recipe => {
              const createdDate = recipe.createdAt.substring(0, 10);
              return (
                <CardContainer key={recipe.id}>
                  <Thumbnail to={`/recipe/${recipe.id}`}>
                    <img src={recipe.thumbnail_url} alt="default" />
                  </Thumbnail>
                  <Description>
                    <Title>{recipe.title}</Title>
                    <SubContainer>
                      <span>{createdDate}</span>
                    </SubContainer>
                  </Description>
                </CardContainer>
              );
            })
          ) : (
            <NoRecipe>등록된 recipe가 없습니다</NoRecipe>
          )}
        </SliderContainer>
        {myRecipes.length > 0 ? (
          <div>
            <Pages>
              {`${TOTAL_SLIDES + 1} 페이지 중 ${currentSlide + 1} 페이지`}
            </Pages>
            <ButtonWrap>
              <ButtonImg onClick={prevSlide}>이전 페이지</ButtonImg>
              <ButtonImg onClick={nextSlide}>다음 페이지</ButtonImg>
            </ButtonWrap>
          </div>
        ) : (
          <div />
        )}
      </Container>
    </div>
  );
}

// UserRecipe.defaultProps = {
//   myrecipes: [
//     {
//       id: 1,
//       title: "닭강정 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//     {
//       id: 2,
//       title: "콜라 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//     {
//       id: 3,
//       title: "우유 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//     {
//       id: 4,
//       title: "닭강정 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//     {
//       id: 5,
//       title: "딸기 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//     {
//       id: 3,
//       title: "우유 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//     {
//       id: 4,
//       title: "닭강정 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//     {
//       id: 5,
//       title: "딸기 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//     {
//       id: 3,
//       title: "우유 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//     {
//       id: 4,
//       title: "닭강정 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//     {
//       id: 5,
//       title: "딸기 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//     {
//       id: 3,
//       title: "우유 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//     {
//       id: 4,
//       title: "닭강정 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//     {
//       id: 5,
//       title: "딸기 만들기",
//       thumbnail_uri: "../images/recipeInfo1.jpg",
//       created_at: "2021-02-02",
//     },
//   ],
// };
const Container = styled.div`
  width: 100%;
  overflow: hidden;
  height: auto;
`;
const ButtonWrap = styled.div`
  text-align: center;
`;
const ButtonImg = styled.button`
  all: unset;
  border: 1px solid #0b0b20;
  padding: 0.5em 2em;
  color: #0b0b20;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: #0b0b20;
    color: #fff;
  }
  margin: 20px;
`;
const SliderContainer = styled.div`
  width: 100%;
  padding: 40px;

  display: flex; //이미지들을 가로로 나열합니다.
`;
const Pages = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: gray;
`;
const RecipeQuantity = styled.div`
  text-align: right;
  margin-right: 20px;
`;
const MyrecipesTitle = styled.div`
  text-align: center;
  padding: 30px;
  font-size: 1.5rem;
`;
const CardContainer = styled.div`
  width: 300px;
  height: 400px;
	margin-left: 10px;
	border-radius: 20px;
  margin-right: 5px;
  box-shadow: 0px 0px 10px 3px #d4d0d0;
  display: inline-block;d
`;

const Thumbnail = styled(Link)`
  img {
    width: 300px;
    height: 80%;
    border-bottom: 1px solid gainsboro;
    border-radius: 20px 20px 0px 0px;
  }
`;
const Description = styled.div`
  padding: 10px;
`;
const Title = styled.p`
  font-weight: 800;
  margin-top: 2px;
`;
const SubContainer = styled.div`
  border-top: 2px solid orange;
  padding-top: 6px;
  display: flex;
  span {
    flex: 1 1 auto;
    font-size: 0.8rem;
    color: #7b7676;
  }
  text-align: center;
`;

const NoRecipe = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: lightgray;
`;
