import React, { Component } from "react";
import Select from "react-select";
import places from "../../assets/data/places.json";
import style from "./CalculatorPage.module.css";
import ports from "../../assets/data/portDeparture.json";

class CalculatorPage extends Component {
  state = {
    arrayOfDepartures: [],
    departurePlaceForSelect: "",
    departurePlace: "",
    arrayOfPorts: [],
    departurePorts: []
  };

  componentDidMount() {
    this.departureParse();
  }

  departureParse = () => {
    // собираем список доступных локаций для react select
    const { Departures } = { ...places };
    const departuresArray = [];
    Departures.map(el => {
      const valToArr = {
        value: el.city,
        label: el.city
      };
      return departuresArray.push(valToArr);
    });
    this.setState({ arrayOfDepartures: departuresArray });
  };

  departurePortHandler = () => {
    this.setState({ arrayOfPorts: [] });
    const { departurePlaceForSelect } = this.state;
    const { Departures } = { ...places };
    const departPort = Departures.find(el => {
      return el.city === departurePlaceForSelect;
    });

    const entries = Object.entries(departPort);
    const { portsDepart } = { ...ports };
    entries.map(el => {
      if (el[0].length === 2 && el[1] !== null) {
        const portToState = portsDepart.filter(port => {
          return port.value === el[0];
        });

        this.setState(prevState => ({
          arrayOfPorts: [...prevState.arrayOfPorts, el],
          departurePorts: [...portToState]
        }));
      }
      return null;
    });
  };

  imgStateHelper = () => {};

  handleChange = e => {
    this.setState(
      {
        departurePlaceForSelect: e.value
      },
      () => {
        this.departurePortHandler();
      }
    );
  };

  render() {
    const { arrayOfDepartures, departurePorts } = this.state;
    return (
      <>
        <div className={style.deliveryContainer}>
          <div className={style.departWrapper}>
            <p className={style.span}>Оберіть місцезнаходження автомобіля </p>
            <br />
            <Select options={arrayOfDepartures} onChange={this.handleChange} />
          </div>
          {departurePorts.length > 0 ? (
            <p className={style.departurePort}>
              Порт відправки: {departurePorts[0].name}
            </p>
          ) : null}
          {/* <div className={style.departWrapper}>
            <p className={style.span}>Оберіть місцезнаходження автомобіля </p>
            <br />
            <Select options={arrayOfDepartures} onChange={this.handleChange} />
          </div> */}
          {/* <img src=/> */}
        </div>
      </>
    );
  }
}

export default CalculatorPage;
