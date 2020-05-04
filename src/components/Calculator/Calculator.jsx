/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
import React, { Component } from "react";
import Select from "react-select";
import ports from "../../assets/data/portDeparture.json";
import places from "../../assets/data/places.json";
import { carTypes } from "../../assets/data/carTypes.json";
import style from "./Calculator.module.css";
import maps from "../../assets/img/map/index";
import containerImg from "../../assets/img/containers/index";
import CustomCalc from "../CustomCalc/CustomCalc";
import prices from "../../assets/data/comissionPrice.json";

class Calculator extends Component {
  state = {
    selectedAuction: "",
    arrayOfDepartures: [],
    departurePlaceForSelect: "",
    selectedPlace: {},
    arrayOfPorts: [],
    departurePorts: [],
    imgdDeliverySrc: containerImg.defaultImg,
    carPrice: "",
    deliverySea: "900",
    overlandDeliveryCost: "",
    totalDelivery: "",
    companyСommission: 700,
    aucComission: "",
    insurance: "0"
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
  // componentDidUpdate(prevState) {
  //   if (prevState !== this.state) {
  //     this.totalDeliveryCalc();
  //   }
  // }

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
    this.setState(
      {
        carPrice: e.target.value,
        insurance: Math.round(Number(e.target.value * 0.04))
      },
      () => this.totalDeliveryCalc()
    );
  };

  comissionCalc = () => {
    const { carPrice, selectedAuction } = this.state;
    let aucComission = "";
    let bidFee = "";

    if (selectedAuction === "Copart") {
      const comissionArray = prices.CopartArray[0].comission;
      const bidFeeArray = prices.CopartArray[1].bidFee;
      const { gateFee } = prices.CopartArray[2];

      comissionArray.find(el => {
        if (el[0] > carPrice) {
          aucComission = el[1];
          return aucComission;
        }
        if (el[comissionArray.length < carPrice]) {
          aucComission = Math.round(Number(carPrice) * 0.01 + 450);
          return aucComission;
        }
      });
      bidFeeArray.find(el => {
        if (el[0] > carPrice) {
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
        if (el[0] > carPrice) {
          aucComission = el[1];
          return aucComission;
        }
        if (el[comissionArray.length < carPrice]) {
          aucComission = Math.round(Number(carPrice) * 0.01 + 450);
          return aucComission;
        }
      });
      bidFeeArray.find(el => {
        if (el[0] > carPrice) {
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

  totalDeliveryCalc = () => {
    const {
      deliverySea,
      carPrice,
      overlandDeliveryCost,
      companyСommission
    } = this.state;
    this.setState({
      totalDelivery: Math.round(
        Number(deliverySea) +
          Number(overlandDeliveryCost) +
          Number(carPrice) +
          Number(carPrice * 0.05) +
          Number(carPrice * 0.1) +
          companyСommission
      )
    });
    this.comissionCalc();
  };

  handleRadioCheck = e => {
    this.setState(
      {
        selectedAuction: e.target.value
      },
      () => this.comissionCalc()
    );
  };

  render() {
    const {
      arrayOfDepartures,
      departurePorts,
      carPrice,
      imgdDeliverySrc,
      overlandDeliveryCost,
      deliverySea,
      totalDelivery,
      companyСommission,
      selectedAuction,
      aucComission,
      insurance
    } = this.state;
    const selectStyles = {
      container: base => ({
        ...base,
        width: "100%",
        margin: "10px auto"
      }),
      control: base => ({
        ...base,
        fontFamily: '"Montserrat", sans-serif;'
      }),
      menu: base => ({
        ...base,
        fontFamily: '"Montserrat", sans-serif;'
      })
    };
    return (
      <>
        <div className={style.deliveryContainer}>
          <div className={style.departWrapper}>
            <p className={style.title}>
              Оберіть місцезнаходження автомобіля:*{" "}
            </p>
            <br />
            <Select
              styles={selectStyles}
              options={arrayOfDepartures}
              onChange={this.handleChange}
            />
            <img
              src={this.imgStateHelper()}
              className={style.mapImg}
              alt="map"
            />
            {/* {departurePorts.length > 0 ? (
            <p className={style.departurePort}>
              Порт відправки: {departurePorts[0].name}
            </p>
          ) : null} */}
          </div>

          <div className={style.departWrapper}>
            <p className={style.title}>Тип автомобіля:* </p>
            <br />
            <Select
              options={carTypes}
              styles={selectStyles}
              placeholder="Оберіть тип авто"
              isSearchable={false}
              onChange={this.seaDeliveryHandler}
            />
            <img
              src={imgdDeliverySrc}
              className={style.delivImg}
              alt="container"
            />
          </div>
          <br />
          <div className={style.departWrapper}>
            <label htmlFor="priceInput" className={style.title}>
              Очікувана виграшна ставка $:*
              <input
                id="priceInput"
                type="number"
                placeholder="Ціна"
                className={style.priceInput}
                onChange={this.priceHandler}
              />
            </label>
            <div className={style.checkboxWrapper}>
              <label htmlFor="CopartBtn">
                <input
                  type="radio"
                  id="CopartBtn"
                  checked={selectedAuction === "Copart"}
                  value="Copart"
                  name="auctionRadio"
                  onChange={this.handleRadioCheck}
                />
                Copart
              </label>
              <label htmlFor="IaaiBtn">
                <input
                  type="radio"
                  value="Iaai"
                  id="IaaiBtn"
                  name="auctionRadio"
                  checked={selectedAuction === "Iaai"}
                  onChange={this.handleRadioCheck}
                />
                Iaai
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
                <span className={style.innerSpan}>
                  {Math.round(aucComission)}$
                </span>
              </span>
              <br />

              <span className={style.span}>
                Вартість доставки по США в порт
                {departurePorts[0] && departurePorts[0].name
                  ? departurePorts[0].name
                  : null}
                :
                <span className={style.innerSpan}>
                  {departurePorts[0] && departurePorts[0].name
                    ? overlandDeliveryCost
                    : null}
                  $
                </span>
              </span>
              <br />

              <span className={style.span}>
                Ціна доставки морем:
                <span className={style.innerSpan}>{deliverySea}$</span>
              </span>
              <br />
              <span className={style.span}>
                Страховка:
                <span className={style.innerSpan}>{insurance}$</span>
              </span>
              <br />
              <span className={style.span}>
                Порт доставки:
                <span className={style.innerSpan}>Одеса</span>
              </span>
              <br />
              <span className={style.span}>
                Срок доставки:
                <span className={style.innerSpan}>55 днів</span>
              </span>
              <br />
              <span className={style.span}>
                Комісія компанії:
                <span className={style.innerSpan}>{companyСommission}$</span>
              </span>
              <br />
              <span className={style.totalDeliveryCostWrappe}>
                <span className={style.totalDeliveryCost}>
                  Загальна сума до порту Одеса:
                  <span className={style.innerSpan}> {totalDelivery}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <CustomCalc carPrice={carPrice} aucComission={aucComission} />
      </>
    );
  }
}

export default Calculator;
