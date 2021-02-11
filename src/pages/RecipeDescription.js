/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import RecipeInfo from "../compoments/RecipeInfo";

export default function RecipeDescription() {
  const accessToken = useRef(
    localStorage.getItem("loggedInfo") &&
      JSON.parse(localStorage.getItem("loggedInfo")).accessToken,
  );

  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const deleteContent = async recipeId => {
    try {
      await axios({
        url: "https://homemade2021.ml/recipes/dcontent",
        method: "delete",
        data: { id: recipeId },
        headers: {
          withCredentials: "true",
          authorization: `Bearer ${accessToken.current}`,
          "Content-Type": "application/json",
        },
      });

      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    try {
      if (accessToken) {
        const myInfo = await axios.get(
          `https://homemade2021.ml/users/userInfo`,
          {
            headers: {
              authorization: `Bearer ${accessToken.current}`,
            },
          },
        );
        setUserId(myInfo.data.data.userInfo.id);
      }

      const data = await axios.get(
        `https://homemade2021.ml/recipes/recipe/${id}`,
      );
      const recipeData = data.data.data.recipe;

      setRecipe(recipeData);
      setIsLoading(false);
    } catch (err) {
      setErrorMessage("레시피를 불러오지 못했습니다.");
    }
    return () => {
      setIsLoading(true);
      setRecipe({});
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div>loading...{errorMessage ? <div>{errorMessage}</div> : ""}</div>
      ) : (
        <RecipeInfo
          recipe={recipe}
          userId={userId}
          deleteContent={deleteContent}
        />
      )}
    </>
  );
}
