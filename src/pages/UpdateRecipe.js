/* eslint-disable no-restricted-syntax */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory, Redirect, useLocation } from "react-router-dom";
import UpdateRecipeForm from "../compoments/UpdateRecipeForm";

export default function UpdateRecipe() {
  const accessToken = useRef(
    localStorage.getItem("loggedInfo") &&
      JSON.parse(localStorage.getItem("loggedInfo")).accessToken,
  );
  const history = useHistory();
  const location = useLocation();

  if (!accessToken.current) {
    return <Redirect to="/" />;
  }

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

      const { contentId } = location.state;

      const recipeInfo = {
        contentId,
        thumbnailUrl: thumbnail,
        title: recipe.title,
        imageUrl: images,
        contents: content,
      };

      const data = await axios.patch(
        "https://homemade2021.ml/users/ucontent",
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
    <UpdateRecipeForm
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
