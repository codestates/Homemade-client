/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import styled from "styled-components";
import solid_star from "../assets/star-solid.svg";
import regular_star from "../assets/star-regular.svg";

function StarRating({ setRating }) {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  function status(e, index) {
    e.preventDefault();
    const clickedStates = [...clicked];

    if (index === 0 && clicked[0] === true && clicked[1] === false) {
      clickedStates[0] = false;
    } else {
      for (let i = 0; i < 5; i += 1) {
        if (i <= index) clickedStates[i] = true;
        else clickedStates[i] = false;
      }
    }
    setClicked(clickedStates);
    setRating(clickedStates.filter(el => el).length);
  }
  return (
    <>
      <Star />
    </>
  );

  function Star() {
    return (
      <div>
        <Img
          src={clicked[0] ? solid_star : regular_star}
          onClick={e => status(e, 0)}
        />
        <Img
          src={clicked[1] ? solid_star : regular_star}
          onClick={e => status(e, 1)}
        />
        <Img
          src={clicked[2] ? solid_star : regular_star}
          onClick={e => status(e, 2)}
        />
        <Img
          src={clicked[3] ? solid_star : regular_star}
          onClick={e => status(e, 3)}
        />
        <Img
          src={clicked[4] ? solid_star : regular_star}
          onClick={e => status(e, 4)}
        />
      </div>
    );
  }
}

const Img = styled.img`
  width: 25px;
  height: 25px;
`;
export default StarRating;
