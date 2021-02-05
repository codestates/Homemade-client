import React from "react";
import RecipeList from "../compoments/RecipeList";
import recipes from "../assets/recipes";

export default function Main() {
  return <RecipeList recipes={recipes} />;
}
