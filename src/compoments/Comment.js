import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CommentWrap = styled.div`
  width: 100%;
  min-height: 80px;
  margin: 1rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f0f0f0;
  span {
    flex: 1;
  }
  span + span {
    margin-left: 0.5rem;
  }
`;

const UserName = styled.span`
  flex: 1;
  font-weight: 600;
  font-size: 1rem;
`;

const CreatedAt = styled.span`
  color: #a7a7a7;
  font-size: 0.8rem;
`;

const Rate = styled.span`
  font-size: 0.9rem;
`;

const Text = styled.div`
  width: 60%;
`;

export default function Comment({ nickname, createdAt, text, rate }) {
  return (
    <CommentWrap>
      <div>
        <UserName>{nickname}</UserName>
        <CreatedAt>{createdAt}</CreatedAt>
      </div>
      <Rate>평점: {rate}</Rate>
      <Text>{text}</Text>
    </CommentWrap>
  );
}

Comment.propTypes = {
  nickname: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
};
