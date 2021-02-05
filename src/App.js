import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Nav } from "./compoments/index";
import { Main, UserInfo, SubmitRecipe } from "./pages/index";

function App() {
  return (
    <Router>
      <Nav />
      <GlobalStyle />
      <Container className="App">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/userinfo">
            <UserInfo />
          </Route>
          <Route exact path="/postrecipe">
            <SubmitRecipe />
          </Route>
        </Switch>
      </Container>
    </Router>
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
  width: 80vw;
  margin: 0 auto;
`;

export default App;
