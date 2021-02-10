/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { darken, lighten } from "polished";
import CommentContainer from "./CommentContainer";
import comments from "../assets/comments";

function RecipeInfo({ recipe }) {
  const {
    id,
    title,
    createdAt,
    thumbnail_url,
    rate,
    views,
    image_urls,
    content,
    username,
    avatarUrl,
  } = recipe;
  const recipeContent = content.split("//");
  console.log(id);
  const introduction = recipeContent[0];
  const ingredient = recipeContent[1];
  const starRate = Number(rate) * 20;
  return (
    <RecipeContainer>
      <Thumbnail src={thumbnail_url} alt="recipe" />
      <AvatarWrap>
        <Avatar
          src={avatarUrl || "../images/defaultUserAvatar.png"}
          alt="avatar"
        />
      </AvatarWrap>
      <UserName>{username}</UserName>
      <Handler>
        <Link to="/">삭제</Link>
        <Link to="/">수정</Link>
      </Handler>

      <Title>
        {title}
        <Introduction>{introduction}</Introduction>
        <StarRating>
          <span style={{ width: `${starRate}%` }} />
        </StarRating>
        <SmallInfo>{createdAt}</SmallInfo>
      </Title>
      <Article>
        <Description>
          <DescriptionTitle>재료</DescriptionTitle>
          <DescriptionContent ingredient>{ingredient}</DescriptionContent>
        </Description>
      </Article>
      {image_urls.map((url, idx) => (
        <Article key={`${url + idx}`}>
          <RecipeImg src={url} alt="recipe" />
          <Description>
            <DescriptionTitle>step {idx + 1}</DescriptionTitle>
            <DescriptionContent>{recipeContent[idx + 2]}</DescriptionContent>
          </Description>
        </Article>
      ))}
      <CommentContainer comments={comments} />
      <SmallInfo>view: {views}</SmallInfo>
    </RecipeContainer>
  );
}

// RecipeInfo.propTypes = {
//   recipe: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     thumbnailUrl: PropTypes.string.isRequired,
//     imageUrls: PropTypes.arrayOf(
//       PropTypes.shape({
//         imageUrl: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     content: PropTypes.string.isRequired,
//     views: PropTypes.string.isRequired,
//     createdAt: PropTypes.string.isRequired,
//     rate: PropTypes.string.isRequired,
//     // categoryName: PropTypes.string.isRequired,
//     username: PropTypes.string.isRequired,
//     avatarUrl: PropTypes.string.isRequired,
//   }),
// };

const RecipeContainer = styled.section`
  margin: 0 auto;
  width: 720px;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
`;

const Thumbnail = styled.img`
  position: relative;
  max-width: 720px;
  height: auto;
  margin: 0 auto;
`;
const AvatarWrap = styled.span`
  padding-top: 75px;
  display: inline-block;
`;

const Avatar = styled.img`
  position: absolute;
  width: 120px;
  heigth: 120px;
  border-radius: 50%;
  margin-top: -123px;
  margin-left: 300px;
`;

const UserName = styled.div`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  font-weight: 500;
  padding-top: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: solid 1px #e6e7e8;
`;

const Article = styled.article`
  width: 100%;
  display: flex;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-bottom: solid 1px #e6e7e8;
`;

const RecipeImg = styled.img`
  width: 300px;
  height: 300px;
  margin-right: 0.6rem;
`;

const Description = styled.div`
  width: 100%;
`;

const DescriptionTitle = styled.div`
  text-align: center;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  border-top: solid 1px #e6e7e8;
  border-bottom: solid 1px #e6e7e8;
`;

const DescriptionContent = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 300;
  color: #767676;
  ${({ ingredient }) =>
    ingredient &&
    `
    min-height: 120px;
    
  `}
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

const SmallInfo = styled.div`
  font-size: 0.8rem;
  color: #767676;
  text-align: right;
  height: 60px;
  line-height: 60px;
`;

const Introduction = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const Handler = styled.div`
  display: flex;
  flex-direction: row-reverse;
  a {
    font-size: 1rem;
    margin-left: 0.4rem;
    text-decoration: none;
    color: #000000;
    &:hover {
      color: ${lighten(0.1, `#6f6f6f`)};
    }
    &:active {
      color: ${darken(0.1, `#6f6f6f`)};
    }
  }
`;

export default RecipeInfo;
