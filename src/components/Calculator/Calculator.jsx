import React, { Component } from "react";
import Select from "react-select";
import ports from "../../assets/data/portDeparture.json";
import places from "../../assets/data/places.json";
import { carTypes } from "../../assets/data/carTypes.json";
import style from "./Calculator.module.css";
import maps from "../../assets/img/map/index";
import containerImg from "../../assets/img/containers/index";

class Calculator extends Component {
  state = {
    arrayOfDepartures: [],
    departurePlaceForSelect: "",
    selectedPlace: {},
    arrayOfPorts: [],
    departurePorts: [],
    departurePort: "",
    imgdDeliverySrc: containerImg.defaultImg,
    carPrice: "",
    deliverySea: "900",
    overlandDeliveryCost: "",
    totalDelivery: ""
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
        label: `${el.city}  (${el.state})`,
        state: el.state
      };
      return departuresArray.push(valToArr);
    });
    const newDeparturesArray = departuresArray.sort((a, b) => {
      return a.value > b.value ? 1 : -1;
    });
    this.setState({ arrayOfDepartures: newDeparturesArray });
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

        this.setState(
          prevState => ({
            arrayOfPorts: [...prevState.arrayOfPorts, el],
            departurePorts: [...portToState],
            selectedPlace: { ...departPort }
          }),
          () => {
            this.overlandDeliveryCostHandler();
          }
        );
      }
      return null;
    });
  };

  overlandDeliveryCostHandler = () => {
    const { departurePorts, selectedPlace } = this.state;
    const price = selectedPlace[departurePorts[0].value];
    this.setState({ overlandDeliveryCost: price }, () => {
      this.totalDeliveryCalc();
    });
  };

  imgStateHelper = () => {
    const { selectedPlace } = this.state;
    if (selectedPlace.state && maps[selectedPlace.state.toLowerCase()]) {
      return maps[selectedPlace.state.toLowerCase()];
    }
    return maps.defaultMap;
  };

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

  seaDeliveryHandler = e => {
    const imgdDeliverySrc =
      e.value === 900
        ? containerImg.fourCarsContainer
        : containerImg.threeCarsComtainer;
    this.setState({ deliverySea: e.value, imgdDeliverySrc }, () => {
      this.totalDeliveryCalc();
    });
  };

  priceHandler = e => {
    this.setState({ carPrice: e.target.value }, () => this.totalDeliveryCalc());
  };

  totalDeliveryCalc = () => {
    const {
      totalDelivery,
      deliverySea,
      carPrice,
      overlandDeliveryCost
    } = this.state;
    this.setState({
      totalDelivery:
        Number(deliverySea) +
        Number(overlandDeliveryCost) +
        Number(carPrice) +
        Number(carPrice * 0.05) +
        Number(carPrice * 0.1)
    });
  };

  render() {
    const {
      arrayOfDepartures,
      departurePorts,
      carPrice,
      imgdDeliverySrc,
      selectedPlace,
      overlandDeliveryCost,
      deliverySea,
      totalDelivery
    } = this.state;
    return (
      <>
        <div className={style.deliveryContainer}>
          <div className={style.departWrapper}>
            <p className={style.span}>Оберіть місцезнаходження автомобіля: </p>
            <br />
            <Select options={arrayOfDepartures} onChange={this.handleChange} />
          </div>
          <img src={this.imgStateHelper()} className={style.mapImg} alt="map" />
          {/* {departurePorts.length > 0 ? (
            <p className={style.departurePort}>
              Порт відправки: {departurePorts[0].name}
            </p>
          ) : null} */}
          <div className={style.departWrapper}>
            <p className={style.span}>Тип автомобіля: </p>
            <br />
            <Select
              options={carTypes}
              placeholder="Оберіть тип авто"
              isSearchable={false}
              onChange={this.seaDeliveryHandler}
            />
            <img
              src={imgdDeliverySrc}
              className={style.delivImg}
              alt="container"
            />
            <label htmlFor="priceInput">
              Очікувана виграшна ставка $:
              <input
                id="priceInput"
                type="number"
                placeholder="Ціна"
                className={style.priceInput}
                onChange={this.priceHandler}
              />
            </label>
          </div>
        </div>
        <div className={style.priceContainer}>
          <div className={style.priceWrapper}>
            <span className={style.span}>
              Ціна лота:
              <span className={style.innerSpan}>{carPrice}</span>
            </span>
            <br />
            <span className={style.span}>
              Комісія аукціону:
              <span className={style.innerSpan}>{carPrice * 0.1}</span>
            </span>
            <br />
            {departurePorts[0] && departurePorts[0].name ? (
              <>
                <span className={style.span}>
                  Вартість доставки по США в порт {departurePorts[0].name}:
                  <span className={style.innerSpan}>
                    {overlandDeliveryCost}
                  </span>
                </span>
                <br />
              </>
            ) : null}

            <span className={style.span}>
              Ціна доставки морем:
              <span className={style.innerSpan}>{deliverySea}$</span>
            </span>
            <br />
            <span className={style.span}>
              Страховка:
              <span className={style.innerSpan}>{carPrice * 0.05}</span>
            </span>
            <br />
            <span className={style.span}>
              Порт доставки:
              <span className={style.innerSpan}>Одеса</span>
            </span>
            <br />
            <span className={style.span}>
              Срок доставки:
              <span className={style.innerSpan}>55днів</span>
            </span>
            <br />
            <span className={style.totalDeliveryCostWrappe}>
              <span className={style.totalDeliveryCost}>Загальна вартість</span>
              {totalDelivery}
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Calculator;
