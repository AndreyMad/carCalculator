import React, { Component } from "react";
import Select from "react-select";
import ports from "../../assets/data/ports.json";
import style from "./CalculatorPage.module.css";
import * as maps from "../../assets/img/map/index";

class CalculatorPage extends Component {
  state = {
    arrayOfDepartures: [],
    departurePlace: "",
    arrayOfPorts: [],
    departurePort: ""
  };

  componentDidMount() {
    this.departureParse();
    console.log(maps);
  }

  departureParse = () => {
    const { Departures } = { ...ports };
    const departuresArray = [];
    Departures.map(el => {
      const valToArr = {
        value: el.city,
        label: el.city
        //   state: el[1]
      };
      return departuresArray.push(valToArr);
    });
    this.setState({ arrayOfDepartures: departuresArray });
  };

  search;

  imgStateHelper = () => {};

  handleChange = e => {
    this.setState({ departurePlace: e.value });
  };

  render() {
    const { arrayOfDepartures } = this.state;
    return (
      <>
        <div className={style.deliveryContainer}>
          <div className={style.departWrapper}>
            <p className={style.span}>Оберіть місцезнаходження автомобіля </p>
            <br />
            <Select options={arrayOfDepartures} onChange={this.handleChange} />
          </div>
          {/* <img src=/> */}
        </div>
      </>
    );
  }
}

export default CalculatorPage;
