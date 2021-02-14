import React from "react";
import styled from "styled-components";
import Banner from "../compoments/Banner";
import bannerUrls from "../assets/bannerUrls";
import Carousel from "../compoments/Carousel";

export default function Main() {
  const { main } = bannerUrls;
  return (
    <MainContainer>
      <Banner url={main} />
      <SliderConatiner>
        <Title>최근 등록된 레시피</Title>
        <Carousel />
      </SliderConatiner>
      <Conatiner>
        <Section2>
          <Section2Title>2월달 최고의 레시피</Section2Title>
          <Section2Wrap>
            <Card>
              <CardImg src="../images/main.jpg" />
              <CardTitle section2>묵은지 조림</CardTitle>
            </Card>
            <Section2Right>
              <Section2RightTop>
                <Card>
                  <CardImg src="../images/main.jpg" />
                  <CardTitle section2>묵은지 조림</CardTitle>
                </Card>
                <Card>
                  <CardImg src="../images/main.jpg" />
                  <CardTitle section2>묵은지 조림</CardTitle>
                </Card>
              </Section2RightTop>
              <Card Section2Bottom>
                <CardImg src="../images/main2.jpg" Section2Bottom />
                <CardTitle section2>묵은지 조림</CardTitle>
              </Card>
            </Section2Right>
          </Section2Wrap>
        </Section2>
      </Conatiner>

      <Conatiner>
        <Section3Title>금주의 탑4 레시피</Section3Title>
        <Section3>
          <Card>
            <CardImg src="../images/main.jpg" />
            <CardTitle>맛있는 비프스튜</CardTitle>
          </Card>
          <Card>
            <CardImg src="../images/main.jpg" />
            <CardTitle>버섯 리조또</CardTitle>
          </Card>
          <Card>
            <CardImg src="../images/main.jpg" />
            <CardTitle>문어 솥밥</CardTitle>
          </Card>
          <Card>
            <CardImg src="../images/main.jpg" />
            <CardTitle>묵은지 조림</CardTitle>
          </Card>
        </Section3>
      </Conatiner>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: relative;
  unset: all;
  heigth: 100%;
`;

const SliderConatiner = styled.div`
  margin-top: 3rem;
  position: relative;
  min-height: 540px;
  width: 100%;
`;

const Title = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin-left: 5%;
`;

const Conatiner = styled.div`
  height: fit-content;
  min-height: 500px;
  margin: 0;
  padding: 0;
`;

const Section3Title = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #f2701d;
  margin-left: 5%;
  margin-top: 2rem;
`;

const Section3 = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  justify-content: space-around;
  margin: 1.5rem auto;
  margin-bottom: 3rem;
`;

const Section2 = styled.div`
  background: #000000;
  justify-content: space-around;
  margin: 0 auto;
  margin-bottom: 3rem;
`;

const Section2Wrap = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
`;

const Section2Title = styled(Section3Title)`
  padding-top: 2.5rem;
  color: #ffffff;
  font-size: 1.4rem;
`;

const Section2Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Section2RightTop = styled.div`
  display: flex;
  flex: 1;
`;

const Card = styled.div`
  flex: 1;
  display: flex;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  border-radius: 12px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  ${({ Section2Bottom }) =>
    Section2Bottom &&
    `
    padding-bottom: 0.6rem;
  `}
`;

const CardImg = styled.img`
  width: 100%;
  height: 88%;
  border-radius: 12px;
  cursor: pointer;

  ${({ Section2Bottom }) =>
    Section2Bottom &&
    `
    height: 86%;
  `}
`;

const CardTitle = styled.div`
  font-size: 1.15rem;
  font-weight: 600;
  padding-top: 0.6rem;
  ${({ section2 }) =>
    section2 &&
    `
    color: white;
    padding-bottom: 0.6rem;
  `}
`;
