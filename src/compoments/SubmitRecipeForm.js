/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

export default function SubmitRecipeForm({
  previews,
  handleChange,
  handleRecipe,
  handleUpload,
  currentSteps,
  AddStep,
  stepRefs,
  thumbnailRef,
  errorMessage,
}) {
  return (
    <FormContainer>
      <FormTitle>
        <h3>레시피 등록</h3>
      </FormTitle>
      <RecipeWrap>
        <RecipeInfoWrap>
          <div>
            <label htmlFor="title">
              레시피 제목
              <Input
                placeholder="예) 김치볶음밥 만들기"
                type="text"
                name="title"
                onChange={e => handleRecipe(e)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="introduction">
              레시피 소개
              <Textarea
                placeholder="이 레시피의 탄생배경을 적어주세요."
                type="textarea"
                name="introduction"
                onChange={e => handleRecipe(e)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="ingredient">
              레시피 재료
              <Textarea
                placeholder="이 레시피의 재료를 적어주세요."
                type="textarea"
                name="ingredient"
                onChange={e => handleRecipe(e)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="category">카테고리</label>
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
        <RecipePreview>
          <ImageWrap>
            <ImageInput
              ref={thumbnailRef}
              name="thumbnail"
              type="file"
              accept="image/*"
              onChange={e => handleChange(e, 0)}
            />
            <Preview
              active={previews.thumbnail}
              alt="test"
              src={previews.thumbnail}
            />
            <PickImageBtn
              active={!previews.thumbnail}
              type="button"
              onClick={() => thumbnailRef.current.click()}
            >
              +
            </PickImageBtn>
            <Announcement active={!previews.thumbnail}>
              대표사진 등록하기
            </Announcement>
          </ImageWrap>
        </RecipePreview>
      </RecipeWrap>
      <RecipeSequence>
        {currentSteps.map((step, i) => {
          return (
            <StepWrap key={step}>
              <label htmlFor={`step${step}`}>
                Step {step}
                <Textarea
                  placeholder="예) 고기에 적당한 간을 해주세요."
                  type="textarea"
                  name={`step${step}`}
                  onChange={e => handleRecipe(e)}
                />
              </label>
              <RecipePreview>
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
                  <Preview
                    active={previews[`step${step}`]}
                    alt={`step${step}`}
                    src={previews[`step${step}`]}
                  />
                  <PickImageBtn
                    active={!previews[`step${step}`]}
                    type="button"
                    onClick={() => stepRefs.current[i].click()}
                  >
                    +
                  </PickImageBtn>
                </ImageWrap>
              </RecipePreview>
            </StepWrap>
          );
        })}
      </RecipeSequence>
      <AddStepBtn type="button" onClick={() => AddStep()}>
        순서 추가
      </AddStepBtn>
      <RecipeSaveWrap>
        <ErrorMessage>{errorMessage || ""}</ErrorMessage>
        <SaveBtn type="button" onClick={handleUpload}>
          저장하기
        </SaveBtn>
      </RecipeSaveWrap>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  margin: 0 auto;
  width: 1080px;
  height: 100%;
  border: solid 1px #e6e7e8;
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
`;

const FormTitle = styled.div`
  background-color: #f8f8f8;
  padding: 0.5rem;
  border: 1px solid #e6e7e8;
  h3 {
    font-size: 1.5rem;
  }
`;

const RecipeWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const RecipeInfoWrap = styled.div`
  padding-top: 3rem;
  padding-left: 3rem;
  flex: 10;
  border-right: 1px solid #e6e7e8;

  div {
    height: 120px;
  }

  div + div {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  div > label {
    position: relative;
    top: 1.5px;
  }
  .lastInfo {
    margin-bottom: 3rem;
  }
`;

const RecipePreview = styled.span`
  flex: 3;
  height: 200px;
  text-align: center;
  border: 1px solid #e6e7e8;
`;

const Input = styled.input`
  margin-left: 1rem;
  width: 70%;
  font-size: 1.4rem;
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
`;

const Textarea = styled(Input.withComponent("textarea"))`
  flex: 10;
  height: 120px;
  resize: none;
`;

const Select = styled(Input.withComponent("select"))`
  margin-left: 40px;
`;

const RecipeSequence = styled.div`
  border-top: 1px solid #e6e7e8;
  padding-top: 3rem;
  padding-left: 3rem;
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
  margin-top: 3px;
  display: block;
  width: 100%;
  height: 48px;
  background: blueviolet;
  color: white;
  border: 1px solid lightgray;
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
`;

const StepWrap = styled.div`
  display: flex;
  height: 200px;
  margin-bottom: 3rem;
  flex-direction: row;
  label {
    flex: 10;
  }
  textarea {
    height: 200px;
    width: 90%;
  }
  span {
    padding: 0;
  }
`;

const ImageWrap = styled.span`
  width: 100%
  heigth: 200px;
`;

const Announcement = styled.div`
  display: none;
  ${({ active }) =>
    active &&
    `
    display:block;
    margin-top: 2rem;
    font-size: 1rem;
  `}
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
