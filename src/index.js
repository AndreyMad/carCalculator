/* eslint-disable import/extensions */
import React from "react";
import ReactDOM from "react-dom";
import "./main.module.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import App from "./components/App.jsx";
import "./assets/fonts/PlayfairDisplay/PlayfairDisplay-Regular.ttf";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
