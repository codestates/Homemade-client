import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function FindPassword({ show, isShow, setIsFindPassword }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 비밀번호 변경에 관한 상태
  // TODO : 회원정보의 여부에 따라 passwordChangeState를 true로 변경 필요.
  // eslint-disable-next-line no-unused-vars
  const [passwordChangeState, setPasswordChangeState] = useState(true);
  const [firstPassword, setFirstPassword] = useState("");
  const [lastPassword, setLastPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  // 유저이름 input 핸들링
  const hadleName = event => {
    setName(event.target.value);
  };
  // 유저 email input 핸들링
  const handleEmail = event => {
    setEmail(event.target.value);
  };
  // password input 핸들링
  const handlePassword = event => {
    setPassword(event.target.value);
  };
  // 닫기버튼, 취소 버튼을 눌렀을 시 핸들링
  const henadleCancel = () => {
    setIsFindPassword(false);
    isShow(false);
  };
  // 비밀번호 일치여부 판단
  //! 비밀번호 , 비밀번호 확인 input 태그에 똑같은 조건이 모두 있어야 함.
  const handleConfirmPassword = event => {
    const { value } = event.target;
    setFirstPassword(value);
    if (lastPassword.length > 1) {
      if (value !== lastPassword) {
        setMessage("비밀번호 불일치");
        setIsValidPassword(false);
      } else if (value === " ") {
        setMessage("");
      } else if (value === lastPassword) {
        setMessage("비밀번호 일치");
        setIsValidPassword(true);
      }
    }
  };
  const handleConfirmrePassword = event => {
    const { value } = event.target;
    setLastPassword(value);
    if (value !== firstPassword) {
      setMessage("비밀번호 불일치");
      setIsValidPassword(false);
    } else if (value === " ") {
      setMessage("");
    } else if (value === firstPassword) {
      setMessage("비밀번호 일치");
      setIsValidPassword(true);
    }
  };
  const findReuestPassword = () => {
    if (isValidPassword) {
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
      return alert("비밀번호가 정상적으로 변경되었습니다.");
    }
    return alert("필수 입력사항을 정확히 입력바랍니다");
  };
  if (!show) {
    return null;
  }
  return (
    <LoginFormStyle>
      <Close onClick={henadleCancel}>닫기</Close>
      {passwordChangeState ? (
        <div>
          <h3>비밀번호 변경</h3>
          <div>
            <InputWrap>
              <input
                type="password"
                name="eamil"
                value={firstPassword}
                placeholder="비밀번호를 입력하세"
                onChange={handleConfirmPassword}
                required
              />
              <input
                type="password"
                name="password"
                value={lastPassword}
                placeholder="비밀번호를 입력하세요"
                onChange={handleConfirmrePassword}
                required
              />
              <Error check={isValidPassword}>{message}</Error>
            </InputWrap>
            <Button onClick={findReuestPassword}>변경</Button>
            <Button onClick={henadleCancel}>취소</Button>
          </div>
        </div>
      ) : (
        <div>
          <h3>비밀번호 찾기</h3>
          <form>
            <InputWrap>
              <input
                type="text"
                name="eamil"
                value={name}
                placeholder="성함을 입력하세요"
                onChange={hadleName}
                required
              />
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
            <Button onClick={findReuestPassword}>찾기</Button>
            <Button onClick={henadleCancel}>취소</Button>
          </form>
        </div>
      )}
    </LoginFormStyle>
  );
}
FindPassword.propTypes = {
  show: PropTypes.bool.isRequired,
  isShow: PropTypes.func.isRequired,
  setIsFindPassword: PropTypes.func.isRequired,
};

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
const Error = styled.span`
  font-size: 0.8rem;
  float: left;
  color: ${props => (props.check ? "green" : "red")};
`;
