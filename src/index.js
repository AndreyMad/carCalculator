/* eslint-disable import/extensions */
import React from "react";
import ReactDOM from "react-dom";
import "./main.module.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./components/App.jsx";
import "./assets/fonts/PlayfairDisplay/PlayfairDisplay-Regular.ttf";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
