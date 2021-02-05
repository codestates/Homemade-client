import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function Comment({ nickname, createdAt, text, rate }) {
  const starRate = Number(rate) * 20;
  return (
    <CommentWrap>
      <div>
        <UserName>{nickname}</UserName>
        <CreatedAt>{createdAt}</CreatedAt>
      </div>
      <StarRating className="star-ratings-sprite">
        <span
          style={{ width: `${starRate}%` }}
          className="star-ratings-sprite-rating"
        />
      </StarRating>
      <Text>{text}</Text>
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
  padding-top: 1.2rem;
  width: 60%;
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

Comment.propTypes = {
  nickname: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
};
