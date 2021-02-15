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
            </CenterDiv>
            <EmptyDiv2 />
            <RightDiv>
              <MyPageLink to="/userinfo">
                <MyPage />
              </MyPageLink>
              <WriteLink to="/postrecipe">
                <Write />
              </WriteLink>
              {isLogin ? (
                <>
                  <AccessBtn onClick={() => handleLogOut()}>
                    <AccessLink>로그아웃</AccessLink>
                  </AccessBtn>
                </>
              ) : (
                <>
                  <AccessBtn onClick={() => setShowLogin(true)}>
                    <AccessLink>로그인</AccessLink>
                  </AccessBtn>
                  <AccessBtn onClick={() => setShowSignUp(true)}>
                    <AccessLink>회원가입</AccessLink>
                  </AccessBtn>
                </>
              )}
            </RightDiv>
            <EmptyDivHalf />
          </MenuWrapper>
        </MenuContainer>
      </TopBar>
      <LoginForm
        show={showLogin}
        isShow={setShowLogin}
        signInHanlder={signInHanlder}
      />
      <SignUpForm show={showSignup} isShow={setShowSignUp} />
    </>
  );
}

const EmptyDivHalf = styled.div`
  flex: 0.5;
`;

const EmptyDiv2 = styled.div`
  flex: 2;
`;

const TopBar = styled.div`
  position: relative;
  background: #ffffff;
  z-index: 199;
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
  flex: 0.3;

  ${({ bottom }) =>
    bottom &&
    `
    flex: 9.8;
  `}
`;

const RightDiv = styled.div`
  flex: 2.5;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #ffffff;
`;

const CenterDiv = styled.div`
  flex: 5;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #ffffff;
`;

const SearchDiv = styled.div`
  padding: 10px;
  position: absolute;
  top: 69%;
  left: 30%;
  transform: translate(0%, -100%);
  height: 52px;
  width: 52px;
  background-color: #fff;
  border: 1px solid #dddddd;
  border-radius: 30px;
  transition: 0.4s;
  &:hover {
    box-shadow: 0px 0px 0.5px 1px #000000;
    width: 700px;

    SearchButton {
      background-color: #fff;
    }

    Search {
      width: 240px;
      padding: 0 6px;
      opacity: 1;
    }
  }
`;

const Search = styled.input`
  display: flex;
  padding: 0;
  width: 800px;
  border: none;
  background: none;
  outline: none;
  float: left;
  font-size: 1rem;
  line-height: 30px;
  transition: 0.4s;
  opacity: 0;
  &:hover {
    opacity: 1;
    &:focus {
      opacity: 1;
    }
  }
`;

const SearchLink = styled(Link)`
  height: 100px;
  color: #000000;
`;

const SearchButton = styled(AiOutlineSearch)`
  transform: translate(7.5%, -92%);
  text-decoration: none;
  float: right;
  width: 36px;
  height: 36px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000;
`;

const CateogryButtonDiv = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 52px;
  width: 52px;
  transition: 0.4s;
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
  position: relative;
  top: 50%;
  left: -107.5%;
  width: 160px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background-color: #fafafa;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const CategoryItem = styled(Link)`
  padding: 12px 16px;
  font-size: 1rem;
  text-decoration: none;
  display: block;
  color: #000000;
  border-bottom: 1px solid #eeeeee;
  &:hover {
    border-radius: 4px;
    background: ${darken(0.2, `#fafafa`)};
  }
`;

const CategoryHover = styled.div`
  position: absolute;
  top: 50px;
  left: -55px;
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

const AccessBtn = styled.button`
  position: relative;
  height: 52px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #dddddd;
  border-radius: 16px;
  display: flex;
  font-size: 1rem;
  padding: 1rem;
  font-weight: 600;
  background: #000000;
  color: #ffffff;
  &:hover {
    background: ${lighten(0.1, `#000000`)};
  }
  &:active {
    background: #000000);
  }
  &:focus {
    outline: none;
  }
`;

const AccessLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const LogoWrapper = styled(Link)`
  position: absolute;
  top: 50%;
  transform: translate(40.5%, -40%) scale(1.5);
  flex: 18;
  width: 160px;
  height: auto;
`;

const Logo = styled.img`
  width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

Test.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  signInHanlder: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
};
