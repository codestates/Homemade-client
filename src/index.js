import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import LoginForm from "./compoments/LoginForm";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <LoginForm />
  </React.StrictMode>,
  document.getElementById("root"),
);
