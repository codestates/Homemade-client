import React from "react";
import styled from "styled-components";

const DarkBackground = styled.div`
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
const LoginFormStyle = styled.div`
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
const Button = styled.button`
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
  border: 1px solid lightgray;
`;

function LoginForm() {
  return (
    <DarkBackground>
      <LoginFormStyle>
        <a href="/">닫기</a>
        <h3>로그인</h3>
        <form>
          <input
            type="text"
            name="eamil"
            placeholder="email 을 입력하세요"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            required
          />
          <div>
            <a href="/">회원 id 찾기 </a>
            <a href="/">비밀번호 찾기 </a>
          </div>
          <input type="submit" className="button" value="로그인" />
          <Button type="button">회원가입</Button>
        </form>
      </LoginFormStyle>
    </DarkBackground>
  );
}

export default LoginForm;
