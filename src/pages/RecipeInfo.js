import React from "react";
import styled from "styled-components";

const Background = styled.div`
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const RecipeInfoContainer = styled.div`
  margin-top: 20px;
  width: 700px;
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 400px;
  margin: 5px;
  border-radius: 10px;
  border: none;
`;
const CreatedAt = styled.div`
  margin-top: 20px;
  flex: 1 1 auto;
`;
const Title = styled.div`
  font-size: 2rem;
  flex: 10 1 auto;
`;
const TitleContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const Content = styled.div`
  margin: 30px;
`;
const Rate = styled.span`
  flex: 10 1 auto; ;
`;
const Views = styled.span`
  flex: 1 1 auto;
`;
const RateContainer = styled.div`
  display: flex;
`;
const StepWrap = styled.div`
  display: flex;
  margin: 20px;
`;

const StepImg = styled.img`
  width: 300px;
  height: 400px;
  border: none;
  border-radius: 10px;
`;
const StepInnerWrap = styled.span`
  font-color: red;
  vertical-align: top;
`;
const StepNumber = styled.div`
  font-size: 1.4rem;
  margin: 10px;
`;
const StepContent = styled.div`
  border-top: solid 1px gray;
  width: auto;
  margin: 10px;
  font-size: 1rem;
`;

function RecipeInfo() {
  return (
    <Background>
      <RecipeInfoContainer>
        <TitleContainer>
          <Title>오늘은 무엇을 만들까</Title>
          <CreatedAt>2021-02-1</CreatedAt>
        </TitleContainer>
        <Thumbnail src="../images/recipe1.jpg" />
        <RateContainer>
          <Rate>별점 몇점</Rate>
          <Views>View : 123145</Views>
        </RateContainer>
        <Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Consectetur libero id faucibus nisl tincidunt eget nullam non.
          Facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat.
          Nunc consequat interdum varius sit.{" "}
        </Content>
        <StepWrap>
          <StepImg src="../images/step1.png" />
          <StepInnerWrap>
            <StepNumber>Step</StepNumber>
            <StepContent>
              h ipsum consequat. Nunc consequat interdum varius sit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Consectetur libero id
              faucibus nisl tincidunt eget nullam non. Facilisi cras fermentum
              odio eu feugiat pretium nibh ipsum consequat. Nunc consequat
              interdum varius sit
            </StepContent>
          </StepInnerWrap>
        </StepWrap>
        <StepWrap>
          <StepImg src="../images/step1.png" />
          <StepInnerWrap>
            <StepNumber>Step</StepNumber>
            <StepContent>
              h ipsum consequat. Nunc consequat interdum varius sit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Consectetur libero id
              faucibus nisl tincidunt eget nullam non. Facilisi cras fermentum
              odio eu feugiat pretium nibh ipsum consequat. Nunc consequat
              interdum varius sit
            </StepContent>
          </StepInnerWrap>
        </StepWrap>
      </RecipeInfoContainer>
    </Background>
  );
}

export default RecipeInfo;
