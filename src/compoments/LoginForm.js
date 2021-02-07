import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function LoginForm({ show, isShow }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = event => {
    setEmail(event.target.value);
  };
  const handlePassword = event => {
    setPassword(event.target.value);
  };
  if (!show) {
    return null;
  }
  const signinRequestHandler = () => {
    console.log("서버로 로그인 요청");
    // axios
    //     .post(
    //       "https://localhost:4000/signin",
    //       { email, password },
    //       { headers: { "Content-Type": "application/json" }, withCredentials: true }
    //     )
    //     .then((res) => {
    //       this.props.loginHandler(res.data);
    //     })
    //     .catch((err) => console.log(err));
    // }
  };
  return (
    <DarkBackground>
      <LoginFormStyle>
        <Close onClick={() => isShow(false)}>닫기</Close>
        <h3>로그인</h3>
        <form>
          <input
            type="text"
            name="eamil"
            value={email}
            placeholder="email 을 입력하세요"
            onChange={handleEmail}
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={handlePassword}
            required
          />
          <div>
            <a href="/">비밀번호 찾기 </a>
          </div>
          <input
            onClick={signinRequestHandler}
            type="submit"
            className="button"
            value="로그인"
          />
        </form>
      </LoginFormStyle>
    </DarkBackground>
  );
}

LoginForm.propTypes = {
  show: PropTypes.bool.isRequired,
  isShow: PropTypes.func.isRequired,
};

// Login form 주변영역
const DarkBackground = styled.div`
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`;
// LoginForm 영역
const LoginFormStyle = styled.div`
  position: relative;
  width: 300px;
  padding: 1.5rem;
  background: white;
  border-radius: 5px;
  h3 {
    text-align: center;
    margin: 15px;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }
  input {
    margin-top: 5px;
    display: block;
    width: 100%;
    height: 40px;
    border: 1px solid lightgray;
    border-radius: 3px;
  }
  div {
    font-size: 0.8rem;
    margin: 10px;
    text-align: right;
  }
  a {
    display: block;
    text-align: right;
    font-size: 0.8rem;
    text-decoration: none;
  }
  input.button {
    border-radius: 4px;
    font-weight: bold;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 3px;
    display: block;
    width: 100%;
    height: 40px;
    background: blueviolet;
    color: white;
  }
`;

// LoginForm 버튼
// const Button = styled.button`
//   border-radius: 4px;
//   font-weight: bold;
//   padding-left: 1rem;
//   padding-right: 1rem;
//   margin-top: 3px;
//   display: block;
//   width: 100%;
//   height: 40px;
//   background: blueviolet;
//   color: white;
//   border: 1px solid lightgray;
// `;

const Close = styled.span`
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
`;
