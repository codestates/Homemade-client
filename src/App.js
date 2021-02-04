import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Nav from "./components/Nav";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Nav />
      <Switch />
    </Router>
  );
}

export default App;
