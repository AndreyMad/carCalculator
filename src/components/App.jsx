/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import levenshtein from "fast-levenshtein";
import { Switch, Route, Redirect } from "react-router-dom";
import style from "./App.module.css";
import pop from "../transitions/pop.module.css";
import fade from "../transitions/fade.module.css";
import * as selector from "../redux/Phonebook/selectors";
import * as action from "../redux/Phonebook/actions";
import CarInfo from "./Carinfo/CarInfo";
import Header from "./Header/Header";
import * as API from "../api/api";
import Loader from "./Loader/Loader";
import SearchForm from "./SearchForm/SearchForm";
import ErrorNotif from "./ErrorNotif/ErrorNotif";
import makes from "../assets/data/makes.json";
import routes from "../routes/routes";
import Navigation from "../pages/Navigation/Navigation";

class App extends Component {
  state = {};

  render() {
    const { car, isLoading, averagePrice, error } = this.state;
    return (
      <>
        {isLoading ? <Loader /> : null}
        <Header />
        <Navigation />
        <Switch>
          <Route
            path={routes.MAIN_PAGE.path}
            exact
            component={routes.MAIN_PAGE.component}
          />
          <Route
            path={routes.CALCULATOR_PAGE.path}
            exact
            component={routes.CALCULATOR_PAGE.component}
          />
          <Route
            path={routes.SEARCH_PAGE.path}
            exact
            component={routes.SEARCH_PAGE.component}
          />
          <Route
            path={routes.PARTS_PAGE.path}
            exact
            component={routes.PARTS_PAGE.component}
          />
          <Redirect to={routes.MAIN_PAGE.path} />
        </Switch>
      </>
    );
  }
}

export default App;
