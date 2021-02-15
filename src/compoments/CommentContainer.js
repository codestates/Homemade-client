/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";
import Comment from "./Comment";
import StarRating from "./StarRating";

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

  const handleChange = e => {
    setInput(e.target.value);
  };
  return (
    <Container>
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
            <StarRating setRating={setRating} />
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
    </Container>
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

const Container = styled.div`
  width: 100%;
`;

const CommentWrap = styled.div`
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CommentInputForm = styled.form`
  width: 100%;
  height: 100px;
  margin: 1.6rem auto;
`;

const CommentInput = styled.textarea`
  width: 80%;
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
  display: flex;
  padding-left: 4rem;
  padding-right: 4rem;
`;

const CommentButton = styled.button`
  position: relative;
  transform: translate(0%, 1%);
  flex: 1;
  display: inline-block;
  padding: 0;
  height: 100px;
  width: 100%;
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
  div {
    padding-left: 4rem;
  }
`;

const Title = styled.p`
  border-top: 10px solid #ffffff;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 4rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #aeb4b7;
`;
const CommentLen = styled.span`
  color: #74b043;
`;
