import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";

// eslint-disable-next-line no-unused-vars
function Information() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    avatar: "",
    nickname: "",
    mobile: "",
  });
  const [image, setImage] = useState({
    file: "",
    previewURL: "",
  });
  // 회원정보 변경에대한 상태
  const [avatarModify, setAvatarModify] = useState(false);
  const [passwordModify, setPasswordModify] = useState(false);
  const [mobileModify, setMobileModify] = useState(false);
  // 비밀번호 변경에대한 상태
  const [firstPassword, setFirstPassword] = useState("");
  const [lastPassword, setLastPassword] = useState("");
  const [message, setMessage] = useState("");
  const [mobileNumber, setMobile] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  // 비밀번호 일치여부 판단
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
  // 유저의 아바타가 등록유무에 따른 버튼 이름 변경
  const checkUserAvartar = isAvatar => {
    if (isAvatar) {
      return "이미지 변경";
    }
    return "이미지 등록";
  };
  const handleMobile = event => {
    const { value } = event.target;
    setMobile(value);
  };
  // 비밀번호 입력값 초기화
  const handleInitializePassword = () => {
    setPasswordModify(false);
    setFirstPassword("");
    setLastPassword("");
    setMessage("");
  };
  // 전화번호 입력값 초기
  const handleInitializeMobile = () => {
    setMobileModify(false);
  };
  const handleFileOnChange = event => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      setImage({
        file,
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  const handleReqeustUploadAvatar = () => {
    const formData = new FormData();
    formData.append("uploadImages", image.file, image.file.name);
    const config = {
      headers: {
        "content-type": "multipart/fomr-data",
      },
    };
    axios.patch("https://homemade2021.ml/users/userinfo", formData, config);
  };
  const handleRequestUserInfo = () => {
    const { accessToken } = JSON.parse(localStorage.getItem("loggedInfo"));
    try {
      axios
        .get("https://homemade2021.ml/users/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then(res => {
          const {
            name,
            email,
            nickname,
            mobile,
            avatar,
          } = res.data.data.userInfo;
          setUserInfo({
            name,
            email,
            nickname,
            mobile,
            avatar,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleRequestPasswordModify = () => {
    const { accessToken } = JSON.parse(localStorage.getItem("loggedInfo"));
    try {
      axios
        .patch(
          "https://homemade2021.ml/users/uuserinfo",
          {
            password: lastPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        )
        .then(res => {
          console.log(res, "정상");
          handleInitializePassword();
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleRequestMobileModify = () => {
    const { accessToken } = JSON.parse(localStorage.getItem("loggedInfo"));
    try {
      axios
        .patch(
          "https://homemade2021.ml/users/uuserinfo",
          {
            mobile: mobileNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        )
        .then(res => {
          console.log(res, "정상");
          handleInitializePassword();
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleRequestUserInfo();
  }, []);
  return (
    <Background>
      <UserinfoContainer>
        <UserInfoStyle>
          <h3>회원정보</h3>
          <Container>
            <AvatarContainer>
              <h4>프로필 사진</h4>
              <ProfileImg>
                {/* 유저가 저장해 놓은 이미지가 없을경우 기본 이미지를 print */}
                {avatarModify ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      name="profile_img"
                      onChange={handleFileOnChange}
                    />
                    <Avatar
                      className="profile_preview"
                      src={image.previewURL}
                      alt="default_img"
                    />
                  </div>
                ) : (
                  <div>
                    {userInfo.avatar ? (
                      <Avatar
                        src={userInfo.avatar}
                        id="avater"
                        className="avatar-tag"
                      />
                    ) : (
                      <Avatar
                        src="../images/defaultUserAvatar.png"
                        id="avater"
                        className="avatar-tag"
                      />
                    )}
                  </div>
                )}
                {avatarModify ? (
                  <div>
                    <Button
                      className="avatar-changed-button"
                      onClick={handleReqeustUploadAvatar}
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
                    {checkUserAvartar(userInfo.avatar)}
                  </Button>
                )}
              </ProfileImg>
            </AvatarContainer>
            <UserInfoTable id="signup-form-table">
              <TableRow>
                <TableData className="label">이름</TableData>
                <TableData className="user-info">{userInfo.name}</TableData>
                <TableData />
              </TableRow>
              <TableRow>
                <TableData className="label">eamil</TableData>
                <TableData className="user-info">{userInfo.email}</TableData>
                <TableData />
              </TableRow>
              <TableRow>
                <TableData className="label">닉네임</TableData>
                <TableData className="user-info">{userInfo.nickname}</TableData>
                <TableData />
              </TableRow>
              <TableRow>
                <TableData className="label">비밀번호</TableData>
                {passwordModify ? (
                  <div>
                    <input
                      type="password"
                      name="password"
                      className="new-password"
                      value={firstPassword}
                      placeholder="새로운 비밀번호"
                      onChange={handleFirstPassword}
                      required
                    />
                    <input
                      type="password"
                      name="password-check"
                      className="new-password"
                      value={lastPassword}
                      placeholder="새로운 비밀번호 확인 "
                      onChange={handleLastPassword}
                      required
                    />{" "}
                    <Error check={isValidPassword}>{message}</Error>
                  </div>
                ) : (
                  <TableData className="user-info">********</TableData>
                )}
                <TableData className="td-button">
                  {/* 비밀번호 변경버튼을 눌렀을 경우  */}
                  {passwordModify ? (
                    <div>
                      {/* TODO : 비동기 및 수직 방향 정렬필요 */}
                      <Button
                        className="changed-Button"
                        onClick={handleRequestPasswordModify}
                      >
                        {" "}
                        변경{" "}
                      </Button>
                      <Button
                        className="changed-Button"
                        onClick={handleInitializePassword}
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
                </TableData>
              </TableRow>
              <TableRow>
                <TableData className="label">전화번호</TableData>
                {mobileModify ? (
                  <input
                    type="text"
                    name="mobile-modify"
                    onChange={handleMobile}
                    placeholder="'-' 는 제외한 숫자만 입력바랍니다"
                    required
                  />
                ) : (
                  <TableData className="user-info">{userInfo.mobile}</TableData>
                )}
                <TableData className="td-button">
                  {/* 핸드폰번호 변경  */}
                  {mobileModify ? (
                    <div>
                      <Button
                        className="changed-Button"
                        onClick={handleRequestMobileModify}
                      >
                        변경
                      </Button>
                      <Button
                        className="changed-Button"
                        onClick={handleInitializeMobile}
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
                </TableData>
              </TableRow>
              <TableRow>
                <TableData />
                <TableData />
                <TableData />
              </TableRow>
            </UserInfoTable>
          </Container>
        </UserInfoStyle>
      </UserinfoContainer>
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
};
Information.propTypes = {
  userinfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
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
    margin-bottom: 5px;
  }
  .label {
    font-size: 0.9rem;
    text-align: left;
    height: 40px;
    width: 100px;
  }
  .td-button {
    text-align: -webkit-right;
    width: 120px;
  }
  .user-info {
    color: gray;
    width: 200px;
  }
`;
// 버튼
const Button = styled.button`
  border-radius: 4px;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
  height: 40px;
  background: blueviolet;
  color: white;
  border: 1px solid lightgray;
`;
const Avatar = styled.img`
  height: 216px;
  border-radius: 10px;
`;
const UserinfoContainer = styled.div`
  text-align: -webkit-center;
  bakcground: white;
`;
const Error = styled.span`
  font-size: 0.8rem;
  float: left;
  color: ${props => (props.check ? "green" : "red")};
`;
const TableRow = styled.tr`
  border-top: 1px solid lightgray;
`;

const TableData = styled.td``;
const UserInfoTable = styled.table`
  border-collapse: collapse;
  border-top: 1px solid lightgray;
	display: inline-block;
	margin-top: 60px;
v
`;
const AvatarContainer = styled.span`
  height: 390px;
  display: inline-block;
  margin-right: 30px;
`;
const Container = styled.div`
  display: inline-flex;
  border-bottom: 1px solid gray;
`;
const ProfileImg = styled.div`
  border-radius: 10px;
  width: 211px;
`;

export default Information;
