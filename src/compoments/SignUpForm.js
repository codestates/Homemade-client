import React from "react";
import styled from "styled-components";

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
`;
// SignUpForm 영역
const SignUpFormStyle = styled.div`
  width: 500px;
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
  }
  input {
    margin-top: 5px;
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
  .label {
    font-size: 0.9rem;
    text-align: left;
  }
  .input-tag {
    width: 200px;
  }
  table {
    width: 100%;
  }
  #overlapping-button {
    margin-left: 10px;
    width: 100px;
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
  width: 200px;
  height: 40px;
  background: blueviolet;
  color: white;
  border: 1px solid lightgray;
`;

function SignUpForm() {
  return (
    <DarkBackground>
      <SignUpFormStyle>
        <h3>회원가입</h3>
        <p id="notification">모든항목은 필수입력 사항입니다.</p>
        <form>
          <table id="signup-form-table">
            <tr>
              <td className="label">eamil</td>
              <td className="input-tag">
                <input type="text" name="eamil" required />
              </td>
              <td>
                <Button id="overlapping-button">중복확인 </Button>
              </td>
            </tr>
            <tr>
              <td className="label">비밀번호</td>
              <td className="input-tag">
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="label">비밀번호 확인</td>
              <td className="input-tag">
                <input
                  type="password"
                  name="password-check"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="label">닉네임</td>
              <td className="input-tag">
                <input type="text" name="password" required />
              </td>
            </tr>
            <tr>
              <td className="label">핸드폰 번호</td>
              <td className="input-tag">
                <input
                  type="text"
                  name="mobile"
                  placeholder="'-' 는 제외한 숫자만 입력바랍니다"
                  required
                />
              </td>
            </tr>
          </table>
          <div id="button-wrap">
            <input type="submit" id="sign-up" value="가입하기" />
            <Button type="button">취소</Button>
          </div>
        </form>
      </SignUpFormStyle>
    </DarkBackground>
  );
}

export default SignUpForm;
