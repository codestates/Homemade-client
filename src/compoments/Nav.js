import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { darken, lighten } from "polished";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { nanoid } from "nanoid";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function Test({ isLogin, signInHanlder, handleLogOut }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignUp] = useState(false);
  const [keyword, setKeyword] = useState("");

  const categories = ["한식", "중식", "양식", "일식", "음료/술"];

  return (
    <>
      <TopBar>
        <LogoWrapper to="/">
          <Logo src="../images/logo.png" />
        </LogoWrapper>
        <MenuContainer>
          <MenuWrapper>
            <LeftDiv />
            <CenterDiv>
              <CateogryButtonDiv>
                <CategoryButton />
                <CategoryHover />
                <CategoryItemDiv>
                  {categories.map((category, idx) => (
                    <CategoryItem
                      key={nanoid()}
                      to={`/search?category=${categories[idx]}&page=1`}
                    >
                      {category}
                    </CategoryItem>
                  ))}
                </CategoryItemDiv>
              </CateogryButtonDiv>
              <SearchDiv>
                <Search
                  name="keyword"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  type="text"
                  placeholder="찾고 싶은 레시피를 검색해 보세요!"
                />
                <SearchLink to={`/search?q=${keyword}&page=1`}>
                  <SearchButton />
                </SearchLink>
              </SearchDiv>
              <MyPageLink to="/userinfo">
                <MyPage />
              </MyPageLink>
              <WriteLink to="/postrecipe">
                <Write />
              </WriteLink>
            </CenterDiv>
            <RightDiv />
          </MenuWrapper>
        </MenuContainer>
      </TopBar>
      <BottomBar>
        <LeftDiv bottom />
        <AccessDiv>
          {isLogin ? (
            <AccessBtn type="button" onClick={() => handleLogOut()}>
              로그아웃
            </AccessBtn>
          ) : (
            <>
              <AccessBtn type="button" onClick={() => setShowLogin(true)}>
                로그인
              </AccessBtn>
              <AccessBtn type="button" onClick={() => setShowSignUp(true)}>
                회원가입
              </AccessBtn>
            </>
          )}
        </AccessDiv>
      </BottomBar>
      <LoginForm
        show={showLogin}
        isShow={setShowLogin}
        signInHanlder={signInHanlder}
      />
      <SignUpForm show={showSignup} isShow={setShowSignUp} />
    </>
  );
}

const AccessDiv = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex: 5;
`;

const AccessBtn = styled.button`
  border: none;
  background: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  padding-left: 2rem;

  &:focus {
    outline: none;
  }
  &:hover {
    color: ${lighten(0.1, `#6f6f6f`)};
  }
  &:active {
    color: ${darken(0.1, `#6f6f6f`)};
  }
`;

const TopBar = styled.div`
  position: relative;
  z-index: 99;
  width: 100%;
  height: 14vh;
  font-size: 2rem;
  display: flex;
`;

const MenuContainer = styled.div`
  width: 100%;
  flex: 100;
  display: flex;
  flex-direction: column;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const LeftDiv = styled.div`
  flex: 3;

  ${({ bottom }) =>
    bottom &&
    `
    flex: 9.8;
  `}
`;

const RightDiv = styled.div`
  flex: 4;
`;

const CenterDiv = styled.div`
  flex: 10;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #ffffff;
`;

const SearchDiv = styled.div`
  position: relative;
  height: 40%;
  width: 65%;
  text-align: left;
  background: #fafafa;
  border: 1px solid #cccccc;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const Search = styled.input`
  height: 100%;
  width: 85%;
  background: #fafafa;
  border: none;
  padding: 0 1rem;
  font-size: 1.3rem;

  &:focus {
    outline: none;
  }
`;

const SearchLink = styled(Link)`
  height: 100px;
  color: #000000;
`;

const SearchButton = styled(AiOutlineSearch)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-25%, -50%);
  padding: 0.3rem;
  &:hover {
    color: ${lighten(0.1, `#6f6f6f`)};
  }
  &:active {
    color: ${darken(0.1, `#6f6f6f`)};
  }
`;

const CateogryButtonDiv = styled.div`
  position: relative;
  height: 52px;
  width: 52px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #dddddd;
  border-radius: 50%;
  &:hover {
    div {
      display: block;
      position: relative;
    }
  }
`;

const CategoryButton = styled(AiOutlineMenu)`
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  &:hover {
    color: #ff4c4c;
  }
`;

const CategoryItemDiv = styled.div`
  display: none;
  top: 30px;
  width: 160px;
  border: 1px solid #cccccc;
  border-radius: 12px;
  background-color: #fafafa;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const CategoryItem = styled(Link)`
  padding: 12px 16px;
  font-size: 1.3rem;
  text-decoration: none;
  display: block;
  color: #000000;
  border-bottom: 1px solid #eeeeee;
  &:hover {
    color: ${lighten(0.1, `#6f6f6f`)};
  }
  &:active {
    color: ${darken(0.1, `#6f6f6f`)};
  }
`;

const CategoryHover = styled.div`
  position: absolute;
  top: 50px;
  height: 30px;
  width: 160px;
`;

const MyPageLink = styled(Link)`
  position: relative;
  height: 52px;
  width: 52px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #dddddd;
  border-radius: 50%;
`;

const MyPage = styled(AiOutlineUser)`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #000000;
  &:hover {
    color: #ff4c4c;
  }
`;

const WriteLink = styled(Link)`
  position: relative;
  height: 52px;
  width: 52px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #dddddd;
  border-radius: 50%;
  color: #000000;
`;

const Write = styled(HiOutlinePencil)`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  &:hover {
    color: #ff4c4c;
  }
`;

const LogoWrapper = styled(Link)`
  flex: 0.1;
  width: 200px;
`;

const Logo = styled.img`
  height: 100%;
  object-fit: cover;
`;

const BottomBar = styled.div`
  display: flex;
  width: 100%;
  height: 6vh;
  border-top: 0.1px solid #f1f1f1;
  border-bottom: 0.5px solid #f1f1f1;
`;

Test.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  signInHanlder: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
};
