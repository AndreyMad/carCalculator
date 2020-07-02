/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./SearchCalc.module.css";
import departures from "../../assets/data/places.json";
import prices from "../../assets/data/comissionPrice.json";

class SearchCalc extends Component {
  state = {
    selectedAuction: "",
    lotPrice: "0",
    deliverySea: "900",
    overlandDeliveryCost: "0",
    companyСommission: 900,
    deaprturePort: "",
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
    lotPrice: PropTypes.number,
    car: PropTypes.shape({
      location: PropTypes.string.isRequired,
      branchname: PropTypes.string
    })
  };

  static defaultProps = {
    selectedAuction: "",
    lotPrice: "1000",
    car: { branchname: "" }
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
    const city = car.location ? car.location.substr(5) : car.branchname;
    const departurePlace = departures.find(el => {
      return el.city.toLocaleLowerCase() === city.toLocaleLowerCase();
    });

    if (departurePlace) {
      const sortedDeparturePlaces = Object.values(departurePlace.land).sort(
        (a, b) => {
          return a.amount - b.amount;
        }
      );

      this.setState(
        {
          deaprturePort: sortedDeparturePlaces[0].name,
          overlandDeliveryCost: sortedDeparturePlaces[0].amount
        },

        () => {
          this.comissionCalc();
        }
      );
      return;
    }
    this.setState(
      {
        overlandDeliveryCost: 350
      },
      () => {
        this.comissionCalc();
      }
    );
  };

  comissionCalc = () => {
    const { lotPrice, selectedAuction } = this.state;
    let aucComission = "";
    let bidFee = "";
    if (selectedAuction === "copart") {
      const comissionArray = prices.CopartArray[0].comission;
      const bidFeeArray = prices.CopartArray[1].bidFee;
      const { gateFee } = prices.CopartArray[2];

      comissionArray.find((el, index) => {
        if (el[0] > Number(lotPrice)) {
          aucComission = el[1];
          return aucComission;
        }
        if (comissionArray.length - 1 === index && el[0] <= lotPrice) {
          aucComission = Math.round(Number(lotPrice) * 0.04);

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
      // console.log(bidFee);
      // console.log(aucComission);
      // console.log(gateFee);
      this.setState(
        {
          aucComission: Math.round(
            Number(gateFee) + Number(bidFee) + Number(aucComission)
          ),
          importDuty: Math.round(totalCarPrice * 0.1)
        },
        () => {
          this.taxesCalc();
        }
      );
    }

    if (selectedAuction === "iaai") {
      const comissionArray = prices.IaaiArray[0].comission;
      const bidFeeArray = prices.IaaiArray[1].bidFee;
      const { gateFee } = prices.IaaiArray[2];

      comissionArray.find((el, index) => {
        if (el[0] > Number(lotPrice)) {
          if (Number(lotPrice) > 7499 && Number(lotPrice) < 20000) {
            aucComission = el[1] + Number(lotPrice) * 0.01;
            return aucComission;
          }
          aucComission = el[1];
          return aucComission;
        }

        if (comissionArray.length - 1 === index && el[0] <= lotPrice) {
          aucComission = Math.round(Number(lotPrice) * 0.04);
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
      // console.log(bidFee);
      // console.log(aucComission);
      // console.log(gateFee);
      this.setState(
        {
          aucComission: Math.round(Number(totalAucComission)),
          importDuty: Math.round(totalCarPrice * 0.1)
        },
        () => {
          this.taxesCalc();
        }
      );
    }
  };

  taxesCalc = () => {
    const { lotPrice, aucComission, importDuty, car } = this.state;

    const carVol = car.vol || (car.engine && car.engine.slice(0, 3));

    if (car.year > 1 && carVol >= 0) {
      let coeficient = 50;
      const ageOfCar = 2020 - Number(car.year);
      let exise = "";
      let totalCustomPrice = "";
      let nds = "";

      switch (car.fuel) {
        case "GAS":
        case "Gasoline":
        case "FLEXIBLE FUEL":
          if (Number(carVol) > 3.5) {
            coeficient = 100;
          }
          exise = Math.round(
            Number(ageOfCar) * Number(carVol) * Number(coeficient)
          );
          totalCustomPrice =
            Number(lotPrice) +
            Number(aucComission) +
            Number(exise) +
            Number(importDuty);
          nds = Math.round(totalCustomPrice * 0.2);

          break;

        case "DIESEL":
          if (Number(carVol) > 3.5) {
            coeficient = 150;
          } else coeficient = 75;
          exise = Math.round(
            Number(ageOfCar) * Number(carVol) * Number(coeficient)
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
            /* */ Number(lotPrice) +
            Number(aucComission) +
            /* */ Number(exise) +
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
        <div className={style.outWrapper}>
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
                <span className={style.innerSpan}>
                  {overlandDeliveryCost === "0"
                    ? `Увага!!!0`
                    : overlandDeliveryCost}
                  $
                </span>
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
        </div>
      </>
    );
  }
}

export default SearchCalc;
