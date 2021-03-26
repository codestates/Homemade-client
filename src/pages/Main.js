/* eslint-disable react/style-prop-object */
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
            <Card background="../images/img5.jpg">
              <CardTitle section2>쿠스쿠스드 샐러드</CardTitle>
            </Card>
            <Card background="../images/img6.jpg">
              <CardTitle section2>레몬 탄산수</CardTitle>
            </Card>
            <Card background="../images/img7.jpg">
              <CardTitle section2>수제 햄버거</CardTitle>
            </Card>
          </Section2Wrap>
        </Section2>
      </Conatiner>

      <Conatiner>
        <Section3Title>금주의 탑4 레시피</Section3Title>
        <Section3>
          <Card>
            <CardImg className="temp-img" src="../images/tempImg1.jpg" />
            <CardTitle>징기즈칸 양고기</CardTitle>
          </Card>
          <Card>
            <CardImg className="temp-img" src="../images/tempImg2.jpg" />
            <CardTitle>굴비조림</CardTitle>
          </Card>
          <Card>
            <CardImg className="temp-img" src="../images/tempImg3.jpg" />
            <CardTitle>삼겹살 꼬치구이</CardTitle>
          </Card>
          <Card>
            <CardImg className="temp-img" src="../images/tempImg4.jpg" />
            <CardTitle>뜨끈뜨끈 우동</CardTitle>
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
  margin-left: 11.25%;
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
  padding-left: 6%;
`;

const Section3 = styled.div`
  width: 78.75%;
  height: 20vh;
  display: flex;
  justify-content: space-around;
  margin: 1.5rem auto;
  margin-bottom: 3rem;
  padding-right: 2rem;
`;

const Section2 = styled.div`
  background: #000000;
  justify-content: space-around;
  margin: 0 auto;
  margin-bottom: 3rem;
  ${({ Left }) =>
    Left &&
    `
    height: fit-content;
  `}
`;

const Section2Wrap = styled.div`
  display: flex;
  width: 78.75%;
  margin: 0 auto;
`;

const Section2Title = styled(Section3Title)`
  padding-top: 2.5rem;
  color: #ffffff;
  font-size: 1.4rem;
`;

// const Section2Right = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
// `;

// const Section2RightTop = styled.div`
//   display: flex;
//   flex: 1;
// `;

const Card = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  flex: 1;
  display: flex;
  width: 30%;
  height: 70vh;
  flex-direction: column;
  border-radius: 12px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 3rem;
  padding-left: 0.5rem;

  ${({ background }) =>
    background &&
    `
    background-image: url(${background})
  `}
`;

const CardImg = styled.img`
  width: 100%;
  height: 50vh;
  border-radius: 12px;
  cursor: pointer;

  ${({ Section2Bottom }) =>
    Section2Bottom &&
    `
    height: 100%;
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
