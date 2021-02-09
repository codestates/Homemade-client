import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// import axios from "axios";

export default function FindPassword({ show, isShow, setIsFindPassword }) {
  // 비밀번호 찾기 상태
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [temporarilyEmail, seTemporarilyEmail] = useState("");
  // 비밀번호 변경에 관한 상태
  // TODO : 회원정보의 여부에 따라 passwordChangeState를 true로 변경 필요.
  // eslint-disable-next-line no-unused-vars
  const [passwordChangeState, setPasswordChangeState] = useState(false);
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
  const handleMobile = event => {
    setMobile(event.target.value);
  };
  // 닫기버튼, 취소 버튼을 눌렀을 시 핸들링
  const handleCancel = () => {
    setIsFindPassword(false);
    isShow(false);
  };
  // 비밀번호 일치여부 판단
  //! 비밀번호 , 비밀번호 확인 input 태그에 똑같은 조건이 모두 있어야 함.
  const handleFirstPassword = event => {
    const { value } = event.target;
    setFirstPassword(value);
    if (lastPassword.length > 0) {
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
  const handleLastPassword = event => {
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
  // 유저의 정보유무확인을 위한 서버통신
  //! 인증되지 않은 회원이 회원정보를 요청하기 떄문에 토큰이 없음
  //! 서버 API 작성 후 테스트 필요
  const findReuestPassword = () => {
    if (name && email && mobile) {
      console.log("정상입력");
      try {
        // axios
        //   .post("https://homemade2021.ml/users/", {
        //     name,
        //     email,
        //     mobile,
        //   })
        //   .then(() => {
        setMessage("");
        seTemporarilyEmail(email);
        setPasswordChangeState(true);
        alert("응답");
        return;
        // });
      } catch (err) {
        alert(err);
        //   setMessage("회원정보를 찾지 못했습니다.");
        //   setIsValidPassword(false);
      }
    }
    setMessage("필수 입력사항을 모두입력하세요");
    setIsValidPassword(false);
  };
  // 회원의 비밀번호를 변경요청
  const changeRequestPassword = () => {
    if (firstPassword.length === 0 || lastPassword.length === 0) {
      setMessage("모든 입력사항은 필수입니다.");
      setIsValidPassword(false);
      return;
    }
    if (firstPassword === lastPassword) {
      console.log("정상입력");
      try {
        // axios
        //   .post("https://homemade2021.ml/users/", {
        //    email: temporarilyEmail,
        // password : lastPassword
        //   })
        //   .then(() => {
        seTemporarilyEmail("");
        setPasswordChangeState(false);
        handleCancel(false);
        alert("응답");
        return;
        // });
      } catch (err) {
        alert(err);
        //   setMessage("회원정보를 찾지 못했습니다.");
        //   setIsValidPassword(false);
      }
    }
    setMessage("비밀번호가 일치하지 않습니다.");
    setIsValidPassword(false);
  };
  if (!show) {
    return null;
  }
  return (
    <LoginFormStyle>
      <Close onClick={handleCancel}>닫기</Close>
      {passwordChangeState ? (
        <div>
          <h3>비밀번호 변경</h3>
          <div>
            <InputWrap>
              <input
                type="password"
                name="eamil"
                value={firstPassword}
                placeholder="비밀번호를 입력하세요"
                onChange={handleFirstPassword}
                required
              />
              <input
                type="password"
                name="password"
                value={lastPassword}
                placeholder="비밀번호를 입력하세요"
                onChange={handleLastPassword}
                required
              />
              <Error check={isValidPassword}>{message}</Error>
            </InputWrap>
            <Button onClick={changeRequestPassword}>변경</Button>
            <Button onClick={handleCancel}>취소</Button>
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
                type="text"
                name="mobile"
                value={mobile}
                placeholder="핸드폰 번호를 입력하세요. '-' 제외"
                onChange={handleMobile}
                required
              />
              <Error check={isValidPassword}>{message}</Error>
            </InputWrap>
            <Button onClick={findReuestPassword}>찾기</Button>
            <Button onClick={handleCancel}>취소</Button>
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
