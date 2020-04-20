import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./SearchCalc.module.css";
import { Departures } from "../../assets/data/places.json";
import { portsDepart } from "../../assets/data/portDeparture.json";

class SearchCalc extends Component {
  state = {
    selectedAuction: "",
    carPrice: "",
    deliverySea: "900",
    overlandDeliveryCost: "",
    totalDelivery: "",
    companyСommission: 900,
    aucComission: ""
  };

  componentDidMount() {
    this.deaprtureFinder();
  }

  deaprtureFinder = () => {
    const { car } = this.props;
    console.log(car);
    const arrayOfPlaces = Departures.filter(el => {
      return el.state.toLowerCase() === car.state.toLowerCase();
    });
    const departurePlace = arrayOfPlaces.find(el => {
      return el.city.toLowerCase() === car.city.toLowerCase();
    });
    const entries = Object.entries(departurePlace);
    let overlandDeliveryCost = "";
    entries.map(el => {
      //   console.log(el);
      if (el[0].length === 2 && el[1] !== null) {
        overlandDeliveryCost = el[1];
        const deaprturePort = portsDepart.filter(port => {
          return port.value === el[0];
        });
        console.log(deaprturePort);
        this.setState({
          deaprturePort: deaprturePort[0].name,
          overlandDeliveryCost
        });
      }
    });
  };

  render() {
    const {
      carPrice,
      deliverySea,
      overlandDeliveryCost,
      totalDelivery,
      companyСommission,
      aucComission,
      deaprturePort
    } = this.state;
    const { lotPrice } = this.props;
    return (
      <div className={style.container}>
        <h2 className={style.title}>Оплата після покупки</h2>
        <div className={style.aboutWrapper}>
          <span className={style.span}>
            Ціна лота:
            <span className={style.innerSpan}> {lotPrice}$</span>
          </span>

          <span className={style.span}>
            Комісія аукціону:
            <span className={style.innerSpan}>$</span>
          </span>

          <span className={style.span}>
            Доставка по США в порт {deaprturePort}
            <span className={style.innerSpan}>{overlandDeliveryCost}$</span>
          </span>

          <span className={style.span}>
            Ціна доставки морем:
            <span className={style.innerSpan}>$</span>
          </span>

          <span className={style.span}>
            Страховка:
            <span className={style.innerSpan}>$</span>
          </span>

          <span className={style.span}>
            Порт доставки:
            <span className={style.innerSpan}>Одеса</span>
          </span>

          <span className={style.span}>
            Срок доставки:
            <span className={style.innerSpan}>55 днів</span>
          </span>

          <span className={style.span}>
            Комісія компанії:
            <span className={style.innerSpan}>$</span>
          </span>

          <span className={style.totalDeliveryCostWrappe}>
            <span className={style.totalDeliveryCost}>
              Загальна сума до порту Одеса:
              <span className={style.innerSpan}> </span>
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default SearchCalc;
