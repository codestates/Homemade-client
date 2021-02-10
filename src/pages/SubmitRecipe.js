/* eslint-disable no-restricted-syntax */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SubmitRecipeForm from "../compoments/SubmitRecipeForm";

export default function SubmitRecipe() {
  const { accessToken, isLogged } = JSON.parse(
    localStorage.getItem("loggedInfo"),
  );
  const history = useHistory();
  if (!isLogged) {
    history.push("/");
  }
  const categories = ["한식", "중식", "일식", "양식", "음료/술"];
  const [stepImages, setStepImages] = useState({});
  const [previews, setPreviews] = useState({});
  const [recipe, setRecipe] = useState({
    title: "",
    category: "한식",
  });
  const [currentSteps, setCurrentSteps] = useState([1, 2, 3, 4, 5]);
  const stepRefs = useRef([]);
  const thumbnailRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, currentSteps.length);
  }, [currentSteps]);

  const AddStep = () => {
    setCurrentSteps(state => {
      return [...state, state[state.length - 1] + 1];
    });
  };

  const showImg = e => {
    const { name } = e.target;
    const image = URL.createObjectURL(e.target.files[0]);

    const img = {};
    img[name] = image;

    setPreviews(state => {
      return { ...state, ...img };
    });
  };

  const handleChange = e => {
    const { name } = e.target;
    const image = e.target.files[0];

    const img = {};
    img[name] = image;

    setStepImages(state => {
      return { ...state, ...img };
    });
    showImg(e);
  };

  const handleRecipe = e => {
    const {
      target: { name, value },
    } = e;

    setRecipe(state => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const handleUpload = async () => {
    const fd = new FormData();
    Object.keys(stepImages).forEach(key => {
      fd.append("imgs", stepImages[key], key);
    });
    const content = Object.keys(recipe)
      .filter(el => el !== "title" && el !== "category")
      .sort()
      .sort((a, b) => b.length - a.length)
      .map(el => recipe[el])
      .join("//");

    try {
      const imageUrls = await axios.post("https://homemade2021.ml/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const {
        data: { thumbnail, images },
      } = imageUrls;

      const recipeInfo = {
        thumbnail,
        title: recipe.title,
        imageUrl: images,
        categoryId: categories.indexOf(recipe.category) + 1,
        content,
      };

      const data = await axios.post(
        "https://homemade2021.ml/recipes/content",
        recipeInfo,
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      const {
        data: { id },
      } = data;

      history.push(`/recipe/${id}`);
    } catch (err) {
      setErrorMessage("레시피 등록이 되지 않았습니다.");
    }
  };

  return (
    <SubmitRecipeForm
      images={stepImages}
      previews={previews}
      recipe={recipe}
      handleChange={handleChange}
      handleRecipe={handleRecipe}
      handleUpload={handleUpload}
      currentSteps={currentSteps}
      AddStep={AddStep}
      stepRefs={stepRefs}
      thumbnailRef={thumbnailRef}
      errorMessage={errorMessage}
    />
  );
}
