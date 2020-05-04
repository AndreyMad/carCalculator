/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./SearchCalc.module.css";
import { Departures } from "../../assets/data/places.json";
import { portsDepart } from "../../assets/data/portDeparture.json";
import prices from "../../assets/data/comissionPrice.json";

class SearchCalc extends Component {
  state = {
    selectedAuction: "",
    lotPrice: "0",
    deliverySea: "900",
    overlandDeliveryCost: "0",
    companyСommission: 900,
    aucComission: "0",
    insurance: "0",
    portExpedition: "450",
    brokerPrice: "400",
    evacution: "250",
    certification: "200",
    importDuty: "0",
    nds: "0",
    exise: "0",
    esv: "0",
    car: {},
    accounting: "45"
  };

  static propTypes = {
    selectedAuction: PropTypes.string,
    lotPrice: PropTypes.string,
    car: PropTypes.shape({
      state: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    selectedAuction: "",
    lotPrice: "",
    car: {}
  };

  componentDidMount() {
    const { selectedAuction, lotPrice, car } = this.props;
    this.setState(
      {
        selectedAuction,
        lotPrice,
        insurance: Math.round(Number(lotPrice * 0.04)),
        car: { ...car }
      },
      () => {
        this.deaprtureFinder();
        this.comissionCalc();
        this.taxesCalc();
      }
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { selectedAuction, lotPrice, car } = this.props;
      this.setState(
        {
          selectedAuction,
          lotPrice,
          insurance: Math.round(Number(lotPrice * 0.04)),
          car: { ...car }
        },
        () => {
          this.deaprtureFinder();
          this.comissionCalc();
          this.taxesCalc();
        }
      );
    }
  }

  deaprtureFinder = () => {
    const { car } = this.props;
    const arrayOfPlaces = Departures.filter(el => {
      return el.state.toLowerCase() === car.state.toLowerCase();
    });
    const departurePlace = arrayOfPlaces.find(el => {
      return el.city.toLowerCase() === car.city.toLowerCase();
    });
    const entries = Object.entries(departurePlace);
    let overlandDeliveryCost = "";
    entries.map(el => {
      if (el[0].length === 2 && el[1] !== null) {
        overlandDeliveryCost = el[1];
        const deaprturePort = portsDepart.filter(port => {
          return port.value === el[0];
        });
        this.setState({
          deaprturePort: deaprturePort[0].name,
          overlandDeliveryCost
        });
      }
    });
  };

  comissionCalc = () => {
    const { lotPrice, selectedAuction } = this.state;
    let aucComission = "";
    let bidFee = "";

    if (selectedAuction === "Copart") {
      const comissionArray = prices.CopartArray[0].comission;
      const bidFeeArray = prices.CopartArray[1].bidFee;
      const { gateFee } = prices.CopartArray[2];

      comissionArray.find(el => {
        if (el[0] > lotPrice) {
          aucComission = el[1];

          return aucComission;
        }
        if (el[comissionArray.length < lotPrice]) {
          aucComission = Math.round(Number(lotPrice) * 0.01 + 450);
          return aucComission;
        }
      });
      bidFeeArray.find(el => {
        if (el[0] > lotPrice) {
          bidFee = el[1];

          return bidFee;
        }
      });
      const totalAucComission =
        Number(bidFee) + Number(aucComission) + Number(gateFee);
      const totalCarPrice = Number(lotPrice) + Number(totalAucComission);

      // console.log(object);

      this.setState({
        aucComission: Math.round(
          Number(gateFee) + Number(bidFee) + Number(aucComission)
        ),
        importDuty: Math.round(totalCarPrice * 0.1)
      });
    }
    if (selectedAuction === "Iaai") {
      const comissionArray = prices.IaaiArray[0].comission;
      const bidFeeArray = prices.IaaiArray[1].bidFee;
      const { gateFee } = prices.IaaiArray[2];

      comissionArray.find(el => {
        if (el[0] > lotPrice) {
          aucComission = el[1];
          return aucComission;
        }
        if (el[comissionArray.length < lotPrice]) {
          aucComission = Math.round(Number(lotPrice) * 0.01 + 450);
          return aucComission;
        }
      });
      bidFeeArray.find(el => {
        if (el[0] > lotPrice) {
          bidFee = el[1];
          return bidFee;
        }
      });

      this.setState({
        aucComission: Math.round(
          Number(gateFee) + Number(bidFee) + Number(aucComission)
        )
      });
    }
  };

  taxesCalc = () => {
    const { lotPrice, aucComission, importDuty, car } = this.state;

    if (car.year > 1 && car.capacity > 0) {
      let coeficient = 50;
      const ageOfCar = 2020 - Number(car.year);
      let exise = "";
      let totalCustomPrice = "";
      let nds = "";

      switch (car.fuel) {
        case "GAS":
          if (Number(car.capacity) > 3.5) {
            coeficient = 100;
          }
          exise = Math.round(
            Number(ageOfCar) * Number(car.capacity) * Number(coeficient)
          );
          totalCustomPrice =
            Number(lotPrice) +
            Number(aucComission) +
            Number(exise) +
            Number(importDuty);
          nds = Math.round(totalCustomPrice * 0.2);
          break;
        case "DIESEL":
          if (Number(car.capacity) > 3.5) {
            coeficient = 150;
          } else coeficient = 75;
          exise = Math.round(
            Number(ageOfCar) * Number(car.capacity) * Number(coeficient)
          );
          totalCustomPrice =
            Number(lotPrice) +
            Number(aucComission) +
            Number(exise) +
            Number(importDuty);
          nds = Math.round(totalCustomPrice * 0.2);
          break;
        case "HYBRID ENGINE":
          exise = 100;
          totalCustomPrice =
            Number(lotPrice) +
            Number(aucComission) +
            Number(exise) +
            Number(importDuty);
          nds = Math.round(totalCustomPrice * 0.2);
          break;
        case "ELECTRIC":
          exise = 0;
          totalCustomPrice = 0;
          nds = 0;
          break;
        default:
          return coeficient;
      }

      const esv = Math.round(totalCustomPrice * 0.04);
      this.setState({ nds, exise, esv });
    }
  };

  render() {
    const {
      lotPrice,
      deliverySea,
      overlandDeliveryCost,
      companyСommission,
      aucComission,
      deaprturePort,
      insurance,
      portExpedition,
      brokerPrice,
      evacution,
      importDuty,
      exise,
      esv,
      nds,
      certification,
      accounting
    } = this.state;
    const totalDelivery =
      Number(lotPrice) +
      Number(deliverySea) +
      Number(aucComission) +
      Number(insurance) +
      Number(companyСommission) +
      Number(overlandDeliveryCost);
    const totalCustom =
      Number(portExpedition) +
      Number(brokerPrice) +
      Number(importDuty) +
      Number(exise) +
      Number(nds) +
      Number(esv) +
      Number(evacution) +
      Number(certification) +
      Number(accounting);

    const totalPrice = totalDelivery + totalCustom;

    return (
      <>
        <div className={style.container}>
          <h2 className={style.title}>Оплата після покупки</h2>
          <div className={style.deliveryWrapper}>
            <span className={style.span}>
              Ціна лота:
              <span className={style.innerSpan}> {lotPrice}$</span>
            </span>

            <span className={style.span}>
              Комісія аукціону:
              <span className={style.innerSpan}>{aucComission}$</span>
            </span>

            <span className={style.span}>
              Доставка по США в порт {deaprturePort}
              <span className={style.innerSpan}>{overlandDeliveryCost}$</span>
            </span>

            <span className={style.span}>
              Ціна доставки морем:
              <span className={style.innerSpan}>{deliverySea}$</span>
            </span>

            <span className={style.span}>
              Страховка:
              <span className={style.innerSpan}>{insurance}$</span>
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
              <span className={style.innerSpan}>{900}$</span>
            </span>

            <span className={style.totalDeliveryCostWrappe}>
              <span className={style.totalDeliveryCost}>
                Загальна сума до порту Одеса:
                <span className={style.innerSpan}>{totalDelivery}$ </span>
              </span>
            </span>
          </div>
        </div>

        <div className={style.container}>
          <h2 className={style.title}>Оплата по прибуттю</h2>
          <span className={style.span}>
            Експедиція в порту:
            <span className={style.innerSpan}>{portExpedition}$</span>
          </span>
          <span className={style.span}>
            Брокер:<span className={style.innerSpan}>{brokerPrice}$</span>
          </span>
          <span className={style.span}>
            Ввізне мито:
            <span className={style.innerSpan}>{importDuty}$</span>
          </span>
          <span className={style.span}>
            Акцизний збір:<span className={style.innerSpan}>{exise}$</span>
          </span>
          <span className={style.span}>
            ПДВ:<span className={style.innerSpan}>{nds}$</span>
          </span>
          <span className={style.span}>
            Пенсійний фонд:<span className={style.innerSpan}>{esv}$</span>
          </span>
          <span className={style.span}>
            Евакуатор до адреси клієнта:
            <span className={style.innerSpan}>{evacution}$</span>
          </span>
          <span className={style.span}>
            Сертифікація:
            <span className={style.innerSpan}>{certification}$</span>
          </span>
          <span className={style.span}>
            Постановка на облік:
            <span className={style.innerSpan}>{accounting}$</span>
          </span>
          <span className={style.totalCustomCost}>
            Сума платежів в Україні:
            <span className={style.innerSpan}> {totalCustom}$</span>
          </span>
          <span className={style.totalCost}>
            Загальна вартість:
            <span className={style.innerSpan}> {totalPrice}$</span>
          </span>
        </div>
      </>
    );
  }
}

export default SearchCalc;
