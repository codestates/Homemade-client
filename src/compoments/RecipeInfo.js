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
    thumbnailUrl,
    views,
    imageUrls,
    content,
    username,
    avatarUrl,
    rate,
    createdAt,
  } = recipe;

  const recipeContent = content.split("//");
  const introduction = recipeContent[0];
  const ingredient = recipeContent[1];
  const starRate = rate * 20 || 80;

  return (
    <RecipeContainer>
      <ThumbnailWrap>
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
      </ThumbnailWrap>
      <UserName>{username}</UserName>
      <Handler active={myId === recipe.userId}>
        <Link
          to={{
            pathname: "/updaterecipe",
            state: { recipe },
          }}
        >
          수정
        </Link>
        <DeleteContentBtn onClick={() => deleteContent(id)}>
          삭제
        </DeleteContentBtn>
      </Handler>
      <Title>
        {title}
        <Introduction>{introduction}</Introduction>
        <SmallInfoWrap>
          <Rating>평점:</Rating>
          <StarRating>
            <span style={{ width: `${starRate}%` }} />
          </StarRating>
        </SmallInfoWrap>
      </Title>
      <Ingredient>
        <IngredientTitle>재료</IngredientTitle>
        <IngredientContent>{ingredient}</IngredientContent>
      </Ingredient>
      <RecipeWrap>
        {imageUrls.map((url, idx) => (
          <Conatiner key={`${url + idx}`}>
            <RecipeView>
              <RecipeDiv>
                <RecipeImg src={url} alt="recipe" />
              </RecipeDiv>
            </RecipeView>
            <Description>
              <DescriptionContent>
                <Step>{`step${idx + 1}`}</Step>
                {recipeContent[idx + 2]}
              </DescriptionContent>
            </Description>
          </Conatiner>
        ))}
        <CreatedAt>{createdAt.slice(0, 10)}</CreatedAt>
      </RecipeWrap>
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
  position: relative;
  margin: 0 auto;
  width: 900px;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  background: #f2f2f2;
`;

const ThumbnailWrap = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Thumbnail = styled.img`
  position: relative;
  width: 100%;
  object-fit: cover;
`;
const AvatarWrap = styled.div`
  position: relative;
  width: 120px;
`;

const Avatar = styled.img`
  position: absolute;
  transform: translate(300%, -50%);
  width: 100%;
  heigth: 120px;
  border-radius: 50%;
`;

const UserName = styled.div`
  text-align: center;
  margin-top: 3rem;
  font-weight: 600;
`;

const Title = styled.div`
  line-height: 1.5;
  min-height: 300px;
  padding 2rem 5rem;
  padding-bottom: 0;
  font-size: 2rem;
  border-bottom: solid 10px #ffffff;
`;

const RecipeDiv = styled.div`
  width: 100%;
  height: 300px;
`;

const RecipeImg = styled.img`
  width: 300px;
  min-height: 300px;
  object-fit: cover;
`;

const Description = styled.div`
  max-width: 55%;
  width: 100%;
`;

const DescriptionContent = styled.div`
  width: 100%;
  line-height: 1.5;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 400;
  overflow-wrap: break-word;
  white-space: normal;
`;

const Rating = styled.span`
  position: absolute;
  color: #767676;
  font-size: 1rem;
  left: 0;
  top: 25%;
  z-index: 9999;
`;

const StarRating = styled.div`
  position: relative;
  left: 6%;
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
  padding-right: 4rem;
  color: #767676;
  text-align: right;
  height: 60px;
  line-height: 60px;
`;

const Introduction = styled.div`
  padding-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  min-height: 128px;
  border-bottom: solid 1px #aeb4b7;
  overflow-wrap: break-word;
  white-space: initial;
`;

const Handler = styled.div`
  display: none;
  a,
  span {
    font-size: 1rem;
    text-decoration: none;
    margin-right: 1rem;
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
    display:block;
    text-align: right;
    margin-right: 4rem;
    `}
`;

const DeleteContentBtn = styled.span`
  cursor: pointer;
`;

const RecipeView = styled.div`
  flex: 1;
  padding: 1rem;
  padding-left: 0;
`;

const SmallInfoWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Ingredient = styled.div`
  padding-top: 2rem;
  min-height: 12vh;
  border-bottom: 10px solid #ffffff;
`;

const IngredientTitle = styled.p`
  margin-top: 0;
  text-align: center;
  font-size: 2rem;
`;

const CreatedAt = styled.p`
  margin: 0;
  text-align: right;
  font-size: 0.8rem;
`;

const IngredientContent = styled.div`
  min-height: 160px;
  padding-left: 5rem;
  padding-right: 5rem;
  width: 100%;
  overflow-wrap: break-word;
  white-space: normal;
`;

const RecipeWrap = styled.div`
  padding: 3rem 5rem;
`;

const Conatiner = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Step = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #74b143;
  padding-bottom: 1rem;
`;

export default RecipeInfo;
