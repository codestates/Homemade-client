/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecipeInfo from "../compoments/RecipeInfo";

export default function RecipeDescription() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(async () => {
    try {
      const data = await axios.get(
        `https://homemade2021.ml/recipes/recipe/${id}`,
      );
      const res = data.data.data.recipe;

      setRecipe(res);
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
        <RecipeInfo recipe={recipe} />
      )}
    </>
  );
}
