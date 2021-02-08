/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from "react";
import styled from "styled-components";

export default function SubmitRecipeForm() {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const showImg = (e, idx) => {
    setPreviews(state => {
      return [
        ...state.slice(0, idx),
        URL.createObjectURL(e.target.files[0]),
        ...state.slice(idx + 1),
      ];
    });
  };

  const handleChange = (e, idx) => {
    setImages(state => {
      return [
        ...state.slice(0, idx),
        e.target.files[0],
        ...state.slice(idx + 1),
      ];
    });
    showImg(e, idx);
  };
  const thumbnailRef = useRef();

  const handleUpload = () => {
    const fd = new FormData();
    fd.append("images", images);
    // axios.post('');
  };
  const currentSteps = [1, 2, 3, 4, 5];

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
        <RecipePreview>
          <ImageInput
            ref={thumbnailRef}
            type="file"
            accept="image/*"
            onChange={e => handleChange(e, 0)}
          />
          {previews[0] ? (
            <Preview active alt="test" src={previews[0]} />
          ) : (
            <Preview alt="thumbnail" src={previews[0]} />
          )}
          <PickImageButton
            stlye={previews[0] ? { display: "none" } : { display: "block" }}
            type="button"
            onClick={() => thumbnailRef.current.click()}
          >
            대표사진 등록
          </PickImageButton>
        </RecipePreview>
      </RecipeWrap>
      <RecipeSequenceWrap>
        <RecipeSequence>
          {currentSteps.map(step => {
            const ref = useRef();
            return (
              <StepWrap>
                <label htmlFor={`recipeStep${step}`}>
                  Step {step}
                  <Textarea
                    placeholder="예) 고기에 적당한 간을 해주세요."
                    type="textarea"
                    name="recipeSummary"
                  />
                </label>
                <RecipePreview>
                  <ImageInput
                    ref={ref}
                    type="file"
                    accept="image/*"
                    onChange={e => handleChange(e, step)}
                  />
                  {previews[step] ? (
                    <Preview active alt="recipe step" src={previews[step]} />
                  ) : (
                    <Preview alt="thumbnail" src={previews[step]} />
                  )}
                  <PickImageButton
                    type="button"
                    onClick={() => ref.current.click()}
                  >
                    사진 등록
                  </PickImageButton>
                </RecipePreview>
              </StepWrap>
            );
          })}
        </RecipeSequence>
      </RecipeSequenceWrap>
      <RecipeSaveWrap>
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
  padding-top: 3rem;
  text-align: center;
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

const ImageInput = styled.input`
  display: none;
`;

const Preview = styled.img`
  display: none;
  ${({ active }) =>
    active &&
    `
    display: inline-block;
    width: 150px;
    heigth: 150px;
    max-width: 150px;
    max-heigth: 150px;
  `}
`;

const PickImageButton = styled.button`
  width: 180px;
  padding: 0.4rem;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  background-color: #8a2ce2;
  color: white;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const StepWrap = styled.div`
  display: flex;
  flex-direction: row;
  label {
    flex: 10;
  }
  textarea {
    width: 90%;
  }
  span {
    padding: 0;
  }
`;
