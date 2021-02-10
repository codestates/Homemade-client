/* eslint-disable no-restricted-syntax */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import SubmitRecipeForm from "../compoments/SubmitRecipeForm";

export default function SubmitRecipe() {
  const accessToken = useRef(
    localStorage.getItem("loggedInfo") &&
      JSON.parse(localStorage.getItem("loggedInfo")).accessToken,
  );
  const history = useHistory();

  if (!accessToken.current) {
    return <Redirect to="/" />;
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

  const addStep = () => {
    setCurrentSteps(state => {
      return [...state, state[state.length - 1] + 1];
    });
  };

  const deleteImage = name => {
    const tempImages = { ...stepImages };
    const tempPreviews = { ...previews };

    delete tempImages[name];
    delete tempPreviews[name];

    setStepImages(tempImages);
    setPreviews(tempPreviews);
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

    if (
      Object.keys(recipe).length < 9 ||
      Object.keys(recipe).length - 3 !== Object.keys(stepImages).length
    ) {
      setErrorMessage("모든 항목을 입력해 주세요.");
      return;
    }

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
            authorization: `Bearer ${accessToken.current}`,
            "Content-Type": "application/json",
          },
        },
      );

      const {
        data: {
          data: { id },
        },
      } = data;

      if (id) {
        setStepImages({});
        setPreviews({});
        setRecipe({ title: "", category: "한식" });
        setCurrentSteps([1, 2, 3, 4, 5]);
        setErrorMessage("");
        history.push(`/recipe/${id}`);
      } else {
        setErrorMessage("레시피 등록이 되지 않았습니다.");
      }
    } catch (err) {
      setErrorMessage("레시피 등록이 되지 않았습니다.");
    }
  };

  return (
    <SubmitRecipeForm
      deleteImage={deleteImage}
      images={stepImages}
      previews={previews}
      recipe={recipe}
      handleChange={handleChange}
      handleRecipe={handleRecipe}
      handleUpload={handleUpload}
      currentSteps={currentSteps}
      addStep={addStep}
      stepRefs={stepRefs}
      thumbnailRef={thumbnailRef}
      errorMessage={errorMessage}
    />
  );
}
