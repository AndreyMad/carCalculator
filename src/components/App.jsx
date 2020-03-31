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
import ErrorNotif from "./ErrorNotif/ErrorNotif";

class App extends Component {
  state = {
    car: {
      currentBid: 0,
      buyNow: 0,
      lot: 26098920,
      aucDate: 1587996000000,
      vin: "2FMDK39C57B******",
      name: "2007 FORD EDGE SEL PLUS",
      year: 2007,
      city: "SAVANNAH",
      state: "GA",
      seller: "State Farm Insurance",
      fuel: "GAS",
      engine: "3.5L  6",
      highlights: "ENGINE START PROGRAM",
      odo: 183964,
      capacity: 3.5,
      images: [
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX236/6d16dcf5-cd4c-4bf2-ba6e-e2f7f383b1e6.JPG"
      ],
      doc: "GA - CERT OF TITLE-SALVAGE"
    },
    averagePrice: 2124,
    isLoading: false,
    error: ""
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
    API.getCarByLot(value, selectedAuction)
      .then(res => {
        if (res.err) {
          this.setState({ error: res.resp, isLoading: false });
        } else if (res.car) {
          this.setState({ car: res.car, isLoading: false });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { car, isLoading, averagePrice, error } = this.state;
    return (
      <>
        {isLoading ? <Loader /> : null}
        <Header />
        {isLoading ? <Loader /> : null}
        <SearchForm formSubmit={this.formSubmit} />

        {car.images ? <CarInfo car={car} averagePrice={averagePrice} /> : null}

        {car.images ? <DeliveryCalc /> : null}
        {error ? <ErrorNotif error={error} /> : null}
      </>
    );
  }
}

export default App;
