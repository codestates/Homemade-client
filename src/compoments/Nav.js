import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { darken, lighten } from "polished";
import { MdMenu } from "react-icons/md";
import { FiUser, FiSearch } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";

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

const CategoryItem = styled.div`
  max-width: 168px;
  cursor: pointer;
  display: table-cell;
  line-height: 100%;
  vertical-align: middle;
  flex: 2;
  max-width: 100px;
  margin-left: 10px;
  &:hover {
    color: ${lighten(0.4, `#6f6f6f`)};
  }
  &:active {
    color: ${darken(0.1, `#6f6f6f`)};
  }
`;

const Logo = styled(CategoryItem)`
  width: 168px;
  font-size: 1.3rem;
`;

const MyPageLink = styled(Link)`
  color: white;
  &:hover {
    color: ${lighten(0.4, `#6f6f6f`)};
  }
  &:active {
    color: ${darken(0.1, `#6f6f6f`)};
  }
`;

const CategoryMenu = styled(CategoryItem)`
  width: 168px;
  span {
    position: relative;
    top: -9px;
  }
  svg {
    margin-right: 8px;
  }
  &:hover {
    color: white;
    div {
      display: block;
    }
  }
`;

const CategoryInput = styled.span`
  position: relative;
  flex: 4;
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

const DropDownMenu = styled.div`
  display: none;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background-color: #f1f1f1;
  width: 120px;
  z-index: 1;
  transform: translateY(1rem);
`;

const DropDownContent = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    color: ${lighten(0.1, `#6f6f6f`)};
  }
  &:active {
    color: ${darken(0.1, `#6f6f6f`)};
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
          <Logo>Homemade</Logo>
          <CategoryMenu>
            <MdMenu />
            <span>카테고리</span>
            <DropDownMenu>
              <DropDownContent href="/">한식</DropDownContent>
              <DropDownContent href="/">중식</DropDownContent>
              <DropDownContent href="/">양식</DropDownContent>
              <DropDownContent href="/">일식</DropDownContent>
              <DropDownContent href="/">음료/술</DropDownContent>
            </DropDownMenu>
          </CategoryMenu>
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
              <HiOutlinePencil />
            </MyPageLink>
          </CategoryItem>
        </Category>
      </BottomBar>
    </NavWrap>
  );
}
