import React, { Component } from "react";
import Select from "react-select";
import ports from "../../assets/data/ports.json";
import style from "./CalculatorPage.module.css";

class CalculatorPage extends Component {
  state = {
    arrayOfDepartures: []
  };

  componentDidMount() {
    this.departureParse();
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
    this.imgStateHelper();
  };

  imgStateHelper = departurePlace => {
    const { Departures } = { ...ports };
    Departures.find(el => {
      return el.city === departurePlace;
    });
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
          {/* <img src={departurePort.length>1?}/>  */}
        </div>
      </>
    );
  }
}

export default CalculatorPage;
