import React from "react";
import RecipeInfo from "../compoments/RecipeInfo";
import recipe from "../assets/recipe";

const {
  title,
  thumbnailUrl,
  imageUrls,
  content,
  nickname,
  avatarUrl,
  views,
  rate,
  createdAt,
} = recipe;

export default function RecipeDescription() {
  return (
    <>
      <RecipeInfo
        title={title}
        thumbnailUrl={thumbnailUrl}
        createdAt={createdAt}
        imageUrls={imageUrls}
        content={content}
        views={views}
        rate={rate}
        nickname={nickname}
        avatarUrl={avatarUrl}
      />
    </>
  );
}
