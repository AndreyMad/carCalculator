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
    insurance: "0"
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
    this.deaprtureFinder();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { selectedAuction, lotPrice } = this.props;
      this.setState(
        {
          selectedAuction,
          lotPrice,
          insurance: Math.round(Number(lotPrice * 0.04))
        },
        () => {
          this.deaprtureFinder();
          this.comissionCalc();
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
      this.setState({
        aucComission: Math.round(
          Number(gateFee) + Number(bidFee) + Number(aucComission)
        )
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

  render() {
    const {
      lotPrice,
      deliverySea,
      overlandDeliveryCost,

      companyСommission,
      aucComission,
      deaprturePort,
      insurance
    } = this.state;
    const totalDelivery =
      Number(lotPrice) +
      Number(deliverySea) +
      Number(aucComission) +
      Number(insurance) +
      Number(companyСommission) +
      Number(overlandDeliveryCost);

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

          <div className={style.customWrapper}>asdf</div>
        </div>
      </>
    );
  }
}

export default SearchCalc;
