import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Information from "../compoments/Information";
import UserRecipe from "../compoments/UserRecipe";
import Banner from "../compoments/Banner";
// eslint-disable-next-line no-unused-vars
export default function UserInfo({ handleLogOut, isLogin }) {
  const menuList = {
    0: <Information handleLogOut={handleLogOut} isLogin={isLogin} />,
    1: <UserRecipe isLogin={isLogin} />,
  };
  const [menu, setMenu] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [checked, setChecked] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const handleMenu = menuIndex => {
    setMenu(menuIndex);
  };
  return (
    <>
      <Banner url="./banner/myPage.jpg" />
      <MenuContainer>
        <MenuButton>
          <Button
            type="button"
            id="userInfo"
            checked={menu}
            className={menu === 0 ? "active" : ""}
            onClick={() => handleMenu(0)}
          >
            회원정보
          </Button>
          <Button
            type="button"
            id="myRecipe"
            checked={menu}
            className={menu === 1 ? "active" : ""}
            onClick={() => handleMenu(1)}
          >
            내 레시피
          </Button>
          {/* <Button type="button"> {prop}</Button> */}
        </MenuButton>
        <ViewComponent>{menuList[menu]}</ViewComponent>
      </MenuContainer>
    </>
  );
}
UserInfo.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  isLogin: PropTypes.string.isRequired,
};
const MenuContainer = styled.div`
  border: 1px solid lightgray;
  border-radius: 0px 0px 10px 10px;
  width: 80%;
  margin: 60px auto;
  background: #0b0c21;
  .active {
    background: white;
    color: #0b0c21;
  }
`;
const MenuButton = styled.div`
  text-align: left;
`;

const ViewComponent = styled.div`
  background: white;
  border-radius: 0px 0px 10px 10px;
`;
const Button = styled.button`
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  border: 1px solid white;
  margin-top: 5px;
  margin-right: 8px;
  border-radius: 17px 17px 0px 0px;
  display: inline-block;
  background: #585a6b;
  height: 40px;
  color: white;
  width: 150px;
  border: 1px solid white;
`;
