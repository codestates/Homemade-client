/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { darken, lighten } from "polished";
import CommentContainer from "./CommentContainer";

function RecipeInfo({
  recipe,
  myId,
  deleteContent,
  accessToken,
  contentId,
  savedComments,
  deleteComment,
  handleSubmit,
  updateComment,
}) {
  const {
    id,
    title,
    createdAt,
    thumbnailUrl,
    views,
    imageUrls,
    content,
    username,
    avatarUrl,
  } = recipe;

  const recipeContent = content.split("//");
  const introduction = recipeContent[0];
  const ingredient = recipeContent[1];

  const starRate = 100;

  return (
    <RecipeContainer>
      <Thumbnail
        src={thumbnailUrl || "../images/recipeInfo1.jpg"}
        alt="recipe"
      />
      <AvatarWrap>
        <Avatar
          src={avatarUrl || "../images/defaultUserAvatar.png"}
          alt="avatar"
        />
      </AvatarWrap>
      <UserName>{username}</UserName>
      <Handler active={myId === recipe.userId}>
        <DeleteContentBtn onClick={() => deleteContent(id)}>
          삭제
        </DeleteContentBtn>
        <Link
          to={{
            pathname: "/updaterecipe",
            state: { recipe },
          }}
        >
          수정
        </Link>
      </Handler>
      <Title>
        {title}
        <Introduction>{introduction}</Introduction>
        <SmallInfoWrap>
          <StarRating>
            <span style={{ width: `${starRate}%` }} />
          </StarRating>
          <SmallInfo>{createdAt.slice(0, 10)}</SmallInfo>
        </SmallInfoWrap>
      </Title>
      <Article>
        <Description>
          <DescriptionTitle ingredient>재료</DescriptionTitle>
          <DescriptionContent ingredient>{ingredient}</DescriptionContent>
        </Description>
      </Article>
      {imageUrls.map((url, idx) => (
        <Article key={`${url + idx}`}>
          <RecipeView>
            <DescriptionTitle>step {idx + 1}</DescriptionTitle>
            <RecipeImg src={url} alt="recipe" />
          </RecipeView>
          <Description>
            <DescriptionContent>{recipeContent[idx + 2]}</DescriptionContent>
          </Description>
        </Article>
      ))}
      <CommentContainer
        myId={myId}
        savedComments={savedComments}
        contentId={contentId}
        handleSubmit={handleSubmit}
        deleteComment={deleteComment}
        accessToken={accessToken}
        updateComment={updateComment}
      />
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
  :coral ;
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
  padding-bottom: 0.5rem;
  border-bottom: solid 1px #aeb4b7;
`;

const Article = styled.article`
  width: 100%;
  display: flex;
  border-bottom: solid 1px #aeb4b7;
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
  padding: 0.5rem 0;
  ${({ ingredient }) =>
    ingredient &&
    `
    padding-top: 1.7rem;
    
  `}
`;

const DescriptionContent = styled.div`
  width: 21.5vw;
  padding: 1rem;
  padding-top: 3.8rem;
  font-size: 1.2rem;
  font-weight: 300;
  overflow-wrap: break-word;
  white-space: initial;

  ${({ ingredient }) =>
    ingredient &&
    `
    padding-top: 1.5rem;
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
  overflow-wrap: break-word;
  white-space: initial;
`;

const Handler = styled.div`
  display: none;
  a,
  span {
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

  ${({ active }) =>
    active &&
    `
    display: flex;
    flex-direction: row-reverse;
    `}
`;

const DeleteContentBtn = styled.span`
  cursor: pointer;
`;

const RecipeView = styled.div`
  padding: 1rem;
  padding-left: 0;
`;

const SmallInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export default RecipeInfo;
