import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
// import KakaoLogin from "react-kakao-login";
import FindPassword from "./FindPassword";

export default function LoginForm({ show, isShow, signInHanlder }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFindPassword, setIsFindPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleEmail = event => {
    setEmail(event.target.value);
  };
  const handlePassword = event => {
    setPassword(event.target.value);
  };
  // 로그인 form을 벗어날 경우 input value를 삭제
  const closeForm = () => {
    setEmail("");
    setPassword("");
    setErrorMessage("");
    isShow(false);
  };
  const handleFindPassword = () => {
    setEmail("");
    setPassword("");
    setIsFindPassword(true);
  };

  if (!show) {
    return null;
  }
  // 정상적으로 로그인 될 경우 localStorage에 accessToken을 저장
  //! localStorage로 accessToken을 영구보관하여 로그인상태를 유지
  const signinRequestHandler = async () => {
    if (!email || !password) {
      setErrorMessage("이메일과 패스워드를 모두 입력해 주세요.");
      return;
    }
    try {
      const response = await axios.post(
        "https://homemade2021.ml/users/signIn",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      const {
        data: {
          data: { accessToken },
        },
      } = response;
      if (accessToken) {
        signInHanlder(accessToken);
        isShow(false);
        setErrorMessage("");
      }
      await axios
        .get("https://homemade2021.ml/users/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then(res => {
          const { id } = res.data.data.userInfo;
          localStorage.setItem(
            "loggedInfo",
            JSON.stringify({
              id,
              isLogged: true,
              accessToken,
            }),
          );
        });
    } catch (err) {
      setErrorMessage("이메일과 비밀번호를 확인해 주세요.");
    }
  };
  return (
    <DarkBackground>
      {isFindPassword ? (
        <FindPassword
          show={show}
          isShow={isShow}
          setIsFindPassword={setIsFindPassword}
        />
      ) : (
        <LoginFormStyle>
          <Close onClick={closeForm}>닫기</Close>
          <h3>로그인</h3>
          <div>
            <InputWrap>
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
            </InputWrap>
            {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : ""}

            <ButtonWrap>
              <Button type="button" onClick={handleFindPassword}>
                비밀번호 찾기
              </Button>
              <Button type="button" onClick={signinRequestHandler}>
                로그인
              </Button>
              {/* <KakaoLogin
                token={process.env.REACT_APP_KAKAO_JSAVASCRIPT_KEY}
                onSuccess={console.log}
                onFail={console.error}
                onLogout={console.info}
              /> */}
            </ButtonWrap>
          </div>
        </LoginFormStyle>
      )}
    </DarkBackground>
  );
}

LoginForm.propTypes = {
  show: PropTypes.bool.isRequired,
  isShow: PropTypes.func.isRequired,
  signInHanlder: PropTypes.func.isRequired,
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
const Button = styled.button`
  border-radius: 4px;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 3px;
  margin-bottom: 5px;
  display: block;
  width: 100%;
  height: 40px;
  background: blueviolet;
  color: white;
  border: 1px solid lightgray;
`;

const Close = styled.span`
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
`;
const InputWrap = styled.div`
  margin: 0px;
  margin-bottom: 30px;
  font-size: 0.8rem;
  text-align: right;
`;
const ErrorMessage = styled.div`
  color: #ea4435;
  font-size: 0.8rem;
`;
const ButtonWrap = styled.div`
  text-align: center;
`;
