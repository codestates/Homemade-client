import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { darken, lighten } from "polished";
import { MdMenu } from "react-icons/md";
import { FiUser, FiShoppingCart, FiSearch } from "react-icons/fi";

const NavWrap = styled.header`
  width: 100%
  height: 6rem;
`;

const TopBar = styled.article`
  width: 100%;
  height: 2rem;
  background-color: #f0f0f0;
`;

const Info = styled.section`
  width: 1020px;
  height: 2rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  @media (max-width: 1020px) {
    width: 80%;
  }
`;

const InfoItem = styled(Link)`
  color: #6f6f6f;
  font-size: 0.8rem;
  margin-left: 1rem;
  text-decoration: none;
  &:hover {
    color: ${lighten(0.1, `#6f6f6f`)};
  }
  &:active {
    color: ${darken(0.1, `#6f6f6f`)};
  }
`;

const BottomBar = styled.article`
  svg {
    font-size: 2rem;
  }
  width: 100%;
  height: 4rem;
  background-color: #9a8b80;
`;

const Category = styled.section`
  width: 1020px;
  height: 100%;
  margin: 0 auto;
  display: table;
  color: white;
  font-size: 1.1rem;
`;

const CategoryItem = styled.span`
  display: table-cell;
  line-height: 100%;
  vertical-align: middle;
  flex: 1;
  margin-left: 10px;
`;

const MyPageLink = styled(Link)`
  color: white;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: underline;
    color: ${darken(0.1, `#6f6f6f`)};
  }
`;

const CategoryModal = styled(CategoryItem)`
  width: 168px;
  span {
    position: relative;
    top: -9px;
  }
  svg {
    margin-right: 8px;
    // &:hover {
    //   color: ${lighten(0.1, `#6f6f6f`)};
    // }
    // &:active {
    //   color: ${darken(0.1, `#6f6f6f`)};
    // }
  }
`;

const CategoryInput = styled.span`
  position: relative;
  flex: 2;
  display: flex;
  width: 100%;
  input {
    outline: none;
    width: 90%;
    height: 36px;
    border-radius: 8px;
    border: 0.5px solid #6f6f6f;
    margin-top: 14px;
  }
  svg {
    font-size: 1.6rem;
    position: absolute;
    top: 18px;
    right: 50px;
    color: black;
  }
`;

export default function Nav() {
  return (
    <NavWrap>
      <TopBar>
        <Info>
          <InfoItem to="/signup">회원가입</InfoItem>
          <InfoItem to="/login">로그인</InfoItem>
        </Info>
      </TopBar>
      <BottomBar>
        <Category>
          <CategoryItem>로고</CategoryItem>
          <CategoryModal>
            <MdMenu />
            <span>카테고리</span>
          </CategoryModal>
          <CategoryItem>랭킹</CategoryItem>
          <CategoryInput>
            <input className="search" type="text" />
            <FiSearch />
          </CategoryInput>
          <CategoryItem>
            <MyPageLink to="/userinfo">
              <FiUser />
            </MyPageLink>
          </CategoryItem>
          <CategoryItem>
            <MyPageLink to="/myrecipe">
              <FiShoppingCart />
            </MyPageLink>
          </CategoryItem>
        </Category>
      </BottomBar>
    </NavWrap>
  );
}
