/* eslint-disable react/require-default-props */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

export default function UserRecipe({ myrecipes }) {
  // carousel 상태
  const slideRef = useRef(null);
  const TOTAL_SLIDES = Math.floor(myrecipes.length / 4);
  const myRecipesQuantity = myrecipes.length > 0 ? myrecipes.length : 0;
  const [currentSlide, setCurrentSlide] = useState(0);
  // myrecipes 상태
  // eslint-disable-next-line no-unused-vars
  const [myRecipes, setMyRecipes] = useState({
    id: "",
    title: "",
    thumbnailUrl: "",
    createdAt: "",
  });
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
          const { id, title, thumbnailUrl } = res.data.data.recipes;
          setMyRecipes({
            id,
            title,
            thumbnailUrl,
          });
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
          {myrecipes.map(recipe => {
            return (
              <RecipeCard key={recipe.id}>
                <CreatedAt>{recipe.created_at}</CreatedAt>
                <RecipeImg className="recipe" to={`/recipe/${recipe.id}`}>
                  <img
                    className="thumbnail"
                    src={recipe.thumbnail_uri}
                    alt={recipe.title}
                  />
                </RecipeImg>
                <div> {recipe.title}</div>
              </RecipeCard>
            );
          })}
        </SliderContainer>
        <Pages>
          {`${TOTAL_SLIDES + 1} 페이지 중 ${currentSlide + 1} 페이지`}
        </Pages>
        <ButtonWrap>
          <ButtonImg onClick={prevSlide}>Previous Slide</ButtonImg>
          <ButtonImg onClick={nextSlide}>Next Slide</ButtonImg>
        </ButtonWrap>
      </Container>
    </div>
  );
}
UserRecipe.propTypes = {
  myrecipes: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail_uri: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }),
};
UserRecipe.defaultProps = {
  myrecipes: [
    {
      id: 1,
      title: "닭강정 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 2,
      title: "콜라 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 3,
      title: "우유 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 4,
      title: "닭강정 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 5,
      title: "딸기 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 3,
      title: "우유 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 4,
      title: "닭강정 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 5,
      title: "딸기 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 3,
      title: "우유 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 4,
      title: "닭강정 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 5,
      title: "딸기 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 3,
      title: "우유 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 4,
      title: "닭강정 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 5,
      title: "딸기 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
  ],
};
const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;
const ButtonWrap = styled.div`
  text-align: center;
`;
const ButtonImg = styled.button`
  all: unset;
  border: 1px solid #892ce2;
  padding: 0.5em 2em;
  color: #892ce2;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: #892ce2;
    color: #fff;
  }
  margin: 20px;
`;
const SliderContainer = styled.div`
  width: 100%;
  height: 350px;
  display: flex; //이미지들을 가로로 나열합니다.
`;
const Pages = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: gray;
`;
const RecipeQuantity = styled.div`
  text-align: right;
`;
const MyrecipesTitle = styled.div`
  text-align: center;
  padding: 30px;
  font-size: 1.5rem;
`;
const CreatedAt = styled.div`
  text-align: right;
  font-size: 0.8rem;
`;

const RecipeCard = styled.div`
  width: 200px;
  height: 200px;
  margin: 20px;
  display: inline-block;
`;
// recipeList 영역
const RecipeImg = styled(Link)`
  display: inline-block;
  img {
		width: 200px;
    height: 239px;
`;
