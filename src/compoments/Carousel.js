import React, { useState, useRef } from "react";
import styled from "styled-components";
import d from "../assets/data";
import RecipeCard from "./RecipeCard";

export default function Carousel() {
  const [data] = useState(d);
  const myRef = useRef(null);

  const prevClick = () => {
    const slide = myRef.current;
    slide.scrollLeft -= slide.offsetWidth;
    if (slide.scrollLeft <= 0) {
      slide.scrollLeft = slide.scrollWidth;
    }
  };

  const nextClick = () => {
    const slide = myRef.current;
    slide.scrollLeft += slide.offsetWidth;
    if (slide.scrollLeft >= slide.scrollWidth - slide.offsetWidth) {
      slide.scrollLeft = 0;
    }
  };

  return (
    <Wrapper>
      <Slider className="app" ref={myRef}>
        <RecipeCard data={data} />
      </Slider>
      <Row>
        <Prev onClick={prevClick}>
          <img src="../slider/prev.png" alt="" />
        </Prev>
        <Next onClick={nextClick}>
          <img src="../slider/next.png" alt="" />
        </Next>
      </Row>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 92.5%;
  width: 100%;
  min-height: 30vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  padding: 0 20px;
`;

const Slider = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
`;

const Row = styled.div``;

const Prev = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  left: 0;
`;

const Next = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  right: 0;
`;
