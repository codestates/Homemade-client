/* eslint-disable no-restricted-syntax */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory, Redirect, useLocation } from "react-router-dom";
import SubmitRecipeForm from "../compoments/SubmitRecipeForm";

export default function SubmitRecipe() {
  const accessToken = useRef(
    localStorage.getItem("loggedInfo") &&
      JSON.parse(localStorage.getItem("loggedInfo")).accessToken,
  );

  const history = useHistory();
  const location = useLocation();

  if (!accessToken.current) {
    return <Redirect to="/" />;
  }

  const categories = ["한식", "중식", "일식", "양식", "음료/술"];

  const [images, setImages] = useState({});
  const [previews, setPreviews] = useState({});
  const [recipe, setRecipe] = useState({
    title: "",
    category: "한식",
  });

  const [currentSteps, setCurrentSteps] = useState([1, 2, 3]);
  const stepRefs = useRef([]);
  const thumbnailRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (location.state) {
      console.log(location.state);
      const currentRecipe = location.state.recipe;

      const currentRecipeContent = currentRecipe.content.split("//");
      const currentRecipeCategory = currentRecipe.categoryName;
      const currentRecipeTitle = currentRecipe.title;
      const currentRecipeIntroduction = currentRecipeContent.shift();
      const currentRecipeIngredient = currentRecipeContent.shift();
      const tempRecipe = {
        title: currentRecipeTitle,
        category: currentRecipeCategory,
        introduction: currentRecipeIntroduction,
        ingredient: currentRecipeIngredient,
      };
      currentRecipeContent.forEach((step, idx) => {
        tempRecipe[`step${idx + 1}`] = step;
      });

      const currentRecipePreview = { thumbnail: currentRecipe.thumbnailUrl };
      currentRecipe.imageUrls.forEach((url, idx) => {
        currentRecipePreview[`step${idx + 1}`] = url;
      });

      setPreviews(currentRecipePreview);
      setRecipe(tempRecipe);
    }
    return () =>
      setRecipe({
        title: "",
        category: "한식",
      });
  }, []);

  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, currentSteps.length);
  }, [currentSteps]);

  const addStep = () => {
    setCurrentSteps(state => {
      return [...state, state[state.length - 1] + 1];
    });
  };

  const deleteImage = name => {
    const tempImages = { ...images };
    const tempPreviews = { ...previews };

    delete tempImages[name];
    delete tempPreviews[name];

    setImages(tempImages);
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

    setImages(state => {
      return { ...state, ...img };
    });
    showImg(e);
  };

  const handleRecipe = e => {
    const {
      target: { name, value },
    } = e;
    console.log("recipe", recipe);
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
      fd.append("imgs", images[key], key);
    });

    const content = Object.keys(recipe)
      .filter(el => el !== "title" && el !== "category")
      .sort()
      .sort((a, b) => b.length - a.length)
      .map(el => recipe[el])
      .join("//");

    if (
      Object.keys(recipe).length < 6 ||
      Object.keys(recipe).length - 3 !== Object.keys(previews).length
    ) {
      setErrorMessage("모든 항목을 입력해 주세요.");
      return;
    }

    try {
      if (location.state) {
        const imageUrls = await axios.post(
          "https://homemade2021.ml/image",
          fd,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        const stepImageUrls = [];

        const updatedImageUrls = { ...previews };
        imageUrls.data.images.forEach(el => {
          const [[key, value]] = Object.entries(el);
          updatedImageUrls[key] = value;
        });

        const recipeInfo = {
          thumbnailUrl: imageUrls.thumbnail,
          title: recipe.title,
          imageUrls: stepImageUrls,
          categoryId: categories.indexOf(recipe.category) + 1,
          contents: content,
          contentId: location.state.recipe.id,
        };

        const response = await axios.patch(
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
            data: {
              contentInfo: { id },
            },
          },
        } = response;

        if (id) {
          setImages({});
          setPreviews({});
          setRecipe({ title: "", category: "한식" });
          setCurrentSteps([1, 2, 3, 4, 5]);
          setErrorMessage("");
          history.push(`/recipe/${id}`);
        } else {
          setErrorMessage("레시피 등록이 되지 않았습니다.");
        }
      } else {
        const imageUrls = await axios.post(
          "https://homemade2021.ml/image",
          fd,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        const { data } = imageUrls;

        const stepImageUrls = [];
        data.images.forEach(el => {
          const [value] = Object.values(el);
          stepImageUrls.push(value);
        });

        const recipeInfo = {
          thumbnailUrl: data.thumbnail,
          title: recipe.title,
          imageUrl: stepImageUrls,
          categoryId: categories.indexOf(recipe.category) + 1,
          contents: content,
        };

        const response = await axios.post(
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
        } = response;

        if (id) {
          setImages({});
          setPreviews({});
          setRecipe({ title: "", category: "한식" });
          setCurrentSteps([1, 2, 3, 4, 5]);
          setErrorMessage("");
          history.push(`/recipe/${id}`);
        } else {
          setErrorMessage("레시피 등록이 되지 않았습니다.");
        }
      }
    } catch (err) {
      setErrorMessage("레시피 등록이 되지 않았습니다.");
    }
  };

  return (
    <SubmitRecipeForm
      deleteImage={deleteImage}
      images={images}
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
