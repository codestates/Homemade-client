import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Information({ userinfo, myrecipes }) {
  const { name, avatar, email, nickname, mobile } = userinfo;
  const myRecipes = myrecipes.length > 0 ? myrecipes.length : 0;
  // 회원정보 변경에대한 상태
  const [avatarModify, setAvatarModify] = useState(false);
  const [passwordModify, setPasswordModify] = useState(false);
  const [mobileModify, setMobileModify] = useState(false);
  // 비밀번호 변경에대한 상태
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [message, setMessage] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  // 비밀번호 일치여부 판단
  const handleConfirmPassword = event => {
    const { value } = event.target;
    setPassword(value);
  };
  const handleConfirmrePassword = event => {
    const { value } = event.target;
    setPasswordCheck(value);
    if (value !== password) {
      setMessage("비밀번호 불일치");
      setIsValidPassword(false);
    } else if (value === " ") {
      setMessage("");
    } else if (value === password) {
      setMessage("비밀번호 일치");
      setIsValidPassword(true);
    }
  };
  // 유저의 아바타가 등록유무에 따른 버튼 이름 변경

  const checkUserAvartar = isAvatar => {
    if (isAvatar) {
      return "이미지 변경";
    }
    return "이미지 등록";
  };
  return (
    <Background>
      <UserinfoContainer>
        <UserInfoStyle>
          <h3>회원정보</h3>
          <table id="signup-form-table">
            <tr>
              <td className="label">아바타</td>
              <td id="avatar-area" className="label">
                {/* 유저가 저장해 놓은 이미지가 없을경우 기본 이미지를 print */}
                {avatarModify ? (
                  <input type="text" placeholder="수정할 이미지" />
                ) : (
                  <div>
                    {avatar ? (
                      <Avatar src={avatar} id="avater" className="avatar-tag" />
                    ) : (
                      <Avatar
                        src="../images/defaultUserAvatar.png"
                        id="avater"
                        className="avatar-tag"
                      />
                    )}
                  </div>
                )}
              </td>
              <td className="td-button">
                {avatarModify ? (
                  <div>
                    <Button
                      className="avatar-changed-button"
                      onClick={() => setAvatarModify(true)}
                    >
                      등록
                    </Button>
                    <Button
                      className="avatar-changed-button"
                      onClick={() => setAvatarModify(false)}
                    >
                      취소
                    </Button>
                  </div>
                ) : (
                  <Button
                    id="avater-change-button"
                    onClick={() => setAvatarModify(true)}
                  >
                    {/* 이미지 등록 or 이미지 변경 */}
                    {checkUserAvartar(avatar)}
                  </Button>
                )}
              </td>
            </tr>
            <tr>
              <td className="label">이름</td>
              <td className="user-info">{name}</td>
            </tr>
            <tr>
              <td className="label">eamil</td>
              <td className="user-info">{email}</td>
            </tr>
            <tr>
              <td className="label">닉네임</td>
              <td className="user-info">{nickname}</td>
            </tr>
            <tr>
              <td className="label">비밀번호</td>
              {passwordModify ? (
                <div>
                  <input
                    type="password"
                    name="password"
                    className="new-password"
                    value={password}
                    placeholder="새로운 비밀번호"
                    onChange={handleConfirmPassword}
                    required
                  />
                  <input
                    type="password"
                    name="password-check"
                    className="new-password"
                    value={passwordCheck}
                    placeholder="새로운 비밀번호 확인 "
                    onChange={handleConfirmrePassword}
                    required
                  />{" "}
                  <Error check={isValidPassword}>{message}</Error>
                </div>
              ) : (
                <td className="user-info">********</td>
              )}
              <td className="td-button">
                {/* 비밀번호 변경버튼을 눌렀을 경우  */}
                {passwordModify ? (
                  <div>
                    {/* TODO : 비동기 및 수직 방향 정렬필요 */}
                    <Button
                      className="changed-Button"
                      onClick={() => setPasswordModify(false)}
                    >
                      {" "}
                      변경{" "}
                    </Button>
                    <Button
                      className="changed-Button"
                      onClick={() => setPasswordModify(false)}
                    >
                      {" "}
                      취소{" "}
                    </Button>
                  </div>
                ) : (
                  <Button
                    id="password-change-button"
                    onClick={() => setPasswordModify(true)}
                  >
                    {" "}
                    비밀번호변경{" "}
                  </Button>
                )}
              </td>
            </tr>
            <tr>
              <td className="label">전화번호</td>
              {mobileModify ? (
                <input
                  type="text"
                  name="mobile-modify"
                  placeholder="'-' 는 제외한 숫자만 입력바랍니다"
                  required
                />
              ) : (
                <td className="user-info">{mobile}</td>
              )}
              <td className="td-button">
                {/* 핸드폰번호 변경  */}
                {mobileModify ? (
                  <div>
                    <Button
                      className="changed-Button"
                      onClick={() => setMobileModify(true)}
                    >
                      변경
                    </Button>
                    <Button
                      className="changed-Button"
                      onClick={() => setMobileModify(false)}
                    >
                      취소
                    </Button>
                  </div>
                ) : (
                  <Button
                    id="mobile-change-button"
                    onClick={() => setMobileModify(true)}
                  >
                    번호변경{" "}
                  </Button>
                )}
              </td>
            </tr>
          </table>
          <Link to="/">
            <Button id="cancel-button">취소</Button>
          </Link>
        </UserInfoStyle>
      </UserinfoContainer>
      <h4>My Recipe : {myRecipes} 개</h4>
      {myrecipes.map(recipe => {
        return (
          <RecipeCard>
            <CreatedAt>{recipe.created_at}</CreatedAt>
            <RecipeImg className="recipe" to={`/recipe/${recipe.id}`}>
              <img
                className="thumbnail"
                src={recipe.thumbnail_uri}
                alt={recipe.title}
              />
            </RecipeImg>
            <div> {recipe.title}</div>
          </RecipeCard>
        );
      })}
    </Background>
  );
}
// 유저 정보를 확인하기위한 기본적인 데이터
Information.defaultProps = {
  userinfo: {
    name: "김코딩",
    email: "kim@naver.com",
    nickname: "백종원제자",
    avatar: "../images/avatar1.jpg",
    mobile: "010-1234-1234",
  },
  myrecipes: [
    {
      id: 1,
      title: "닭강정 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 2,
      title: "콜라 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 3,
      title: "우유 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 4,
      title: "닭강정 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
    {
      id: 5,
      title: "딸기 만들기",
      thumbnail_uri: "../images/recipeInfo1.jpg",
      created_at: "2021-02-02",
    },
  ],
};
Information.propTypes = {
  userinfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
  }),
  myrecipes: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail_uri: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }),
};
const Background = styled.div`
  width: 100%;
  display: block;
  align-items: center;
  justify-content: center;
`;
// UserInfo 영역
const UserInfoStyle = styled.div`
  width: 700px;
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
    width: 50%;
    height: 150px;
  }
  .td-button {
    text-align: right;
  }
  #cancel-button {
    margin-top: 20px;
    width: 100%;
  }
  .changed-Button {
    width: 60px;
  }
  .avatar-tag {
    display: inline-block;
  }
  .avatar-changed-button {
    width: 60px;
  }
  .user-info {
    color: gray;
  }
  #avatar-area {
    text-align: center;
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
const RecipeImg = styled(Link)`
  display: inline-block;
  img {
		width: 100%;
    height: 239px;
`;

const Avatar = styled.img`
  width: 50%;
  height: 150px;
`;
const UserinfoContainer = styled.div`
  text-align: -webkit-center;
`;
const CreatedAt = styled.div`
  text-align: right;
  font-size: 0.8rem;
`;

const RecipeCard = styled.div`
  width: 200px;
  height: 200px;
  margin: 20px;
  display: inline-block;
`;
const Error = styled.span`
  font-size: 0.8rem;
  float: left;
  color: ${props => (props.check ? "green" : "red")};
`;
export default Information;
