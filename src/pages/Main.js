import React from "react";
import RecipeList from "../compoments/RecipeList";
import recipes from "../assets/recipes";
import Banner from "../compoments/Banner";

export default function Main() {
  return (
    <>
      <Banner />
      <RecipeList recipes={recipes} />;
    </>
  );
}
