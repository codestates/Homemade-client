/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import styled from "styled-components";
import { BsImage } from "react-icons/bs";

export default function SubmitRecipeForm() {
  return (
    <FormContainer>
      <FormTitle>
        <h3>레시피 등록</h3>
      </FormTitle>
      <RecipeWrap>
        <RecipeInfoWrap>
          <div>
            <label htmlFor="recipeTitle">
              레시피 제목
              <Input
                placeholder="예) 김치볶음밥 만들기"
                type="text"
                name="recipeTitle"
              />
            </label>
          </div>
          <div>
            <label htmlFor="recipeSummary">
              레시피 소개
              <Textarea
                placeholder="이 레시피의 탄생배경을 적어주세요."
                type="textarea"
                name="recipeSummary"
              />
            </label>
          </div>
          <div>
            <label htmlFor="recipeSummary">
              레시피 재료
              <Textarea
                placeholder="이 레시피의 재료를 적어주세요."
                type="textarea"
                name="recipeSummary"
              />
            </label>
          </div>
          <div className="lastInfo">
            <label htmlFor="recipeCategory">카테고리</label>
            <Select name="recipeCategory" id="recipeCategory">
              <option value="한식">한식</option>
              <option value="중식">중식</option>
              <option value="일식">일식</option>
              <option value="양식">양식</option>
              <option value="음료/술">음료/술</option>
            </Select>
          </div>
        </RecipeInfoWrap>
        <RecipeThumbnail>
          <BsImage />
          <div>대표사진 등록하기</div>
        </RecipeThumbnail>
      </RecipeWrap>
      <RecipeSequenceWrap>
        <RecipeSequence>
          <div>
            <label htmlFor="recipeStep1">
              Step 1
              <Textarea
                placeholder="예) 고기에 적당한 간을 해주세요."
                type="textarea"
                name="recipeSummary"
              />
            </label>
          </div>
          <div>
            <label htmlFor="recipeStep2">
              Step 2
              <Textarea
                placeholder="예) 고기에 적당한 간을 해주세요."
                type="textarea"
                name="recipeSummary"
              />
            </label>
          </div>
          <div>
            <label htmlFor="recipeStep3">
              Step 3
              <Textarea
                placeholder="예) 고기에 적당한 간을 해주세요."
                type="textarea"
                name="recipeSummary"
              />
            </label>
          </div>
          <div>
            <label htmlFor="recipeStep4">
              Step 4
              <Textarea
                placeholder="예) 고기에 적당한 간을 해주세요."
                type="textarea"
                name="recipeSummary"
              />
            </label>
          </div>
          <div className="lastInfo">
            <label htmlFor="recipeStep5">
              Step 5
              <Textarea
                placeholder="예) 고기에 적당한 간을 해주세요."
                type="textarea"
                name="recipeSummary"
              />
            </label>
          </div>
        </RecipeSequence>
      </RecipeSequenceWrap>
      <RecipeSaveWrap>
        <SaveBtn type="button">저장하기</SaveBtn>
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

  div + div {
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
  }

  div > label {
    position: relative;
    top: 1.5px;
  }
  .lastInfo {
    margin-bottom: 3rem;
  }
`;

const RecipeThumbnail = styled.div`
  padding: 3rem;
  flex: 2;
  svg {
    margin: 0 auto;
    display: block;
    font-size: 5rem;
    padding: 2rem;
    border: 1px solid #e6e7e8;
  }
  div {
    font-size: 1.2rem;
    display: block;
    margin-top: 0.5rem;
    text-align: center;
  }
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
  background: #f5f5f5;
  &:focus {
    outline: none;
  }
`;

const Textarea = styled(Input.withComponent("textarea"))`
  height: 10vh;
  resize: none;
`;

const Select = styled(Input.withComponent("select"))`
  margin-left: 40px;
`;

const RecipeSequenceWrap = styled(RecipeWrap)`
  border-top: 1px solid #e6e7e8;
`;

const RecipeSequence = styled(RecipeInfoWrap)``;

const RecipeSaveWrap = styled(RecipeSequenceWrap)`
  display: block;
  margin: 0 auto;
`;

const SaveBtn = styled.button`
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
