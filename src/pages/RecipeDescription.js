/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import RecipeInfo from "../compoments/RecipeInfo";

export default function RecipeDescription() {
  const accessToken = useRef(
    localStorage.getItem("loggedInfo") &&
      JSON.parse(localStorage.getItem("loggedInfo")).accessToken,
  );

  const contentId = useParams().id;
  const history = useHistory();

  const [userId, setUserId] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedComments, setSavedComments] = useState(null);
  const deleteContent = async recipeId => {
    try {
      await axios({
        url: "https://homemade2021.ml/recipes/dcontent",
        method: "delete",
        data: { id: recipeId },
        headers: {
          withCredentials: "true",
          authorization: `Bearer ${accessToken.current}`,
          "Content-Type": "application/json",
        },
      });

      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const updateComment = async (nickname, commentId, text) => {
    try {
      const res = await axios.patch(
        "https://homemade2021.ml/users/ucomment",
        {
          nickname,
          commentId,
          text,
          contentId,
        },
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${accessToken.current}`,
            "Content-Type": "application/json",
          },
        },
      );
      const updatedComment = res.data.data.commentInfo;
      setSavedComments(comments =>
        comments.map(comment =>
          comment.id === updatedComment.id ? updatedComment : comment,
        ),
      );

      console.log("업뎃");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async commentId => {
    try {
      await axios({
        url: "https://homemade2021.ml/recipes/dcomment",
        method: "delete",
        data: { id: commentId },
        headers: {
          withCredentials: "true",
          authorization: `Bearer ${accessToken.current}`,
          "Content-Type": "application/json",
        },
      });

      setSavedComments(state => state.filter(el => el.id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (text, rating) => {
    const comment = {
      id: contentId,
      text,
      rate: rating,
    };
    try {
      const data = await axios.post(
        `https://homemade2021.ml/recipes/comment`,
        comment,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken.current}`,
          },
          withCredentials: true,
        },
      );
      const newComment = data.data.data.commentInfo;
      console.log("nnn", newComment);
      setSavedComments(state => [...state, newComment]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    try {
      if (accessToken) {
        const myInfo = await axios.get(
          `https://homemade2021.ml/users/userInfo`,
          {
            headers: {
              authorization: `Bearer ${accessToken.current}`,
            },
          },
        );
        setUserId(myInfo.data.data.userInfo.id);
      }

      const data = await axios.get(
        `https://homemade2021.ml/recipes/recipe/${contentId}`,
      );

      const recipeData = data.data.data.recipe;

      setRecipe(recipeData);
      setIsLoading(false);
      setSavedComments(recipeData.comments);
    } catch (err) {
      setErrorMessage("레시피를 불러오지 못했습니다.");
    }
    return () => {
      setIsLoading(true);
      setRecipe({});
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div>loading...{errorMessage ? <div>{errorMessage}</div> : ""}</div>
      ) : (
        <RecipeInfo
          recipe={recipe}
          myId={userId}
          deleteContent={deleteContent}
          accessToken={accessToken}
          contentId={contentId}
          savedComments={savedComments}
          deleteComment={deleteComment}
          handleSubmit={handleSubmit}
          updateComment={updateComment}
        />
      )}
    </>
  );
}
