/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { Component } from "react";
import keyGenerator from "uuid/v1";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import style from "./App.module.css";
import pop from "../transitions/pop.module.css";
import fade from "../transitions/fade.module.css";
import WarningModal from "./WarningModal/WarningModal";
import * as selector from "../redux/Phonebook/selectors";
import * as action from "../redux/Phonebook/actions";
import CarInfo from "./Carinfo/CarInfo";
import Header from "./Header/Header";
import DeliveryCalc from "./DeliveryCalc/DeliveryCalc";
import * as API from "../api/api";
import Loader from "./Loader/Loader";
import SearchForm from "./SearchForm/SearchForm";

class App extends Component {
  state = {
    car: {},
    averagePrice: "",
    isLoading: false
  };

  componentDidMount() {
    // this.setState({ isLoading: true });
    // API.getCarByLot(26557900).then(res => {
    //   this.setState({ car: res.car, isLoading: false });
    // });
    this.getPrice();
  }

  getPrice = () => {
    return API.getAveragePrice("FORD", "C-MAX SEL", "2013").then(res => {
      this.setState({ averagePrice: res.data.price });
    });
  };

  formSubmit = (value, selectedAuction) => {
    this.setState({ isLoading: true });
    API.getCarByLot(value, selectedAuction).then(res => {
      this.setState({ car: res.car, isLoading: false });
    });
  };

  render() {
    const { car, isLoading, averagePrice } = this.state;
    return (
      <>
        {isLoading ? <Loader /> : null}
        <Header />
        {isLoading ? <Loader /> : null}
        <SearchForm formSubmit={this.formSubmit} />

        {car.images ? <CarInfo car={car} averagePrice={averagePrice} /> : null}

        {car.images ? <DeliveryCalc /> : null}
      </>
    );
  }
}

export default App;
