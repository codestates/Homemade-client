/* eslint-disable no-restricted-syntax */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SubmitRecipeForm from "../compoments/SubmitRecipeForm";

export default function SubmitRecipe({ accessToken }) {
  const [stepImages, setStepImages] = useState({});
  const [previews, setPreviews] = useState({});
  const [recipe, setRecipe] = useState({
    title: "",
    category: "한식",
  });
  const [currentSteps, setCurrentSteps] = useState([1, 2, 3, 4, 5]);
  const stepRefs = useRef([]);
  const thumbnailRef = useRef();

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
    const {
      introduction,
      ingredient,
      step1,
      step2,
      step3,
      step4,
      step5,
    } = recipe;
    const content = [
      introduction,
      ingredient,
      step1,
      step2,
      step3,
      step4,
      step5,
    ].join("//");

    const imgaeUrls = await axios.post("http://localhost:4000/image", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const {
      data: { thumbnail, images },
    } = imgaeUrls;

    const recipeInfo = {
      thumbnail,
      title: recipe.title,
      imageUrl: images,
      category: recipe.category,
      content,
    };

    const data = await axios.post(
      "http://localhost:4000/recipes/content",
      recipeInfo,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const {
      data: { id },
    } = data;

    const history = useHistory();

    history.push(`/recipe/${id}`);
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
    />
  );
}

SubmitRecipe.propTypes = {
  accessToken: PropTypes.string.isRequired,
};
