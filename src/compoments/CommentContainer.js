import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Comment from "./Comment";

export default function CommentContainer({ comments }) {
  return (
    <CommentWrap>
      {comments.map(comment => {
        const { id, nickname, createdAt, text, rate } = comment;
        return (
          <Comment
            key={id}
            nickname={nickname}
            createdAt={createdAt}
            text={text}
            rate={rate}
          />
        );
      })}
      <CommentInputForm>
        <InputWrap>
          <CommentInput
            type="textarea"
            name="commentInput"
            placeholder="댓글을 남겨주세요."
          />
          <CommentButton type="button">등록</CommentButton>
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
  width: 712px;
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
  height: 82px;
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
