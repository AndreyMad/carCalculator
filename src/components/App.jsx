/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header/Header";
import Loader from "./Loader/Loader";
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
            component={routes.SEARCH_PAGE.component}
          />
          <Route
            path={routes.PARTS_PAGE.path}
            exact
            component={routes.PARTS_PAGE.component}
          />
          <Route
            path={routes.ABOUT_US_PAGE.path}
            exact
            component={routes.ABOUT_US_PAGE.component}
          />
          <Route
            path={routes.ANSWERS.path}
            exact
            component={routes.ANSWERS.component}
          />
          <Redirect to={routes.MAIN_PAGE.path} />
        </Switch>
      </>
    );
  }
}

export default App;
