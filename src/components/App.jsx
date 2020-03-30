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
    car: {
      currentBid: 150,
      buyNow: 0,
      lot: 27397319,
      aucDate: 1586786400000,
      vin: "1FADP5BU1DL******",
      name: "2013 FORD C-MAX SEL",
      year: 2013,
      city: "CHINA GROVE",
      state: "NC",
      seller: "",
      fuel: "HYBRID ENGINE",
      engine: "2.0L  4",
      highlights: "ENHANCED VEHICLES",
      images: [
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX133/7d8dea75-5a0e-4474-92d1-e52ee475d4ae.JPG",
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX133/31a8864a-013f-4966-b685-55d595725d3d.JPG",
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX133/e88ba6b5-715d-4785-a9a9-225623b309eb.JPG",
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX133/97545d16-9d6d-4c37-b128-3f51cdee9429.JPG",
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX133/dea60dcd-ec33-47c7-a947-bc0c8ac26b3c.JPG",
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX133/37193951-dac5-4d86-be1b-13fe6f093d9a.JPG",
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX133/4b9c4c9d-955d-46d7-9aea-d6c09d5413a8.JPG",
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX133/76a8ed27-cf0c-4b14-97e9-6a46f27b277c.JPG",
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX133/ad985ded-8dca-4a0b-a7dd-0a248002244c.JPG",
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX133/ef1423d2-0fdf-4958-ab31-28bc29ff8942.JPG"
      ],
      odo: 0,
      capacity: 2,
      doc: "NC - SALVAGE CERTIFICATE OF TITLE"
    },
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
