import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { Nav } from "./compoments/index";
import Footer from "./compoments/Footer";

import {
  Main,
  Intro,
  UserInfo,
  SubmitRecipe,
  RecipeDescription,
  RecipesContainer,
} from "./pages/index";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [intro, setIntro] = useState(false);
  // 회원이 로그아웃할 경우 localStorage의 accessToken을 삭제한다
  const handleLogOut = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  const signInHanlder = () => {
    setIsLogin(true);
  };
  // 홈페이지 첫 오픈 시 서버측에 accessToken의 유효성을 판단하고,
  // 이상 없을 시 유저의 로그인 상태를 유지한다.
  const initializeUserInfo = () => {
    if (localStorage.getItem("loggedInfo") === null) {
      return;
    }
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
        .then(() => {
          JSON.parse(localStorage.getItem("loggedInfo")).isLogged = true;
          setIsLogin(true);
        });
    } catch (err) {
      console.log("토큰 만료됨.");
    }
  };
  // 홈페이지 오픈시 한번만 실행
  useEffect(() => {
    initializeUserInfo();
  }, []);
  return (
    <>
      {intro ? (
        <Router>
          <Nav
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            signInHanlder={signInHanlder}
            handleLogOut={handleLogOut}
          />
          <GlobalStyle />
          <Container className="App">
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <Route exact path="/userinfo">
                <UserInfo handleLogOut={handleLogOut} isLogin={isLogin} />
              </Route>
              <Route exact path="/postrecipe">
                <SubmitRecipe />
              </Route>
              <Route exact path="/updaterecipe">
                <SubmitRecipe />
              </Route>
              <Route exact path="/recipe/:id">
                <RecipeDescription />
              </Route>
              <Route path="/search">
                <RecipesContainer />
              </Route>
              <Redirect path="/" />
            </Switch>
          </Container>
          <Footer />
        </Router>
      ) : (
        <Intro setIntro={setIntro} />
      )}
    </>
  );
}
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
  }
`;
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
`;
export default App;
