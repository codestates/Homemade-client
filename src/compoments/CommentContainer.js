/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";
import { lighten, darken } from "polished";
import Comment from "./Comment";

export default function CommentContainer({
  myId,
  savedComments,
  handleSubmit,
  deleteComment,
  accessToken,
  updateComment,
}) {
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(3);

  const submitComment = (comment, rate) => {
    handleSubmit(comment, rate);
    setInput("");
    setRating(3);
  };

  const handleDecrease = () => {
    setRating(state => state - 1);
  };

  const handleIncrease = () => {
    setRating(state => state + 1);
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  return (
    <div>
      <Title>
        댓글
        <CommentLen>{savedComments ? savedComments.length : ""}</CommentLen>
      </Title>
      <CommentWrap>
        {savedComments
          ? savedComments.map(comment => {
              const {
                userId,
                nickname,
                createdAt,
                created_At,
                text,
                rate,
              } = comment;
              return (
                <Comment
                  key={comment.id}
                  myId={myId}
                  commentId={comment.id}
                  userId={userId}
                  nickname={nickname}
                  createdAt={createdAt || created_At}
                  text={text}
                  value={input}
                  rate={rate}
                  deleteComment={deleteComment}
                  updateComment={updateComment}
                />
              );
            })
          : ""}
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
              value={input}
              placeholder="댓글을 남겨주세요."
              onChange={e => handleChange(e)}
            />
            <CommentButton
              onClick={() => submitComment(input, rating)}
              type="button"
              disabled={!input || !accessToken}
            >
              등록
            </CommentButton>
          </InputWrap>
        </CommentInputForm>
      </CommentWrap>
    </div>
  );
}

// CommentContainer.propTypes = {
//   comments: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       nickname: PropTypes.string.isRequired,
//       createdAt: PropTypes.string.isRequired,
//       text: PropTypes.string.isRequired,
//       rate: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
// };

const CommentWrap = styled.div`
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  width: 720px;
  display: flex;
  flex-direction: column;
`;

const CommentInputForm = styled.form`
  width: 100%;
  height: 100px;
  margin: 1.6rem auto;
`;

const CommentInput = styled.textarea`
  width: 612px;
  height: 100px;
  font-size: 1.2rem;
  padding: 8px;
  margin: 0.1rem auto;
  border: 1px solid #aeb4b7;
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
  top: -48px;
  border: 1px solid #aeb4b7;
  background-color: white;
  cursor: pointer;
  &:focus {
    outline: none;
  }
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
  border: 2px solid #aeb4b7;
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

const Title = styled.p`
  margin-bottom: 0;
  padding-left: 0.15rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #aeb4b7;
`;
const CommentLen = styled.span`
  color: #74b043;
`;
