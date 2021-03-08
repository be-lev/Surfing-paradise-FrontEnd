import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "../src/Redux/store";
import Layout from "./Components/LayoutArea/Layout/Layout";
import { setAuthorizationToken } from "./Components/Autharea/Auth/auth";

// adding Interceptor JWT authorization
setAuthorizationToken(sessionStorage.jwtToken);

ReactDOM.render(
  //react-redux subscribe and other options
  <React.StrictMode>
    <Provider store={store}>
      <Layout />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
