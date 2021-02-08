import React, { useState } from "react";
import SubmitRecipeForm from "../compoments/SubmitRecipeForm";

export default function SubmitRecipe() {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [recipe, setRecipe] = useState({
    title: "",
    category: "한식",
  });

  const showImg = (e, idx) => {
    setPreviews(state => {
      return [
        ...state.slice(0, idx),
        URL.createObjectURL(e.target.files[0]),
        ...state.slice(idx + 1),
      ];
    });
  };

  const handleChange = (e, idx) => {
    const img = { name: e.target.name, image: e.target.files[0] };
    setImages(state => {
      return [...state.slice(0, idx), img, ...state.slice(idx + 1)];
    });
    showImg(e, idx);
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
    console.log(recipe);
  };

  const handleUpload = async () => {
    const fd = new FormData();
    images.forEach(obj => {
      fd.append("images[]", obj.image, obj.name);
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
    console.log(content);
    // const response = await  axios.post('', fd,  headers: { 'Content-Type': 'multipart/form-data' },);
    // const [thumbnail, ...rest] = response   url이 되돌아오고

    // const recipeInfo = {
    //   thumbnail,
    //   title: recipe.title,
    //   images: rest,
    //   category: recipe.category,
    //   content
    // };
  };
  const currentSteps = [1, 2, 3, 4, 5];

  return (
    <SubmitRecipeForm
      images={images}
      previews={previews}
      recipe={recipe}
      handleChange={handleChange}
      handleRecipe={handleRecipe}
      handleUpload={handleUpload}
      currentSteps={currentSteps}
    />
  );
}
