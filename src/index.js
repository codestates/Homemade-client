import React from "react";
import ReactDOM from "react-dom";
import User from "./compoments/LoginForm";
import Nav from "./compoments/Nav";
import { Link } 

ReactDOM.render(
  <React.StrictMode>
    <User />
    <Nav />
  </React.StrictMode>,
  document.getElementById("root"),
);
