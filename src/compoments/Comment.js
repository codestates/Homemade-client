import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { darken, lighten } from "polished";

export default function Comment({
  myId,
  userId,
  commentId,
  nickname,
  createdAt,
  text,
  rate,
  deleteComment,
  updateComment,
}) {
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);
  const starRate = Number(rate) * 20;

  const handleUpdate = async tempText => {
    await updateComment(nickname, commentId, tempText);
    setActiveUpdate(false);
  };

  const handleClick = () => {
    setActiveUpdate(state => !state);
  };

  return (
    <CommentWrap>
      <CommentTop>
        <UserName>{nickname || "anonymous"}</UserName>
        <CreatedAt>{createdAt ? createdAt.slice(0, 10) : ""}</CreatedAt>
        <BtnWrap active={userId === myId}>
          <Update onClick={handleClick}>수정</Update>
          <Delete onClick={() => deleteComment(commentId)}>삭제</Delete>
        </BtnWrap>
      </CommentTop>
      <StarRating className="star-ratings-sprite">
        <span
          style={{ width: `${starRate}%` }}
          className="star-ratings-sprite-rating"
        />
      </StarRating>
      {activeUpdate ? (
        <UpdateDiv>
          <UpdateInput
            onChange={e => setUpdatedText(e.target.value)}
            value={updatedText}
            type="text"
          />
          <UpdateBtn onClick={() => handleUpdate(updatedText)} type="button">
            저장
          </UpdateBtn>
          <CloseBtn onClick={() => setActiveUpdate(false)}>취소</CloseBtn>
        </UpdateDiv>
      ) : (
        <Text>{text}</Text>
      )}
    </CommentWrap>
  );
}
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

const Text = styled.div`
  font-size: 1.2rem;
  padding-top: 1.2rem;
  width: 60%;
`;

const UpdateInput = styled(Text.withComponent("input"))`
  &:focus {
    outline: none;
  }
  width: 80%;
  border: none;
  border-bottom: 1px solid black;
  padding-top: 0.9rem;
`;

const StarRating = styled.div`
  margin-top: 0.2rem;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2605/star-rating-sprite.png")
    repeat-x;
  font-size: 0;
  height: 21px;
  line-height: 0;
  overflow: hidden;
  text-indent: -999em;
  width: 110px;

  span {
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2605/star-rating-sprite.png")
      repeat-x;
    background-position: 0 100%;
    float: left;
    height: 21px;
    display: block;
  }
`;

const CommentTop = styled.div`
  position: relative;
`;

const BtnWrap = styled.span`
  display: none;
  color: #a7a7a7;

  ${({ active }) =>
    active &&
    `
    position: absolute;
    right: 0;
    width: 60px;
    font-size: 0.9rem;
    display:inline-block;
  `}
`;

const Delete = styled.span`
  cursor: pointer;
`;

const Update = styled.span`
  cursor: pointer;
`;

const UpdateBtn = styled.button`
  margin: 0.4rem;
  margin-bottom: 0;
  width: 48px;
  height: 30px;
  border-raidus: 4px;
  cursor: pointer;
  border: none;
  color: white;
  background-color: #0b5ed4;
  &:active {
    background-color: ${darken(0.1, `#0b5ed4`)};
  }
  &:focus {
    outline: none;
  }
`;

const CloseBtn = styled(UpdateBtn)`
  color: #606060;
  background-color: white;
  &:active {
    background-color: ${lighten(0.5, `#606060`)};
  }
`;

const UpdateDiv = styled.div`
  position: relative;
  width: 100%;
`;

Comment.propTypes = {
  myId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  deleteComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
};
