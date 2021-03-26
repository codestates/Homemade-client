import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
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

  const history = useHistory();
  const onKeyPress = e => {
    if (e.key === "Enter") {
      history.push(`/search?q=${keyword}&page=1`);
    }
  };
  return (
    <>
      <TopBar>
        <LogoWrapper to="/">
          <Logo src="../images/logo.png" />
        </LogoWrapper>
        <MenuContainer>
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
                autocomplete="nope"
                name="field"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyPress={onKeyPress}
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
            {isLogin ? (
              <>
                <AccessBtn onClick={() => handleLogOut()}>로그아웃</AccessBtn>
              </>
            ) : (
              <>
                <AccessBtn onClick={() => setShowLogin(true)}>로그인</AccessBtn>
                <AccessBtn onClick={() => setShowSignUp(true)}>
                  회원가입
                </AccessBtn>
              </>
            )}
          </CenterDiv>
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

const TopBar = styled.div`
  position: relative;
  background: #ffffff;
  z-index: 199;
  width: 100%;
  height: 14vh;
  font-size: 2rem;
  display: flex;
  box-shadow: 0px 0px 10px 3px #d4d0d0;
`;

const MenuContainer = styled.div`
  width: 100%;
  flex: 5;
  display: flex;
  flex-direction: column;
`;

const CenterDiv = styled.div`
  flex: 5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #ffffff;
  padding-right: 5vw;
  div,
  a {
    margin-right: 0.4rem;
  }
`;

const SearchDiv = styled.div`
  padding: 10px;
  height: 52px;
  width: 52px;
  background-color: #fff;
  border: 1px solid #dddddd;
  border-radius: 30px;
  width: 55vw;

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
  &:focus {
    outline-width: 0;
  }
`;

const SearchLink = styled(Link)`
  height: 100px;
  color: #000000;
`;

const SearchButton = styled(AiOutlineSearch)`
  transform: translate(7.5%, -10%);
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
  margin-left: 0.5rem;
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
  height: 52px;
  width: 96px;
  margin-left: .5rem;
  border: 1px solid #dddddd;
  border-radius: 16px;
  padding: 0.5rem .5rem;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
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

const LogoWrapper = styled(Link)`
  flex: 1;
  min-width: 160px;
  height: 12vh;
  padding: 1vh;
  margin: auto 0;
  margin-left: 4%;
`;

const Logo = styled.img`
  width: 100%;
  max-height: 100%;
`;

Test.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  signInHanlder: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
};
