/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { AiOutlineCamera } from "react-icons/ai";

export default function SubmitRecipeForm({
  deleteImage,
  previews,
  handleChange,
  handleRecipe,
  handleUpload,
  currentSteps,
  addStep,
  stepRefs,
  thumbnailRef,
  errorMessage,
  recipe,
  isError,
}) {
  return (
    <>
      <Title>
        <h3>레시피 등록</h3>
      </Title>
      <FormContainer>
        <RecipeWrap>
          <RecipeInfoWrap>
            <div>
              <Label htmlFor="title">
                레시피 제목
                <Input
                  empty={isError && recipe.title === ""}
                  placeholder="예) 김치볶음밥 만들기"
                  type="text"
                  name="title"
                  value={recipe.title || ""}
                  onChange={e => handleRecipe(e)}
                />
              </Label>
            </div>
            <div>
              <Label htmlFor="introduction">
                레시피 소개
                <Textarea
                  empty={isError && !recipe.introduction}
                  placeholder="이 레시피의 탄생배경을 적어주세요."
                  type="textarea"
                  name="introduction"
                  value={recipe.introduction || ""}
                  onChange={e => handleRecipe(e)}
                />
              </Label>
            </div>
            <div>
              <Label htmlFor="ingredient">
                레시피 재료
                <Textarea
                  empty={isError && !recipe.ingredient}
                  placeholder="이 레시피의 재료를 적어주세요."
                  type="textarea"
                  name="ingredient"
                  value={recipe.ingredient || ""}
                  onChange={e => handleRecipe(e)}
                />
              </Label>
            </div>
            <div>
              <Label htmlFor="category">카테고리</Label>
              <Select
                name="category"
                id="recipeCategory"
                onChange={e => handleRecipe(e)}
              >
                <option value="한식">한식</option>
                <option value="중식">중식</option>
                <option value="일식">일식</option>
                <option value="양식">양식</option>
                <option value="음료/술">음료/술</option>
              </Select>
            </div>
          </RecipeInfoWrap>
          <Image thumbnail>
            <ImageWrap>
              <ImageInput
                ref={thumbnailRef}
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={e => handleChange(e, 0)}
              />
              <DeleteImageBtn
                type="button"
                onClick={() => deleteImage("thumbnail")}
                active={previews.thumbnail}
              />
              <Preview
                active={previews.thumbnail}
                alt="test"
                src={previews.thumbnail}
              />
              <PickImageBtn
                thumbnail
                active={!previews.thumbnail}
                empty={isError && !previews.thumbnail}
                type="button"
                onClick={() => thumbnailRef.current.click()}
              >
                <PickImageIcon>
                  <AiOutlineCamera />
                </PickImageIcon>
                <Announcement>레시피의 대표사진을 등록해 주세요</Announcement>
              </PickImageBtn>
            </ImageWrap>
          </Image>
        </RecipeWrap>
        <RecipeSequence>
          {currentSteps.map((step, i) => {
            return (
              <StepWrap key={step}>
                <Label htmlFor={`step${step}`}>
                  Step {step}
                  <Textarea
                    empty={isError && !recipe[`step${step}`]}
                    placeholder="예) 고기에 적당한 간을 해주세요."
                    type="textarea"
                    name={`step${step}`}
                    value={recipe[`step${step}`] || ""}
                    onChange={e => handleRecipe(e)}
                  />
                </Label>
                <Image>
                  <ImageWrap>
                    <ImageInput
                      ref={el => {
                        stepRefs.current[i] = el;
                      }}
                      type="file"
                      accept="image/*"
                      name={`step${step}`}
                      onChange={e => handleChange(e, step)}
                    />
                    <DeleteImageBtn
                      type="button"
                      onClick={() => deleteImage(`step${step}`)}
                      active={previews[`step${step}`]}
                    />
                    <Preview
                      active={previews[`step${step}`]}
                      alt={`step${step}`}
                      src={previews[`step${step}`]}
                    />
                    <PickImageBtn
                      active={!previews[`step${step}`]}
                      empty={isError && !previews[`step${step}`]}
                      type="button"
                      onClick={() => stepRefs.current[i].click()}
                    >
                      +
                    </PickImageBtn>
                  </ImageWrap>
                </Image>
              </StepWrap>
            );
          })}
        </RecipeSequence>
        <AddStepBtn type="button" onClick={() => addStep()}>
          순서 추가
        </AddStepBtn>
        <RecipeSaveWrap>
          <ErrorMessage>{errorMessage || ""}</ErrorMessage>
          <SaveBtn type="button" onClick={handleUpload}>
            저장하기
          </SaveBtn>
        </RecipeSaveWrap>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  border-top: 1px solid gray;
  margin: 1rem auto;
  margin-bottom: 3rem;
  width: 60%;
  height: 100%;
  border: solid 1px #e6e7e8;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  position: relative;
  background-color: #153450;
  padding: 0.5rem;
  text-align: center;
  color: white;
  border-radius: 12px;
  h3 {
    font-size: 1.5rem;
  }
`;

const RecipeWrap = styled.div`
  display: flex;
`;

const RecipeInfoWrap = styled.div`
  padding-top: 3rem;
  padding-left: 2rem;
  flex: 10;

  div + div {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  div > label {
    position: relative;
    top: 1.5px;
  }
`;

const Image = styled.span`
  flex: 3;
  height: 200px;
  text-align: center;
  border: 1px solid #e6e7e8;

  ${({ thumbnail }) =>
    thumbnail &&
    `
    margin-top: 3rem;
  `}
`;

const Input = styled.input`
  margin-left: 1rem;
  width: 80%;
  font-size: 1rem;
  font-weight: 500;
  padding: 6px 12px;
  height: 5vh;
  border-radius: 4px;
  color: #555;
  border: 1px solid #e1e1e1;
  vertical-align: middle;
  background-color: #f5f5f5;
  &:focus {
    outline: none;
  }
  ${({ empty }) =>
    empty &&
    `
    border: 1px solid #B91F1F;
    background-color:#FEEFF4
  `}
`;

const Label = styled.label`
  flex: 10;
  font-size: 1.2rem;
`;

const Textarea = styled(Input.withComponent("textarea"))`
  flex: 10;
  font-size: 1.2rem;
  height: 120px;
  resize: none;

  ${({ empty }) =>
    empty &&
    `
    border: 1px solid #B91F1F;
    background-color:#FEEFF4
  `}
`;

const Announcement = styled.span``;

const Select = styled(Input.withComponent("select"))`
  margin-left: 40px;
`;

const RecipeSequence = styled.div`
  border-top: 1px solid #e6e7e8;
  padding-top: 3rem;
  padding-left: 2rem;
`;

const RecipeSaveWrap = styled.div`
  display: block;
  width: 100%;
  margin: 0 auto;
`;

const SaveBtn = styled.button`
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.9rem;
  margin-top: 3px;
  display: block;
  width: 100%;
  height: 48px;
  background: #153450;
  color: white;
  border: 1px solid lightgray;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const ImageInput = styled.input`
  display: none;
`;

const Preview = styled.img`
  display: none;
  ${({ active }) =>
    active &&
    `
    display:block;
    width:100%; 
    height:100%; 
    object-fit:cover; 
  `}
`;

const PickImageBtn = styled.button`
  display: none;
  width: 100%;
  height: 100%;
  font-size: 6rem;
  padding: 0.4rem;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  background-color: #f7f7f7;
  color: #aaaaaa;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  ${({ active }) =>
    active &&
    `
    display: inline-block;
  `}

  ${({ empty }) =>
    empty &&
    `
    font-size: 1rem;
    border: 1px solid #B91F1F;
    background-color:#FEEFF4;
  `}

  ${({ thumbnail }) =>
    thumbnail &&
    `
    font-size: 1rem;
  `}
`;

const StepWrap = styled.div`
  display: flex;
  height: 200px;
  margin-bottom: 3rem;
  flex-direction: row;
  textarea {
    height: 200px;
    width: 85%;
  }
  span {
    padding: 0;
  }
`;

const ImageWrap = styled.span`
  position: relative;
  width: 100%
  heigth: 200px;
`;

const AddStepBtn = styled(SaveBtn)`
  width: 20%;
  margin: 0 auto;
  margin-bottom: 3rem;
`;

const ErrorMessage = styled.div`
  color: #f40310;
  text-align: center;
`;

const DeleteImageBtn = styled.button`
  display: none;
  ${({ active }) =>
    active &&
    `
      position: absolute;
      z-index: 2;
      display: block;
      padding: 0.5rem;
      border: none;
      &:before {
        content: "x";
        color: #000000;
        font-weight: 300;
        cursor: pointer;
      }
      &:focus {
        outline: none;        
      }
      &:hover {
        transform: scale(1.5);
        transition: .5s;
      }
    }
  `}
`;

const PickImageIcon = styled.div`
  font-size: 4rem;
`;
