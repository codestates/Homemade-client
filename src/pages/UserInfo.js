/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
// UserInfo 주변영역
const Background = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// UserInfo 영역
const UserInfoStyle = styled.div`
  width: 500px;
  padding: 1.5rem;
  border-radius: 5px;
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
  .label {
    font-size: 0.9rem;
    text-align: left;
    height: 40px;
  }
  table {
    width: 100%;
  }
  #avater {
    width: 100%;
    height: 150px;
  }
  .td-button {
    text-align: right;
  }
  #cancel-button {
    margin-top: 20px;
    width: 100%;
  }
`;
// 버튼
const Button = styled.button`
  border-radius: 4px;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 3px;
  display: inline;
  width: 120px;
  height: 40px;
  background: blueviolet;
  color: white;
  border: 1px solid lightgray;
`;
// recipeList 영역
const RecipeCard = styled.span`
  width: 200px;
  height: 200px;
  display: inline-block;
  img {
		width: 100%;
    height: 239px;
`;

function UserInfo() {
  return (
    <Background>
      <UserInfoStyle>
        <h3>회원정보</h3>
        <table id="signup-form-table">
          <tr>
            <td className="label">아바타</td>
            <td className="label">
              <img src="/" id="avater" />
            </td>
            <td className="td-button">
              <Button id="avater-change-button">이미지 변경 </Button>
            </td>
          </tr>
          <tr>
            <td className="label">eamil</td>
            <td>user eamil</td>
          </tr>
          <tr>
            <td className="label">닉네임</td>
            <td>user nickname</td>
          </tr>
          <tr>
            <td className="label">eamil</td>
            <td>asdf@gmail.com</td>
          </tr>
          <tr>
            <td className="label">비밀번호</td>
            <td>********</td>
            <td className="td-button">
              <Button id="password-change-button">비밀번호변경 </Button>
            </td>
          </tr>
          <tr>
            <td className="label">핸드폰 번호</td>
            <td>010-1234-1234</td>
            <td className="td-button">
              <Button id="mobile-change-button">번호변경 </Button>
            </td>
          </tr>
        </table>
        <h4>내가 작성한 recipe</h4>
        <div id="recipe-wrap">
          <RecipeCard className="recipe">
            <img className="thumbnail" src="./recip.jpg" />
            <div> 제목 : </div>
            <div> 작성자 : </div>
            <div />
          </RecipeCard>
        </div>
        <Button id="cancel-button">취소</Button>
      </UserInfoStyle>
    </Background>
  );
}

export default UserInfo;
