/* eslint-disable no-restricted-syntax */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
import SubmitRecipeForm from "../compoments/SubmitRecipeForm";

export default function SubmitRecipe({ accessToken }) {
  const [images, setImages] = useState({});
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

    setImages(state => {
      return { ...state, ...img };
    });
    showImg(e);
    console.log(images);
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
    Object.keys(images).forEach(key => {
      console.log(key);
      fd.append("imgs", images[key], key);
    });
    // images.forEach(obj => {
    //   fd.append("images", obj.image, obj.name);
    // });
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
    for (const pair of fd.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    console.log(content, accessToken);
    // const response = await axios.post("/", fd, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
    // const [thumbnail, ...rest] = response   url이 되돌아오고
    // rest.map((el.idx) => ({...el, order: idx}))

    // const recipeInfo = {
    //   thumbnail,
    //   title: recipe.title,
    //   images: rest,
    //   category: recipe.category,
    //   content
    // };

    // await axios.post("https://homemade2021.ml/recipes/content", recipeInfo, {
    //   withCredentials: true,
    //   headers: {
    //     authorization: `Bearer ${accessToken}`,
    //   },
    // });
  };

  return (
    <SubmitRecipeForm
      images={images}
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
