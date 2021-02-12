import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import UserModal from "./UserModal";
import NorificationModal from "./NotificationModal";

export default function SignUpForm({ show, isShow }) {
  if (!show) {
    return null;
  }
  // input 값 상태
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isUsableEmail, setIsUsableEmail] = useState(false);
  const [nickName, setNickName] = useState("");
  const [mobile, setMobile] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [lastPassword, setLastPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  // modal 상태
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  // modal창 종료
  const closeModal = () => {
    setModalVisible(false);
  };
  // modal창 오픈 시
  // const openModal = buttonName => {
  //   if (buttonName === "overlapping-button") {
  //     setModalMessage("사용할 수 있는 email입니다.");
  // 	}
  //   setModalVisible(true);
  // };
  const handleName = event => {
    setName(event.target.value);
  };
  const handleEmail = event => {
    setEmail(event.target.value);
  };
  const handleNickName = event => {
    setNickName(event.target.value);
  };
  const handleMobile = event => {
    setMobile(event.target.value);
  };
  const closeForm = () => {
    setName("");
    setEmail("");
    setNickName("");
    setMobile("");
    setMessage("");
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
      } else if (lastPassword === "") {
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
    } else if (firstPassword === " ") {
      setMessage("");
    } else if (value === firstPassword) {
      setMessage("비밀번호 일치");
      setIsValidPassword(true);
    }
  };
  // email 중복여부 체크
  const handleRequestCheckEmail = () => {
    console.log(email);
    if (email !== "") {
      try {
        axios
          .post("https://homemade2021.ml/users/checkemail", {
            email,
          })
          .then(() => {
            setIsUsableEmail(true);
            setModalMessage("사용할 수 있는 email입니다");
            setModalVisible(true);
          })
          .catch(() => {
            setModalMessage("email이 중복됩니다");
            setModalVisible(true);
          });
      } catch (err) {
        console.log(err);
      }
      return;
    }
    setModalMessage("email을 입력해주세요.");
    setModalVisible(true);
  };
  // 회원등록 요청
  const handleRequestSignUp = () => {
    if ((name, lastPassword, isUsableEmail, nickName, mobile)) {
      try {
        axios
          .post(
            "https://homemade2021.ml/users/signup",
            {
              name,
              email,
              password: lastPassword,
              nickname: nickName,
              mobile,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            },
          )
          .then(res => {
            setSignUpModal(true);
            return console.log(res);
          });
      } catch (err) {
        setModalMessage("이미 동일한 email이 존재합니다");
        setModalVisible(true);
      }
    } else {
      setModalMessage("모든 입력사항은 필수 입니다.");
      setModalVisible(true);
      return;
    }
    if (!isUsableEmail) {
      setModalMessage("email 중복을 확인 해주세요.");
      setModalVisible(true);
    }
  };
  useEffect(() => {});

  return (
    <DarkBackground>
      {signUpModal ? (
        <UserModal closeForm={closeForm} />
      ) : (
        <SignUpFormStyle>
          <h3>회원가입</h3>
          <p id="notification">모든항목은 필수입력 사항입니다.</p>
          <UserInfoTable id="signup-form-table">
            <TableRow>
              <TableData className="label">이름</TableData>
              <TableData className="input-tag">
                <input type="text" name="name" onChange={handleName} required />
              </TableData>
            </TableRow>
            <TableRow>
              <TableData className="label">eamil</TableData>
              <TableData className="input-tag">
                <input
                  type="text"
                  name="eamil"
                  onChange={handleEmail}
                  placeholder="email은 로그인시 id로 사용됩니다"
                  required
                />
              </TableData>
              <TableData>
                <Button
                  id="overlapping-button"
                  onClick={handleRequestCheckEmail}
                >
                  중복확인{" "}
                </Button>
              </TableData>
            </TableRow>
            <TableRow>
              <TableData className="label">비밀번호</TableData>
              <TableData className="input-tag">
                <input
                  type="password"
                  name="firstPassword"
                  placeholder="비밀번호를 입력하세요"
                  value={firstPassword}
                  onChange={handleFirstPassword}
                  required
                />
              </TableData>
            </TableRow>
            <TableRow>
              <TableData className="label">비밀번호 확인</TableData>
              <TableData className="input-tag">
                <input
                  type="password"
                  name="lastPassword"
                  placeholder="비밀번호를 입력하세요"
                  value={lastPassword}
                  onChange={handleLastPassword}
                  required
                />
              </TableData>
              <TableData>
                <Error check={isValidPassword}>{message}</Error>
              </TableData>
            </TableRow>
            <TableRow>
              <TableData className="label">닉네임</TableData>
              <TableData className="input-tag">
                <input
                  type="text"
                  name="password"
                  onChange={handleNickName}
                  required
                />
              </TableData>
            </TableRow>
            <TableRow>
              <TableData className="label">핸드폰 번호</TableData>
              <TableData className="input-tag">
                <input
                  type="text"
                  name="mobile"
                  onChange={handleMobile}
                  placeholder="'-' 는 제외한 숫자만 입력바랍니다"
                  required
                />
              </TableData>
            </TableRow>
            <TableRow>
              <TableData />
              <TableData className="input-tag">
                <ButtonWrap>
                  <Button
                    id="signUp-button"
                    type="button"
                    onClick={handleRequestSignUp}
                  >
                    가입하기
                  </Button>
                  <Button type="button" onClick={() => isShow(false)}>
                    취소
                  </Button>
                </ButtonWrap>
              </TableData>
            </TableRow>
          </UserInfoTable>
        </SignUpFormStyle>
      )}
      <NorificationModal
        visible={modalVisible}
        closeable
        maskClosable
        onClose={closeModal}
      >
        <h3>{modalMessage}</h3>
      </NorificationModal>
    </DarkBackground>
  );
}

SignUpForm.propTypes = {
  show: PropTypes.bool.isRequired,
  isShow: PropTypes.func.isRequired,
};
// SignUpForm 주변영역
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
  z-index: 1000;
`;
// SignUpForm 영역
const SignUpFormStyle = styled.div`
  width: 700px;
  padding: 1.5rem;
  background: white;
  border-radius: 5px;
  text-align: center;
  h3 {
    text-align: center;
    margin: 15px;
    font-size: 1.5rem;
    border-bottom: solid 1px gray;
    padding-bottom: 20px;
  }
  p {
    font-size: 1.125rem;
    padding-right: 20px;
  }
  input {
    display: block;
    width: 100%;
    height: 40px;
    border: 1px solid lightgray;
    border-radius: 3px;
  }
  div.email-wrap {
    display: flex;
  }
  b {
    font-size: 1rem;
    line-height: 53px;
    width: 200px;
    text-align: left;
  }
  input#sign-up {
    border-radius: 4px;
    font-weight: bold;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 30px;
    display: inline;
    width: 200px;
    height: 40px;
    background: blueviolet;
    color: white;
  }
  table {
    width: 100%;
  }
  #notification {
    font-size: 0.8rem;
    /* text-align: left; */
    /* justify-content: left; */
    text-align: right;
  }
  #signup-form-table {
    display: initail;
  }
`;
const Button = styled.button`
  border-radius: 4px;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 3px;
  display: inline;
  height: 40px;
  background: blueviolet;
  color: white;
  border: 1px solid lightgray;
`;
const Error = styled.span`
  font-size: 0.7rem;
  float: left;
  color: ${props => (props.check ? "green" : "red")};
`;
const TableRow = styled.tr`
  margin-top: 7px;
`;
const TableData = styled.td``;
const UserInfoTable = styled.table`
  .label {
    text-align: left;
    padding-left: 50px;
    width: 150px;
  }
  input {
    padding-left: 10px;
  }
`;
const ButtonWrap = styled.div`
  margin-top: 33px;
`;
