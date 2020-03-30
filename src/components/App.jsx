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
import * as API from "../api/api";
import CarInfo from "./Carinfo/CarInfo";
import Header from "./Header/Header";
import DeliveryCalc from "./DeliveryCalc/DeliveryCalc";
import Loader from "./Loader/Loader";

class App extends Component {
  state = {
    car: {
      //   currentBid: 2225,
      //   buyNow: 0,
      //   lot: 27207555,
      //   aucDate: 1584952200000,
      //   vin: "3FA6P0H79HR******",
      //   name: "2017 FORD FUSION SE",
      //   year: 2017,
      //   state: "NC",
      //   city: "Concord",
      //   seller: "******",
      //   fuel: "Gasoline",
      //   engine: "2.5L I4 FI DOHC 16V NF4",
      //   doc: "CLEAR (North Carolina)",
      //   highlights: "",
      //   odo: "50,870 mi (Actual)",
      //   capacity: 2.5,
      //   image: [
      //     "https://anvis.iaai.com:443/resizer?imageKeys=27648872~SID~B746~S0~I1~RW2592~H1944~TH0&width=161&height=120",
      //     "https://anvis.iaai.com:443/resizer?imageKeys=27648872~SID~B746~S0~I2~RW2592~H1944~TH0&width=161&height=120",
      //     "https://anvis.iaai.com:443/resizer?imageKeys=27648872~SID~B746~S0~I3~RW2592~H1944~TH0&width=161&height=120",
      //     "https://anvis.iaai.com:443/resizer?imageKeys=27648872~SID~B746~S0~I4~RW2592~H1944~TH0&width=161&height=120",
      //     "https://anvis.iaai.com:443/resizer?imageKeys=27648872~SID~B746~S0~I5~RW2592~H1944~TH0&width=161&height=120",
      //     "https://anvis.iaai.com:443/resizer?imageKeys=27648872~SID~B746~S0~I6~RW2592~H1944~TH0&width=161&height=120",
      //     "https://anvis.iaai.com:443/resizer?imageKeys=27648872~SID~B746~S0~I7~RW1280~H960~TH0&width=161&height=120",
      //     "https://anvis.iaai.com:443/resizer?imageKeys=27648872~SID~B746~S0~I8~RW2592~H1944~TH0&width=161&height=120",
      //     "https://anvis.iaai.com:443/resizer?imageKeys=27648872~SID~B746~S0~I9~RW1280~H960~TH0&width=161&height=120",
      //     "https://anvis.iaai.com:443/resizer?imageKeys=27648872~SID~B746~S0~I10~RW2592~H1944~TH0&width=161&height=120",
      //     "https://anvis.iaai.com:443/resizer?imageKeys=27648872~SID~B746~S0~I11~RW1280~H960~TH0&width=161&height=120",
      //     "/dist/images/thumbnail-engine-video.jpg",
      //     "/dist/images/thumbnail-360.png"
      //   ],
      //   href:
      //     "https://www.iaai.com/VehicleDetails?itemid=35753951&RowNumber=0&similarVehicleItemId=&isNext=&loadRecent=true",
      //   runAndDrive: false,
      //   bodyStyle: "Sedan 4 Door"
      // },
      // cd: 176,
      // err: false,
      // excise: 284,
      // pf: 67,
      // price: 1000,
      // tax: 358,
      // vat: 444
    },
    isLoading: false
  };

  componentDidMount() {
    API.getLotInfo(23076329)
      // .then(this.setState({ isLoading: true }))
      .then(res => {
        console.log("start");
        // this.setState({ car: res.car });
        console.log(res);
        console.log("end");
      })
      .catch(err => console.log(err));
  }

  render() {
    const { car, isLoading } = this.state;
    return (
      <>
        {isLoading ? <Loader /> : null}
        <Header />
        {/* {car.lot ? <CarInfo car={car} /> : null} */}

        <DeliveryCalc />
      </>
    );
  }
}

export default App;
