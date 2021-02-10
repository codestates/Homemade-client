import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { lighten, darken } from "polished";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";

export default function CommentContainer({ comments }) {
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(3);

  const { id } = useParams();
  const { accessToken } = JSON.parse(localStorage.getItem("loggedInfo"));

  const handleDecrease = () => {
    setRating(state => state - 1);
  };

  const handleIncrease = () => {
    setRating(state => state + 1);
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    const comment = {
      id,
      text: input,
      rate: rating,
    };
    console.log("실행");
    await axios.post(`https://homemade2021.ml/recipes/comment`, comment, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    setInput("");
    setRating(3);
  };
  return (
    <CommentWrap>
      {comments.map(comment => {
        const { nickname, createdAt, text, rate } = comment;
        return (
          <Comment
            key={comment.id}
            nickname={nickname}
            createdAt={createdAt}
            text={text}
            value={input}
            rate={rate}
          />
        );
      })}
      <CommentInputForm>
        <RateContainer>
          <SetRatingBtn
            type="button"
            onClick={handleDecrease}
            disabled={rating <= 0}
          />
          <Rating>{rating}</Rating>
          <SetRatingBtn
            increase
            type="button"
            onClick={handleIncrease}
            disabled={rating >= 5}
          />
        </RateContainer>
        <InputWrap>
          <CommentInput
            type="textarea"
            name="commentInput"
            placeholder="댓글을 남겨주세요."
            onChange={e => handleChange(e)}
          />
          <CommentButton onClick={handleSubmit} type="button" disabled={!input}>
            등록
          </CommentButton>
        </InputWrap>
      </CommentInputForm>
    </CommentWrap>
  );
}

CommentContainer.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      rate: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const CommentWrap = styled.div`
  width: 720px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const CommentInputForm = styled.form`
  width: 100%;
  height: 100px;
  margin: 1.6rem;
`;

const CommentInput = styled.textarea`
  width: 594px;
  height: 100px;
  font-size: 1.2rem;
  padding: 8px;
  margin: 0 auto;
  border: 1px solid #cccccc;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const InputWrap = styled.div`
  height: 100px;
  width: 712px;
`;

const CommentButton = styled.button`
  position: relative;
  display: inline-block;
  padding: 0;
  height: 100px;
  width: 100px;
  top: -46px;
  border: 1px solid #cccccc;
  background-color: white;
`;

const RateContainer = styled.div`
  height: 40px;
  span {
    line-height: 40px;
    vertical-align: middle;
  }
`;

const SetRatingBtn = styled.button`
  position: absolute;
  top: -4px;
  border: 2px solid lightgrey;
  background-color: #fff;
  font-size: 16px;
  height: 2.5em;
  width: 2.5em;
  border-radius: 999px;
  position: relative;
  cursor: pointer;
  &:after,
  &:before {
    content: "";
    display: block;
    background-color: grey;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${({ increase }) =>
    increase &&
    `
    left:30px;
    &:before {
      height: 1em;
      width: 0.2em;
    }
  `}

  &:after {
    height: 0.2em;
    width: 1em;
  }

  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: ${lighten(0.1, `#6f6f6f`)};
    &:after,
    &:before {
      background: white;
    }
  }
  &:active {
    transition: all 0.3s ease-in-out;
    background-color: ${darken(0.1, `#6f6f6f`)};
    &:after,
    &:before {
      background: white;
    }
  }
  &:focus {
    outline: none;
  }
`;

const Rating = styled.span`
  position: absolute;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
  font-size: 1.4rem;
`;
