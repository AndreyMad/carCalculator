/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import style from "./CustomCalc.module.css";
import engines from "../../assets/data/engines.json";
import { carYear } from "../../assets/data/carYear.json";
import heightTransition from "../../transitions/height.module.css";
import widthTransition from "../../transitions/width.module.css";
import CallBackBtn from "../CallBack/CallBackBtn";

class CustomCalc extends Component {
  state = {
    portExpedition: 450,
    brokerPrice: 400,
    esv: "",
    evacution: 250,
    certification: 200,
    accounting: 40,
    engineType: "",
    engineToSelect: {},
    yearsToSelect: [],
    carYear: "",
    engineVolume: "",
    importDuty: "",
    exise: "",
    nds: "",
    totalDelivery: ""
  };

  static propTypes = {
    carPrice: PropTypes.string.isRequired,
    aucComission: PropTypes.string.isRequired,
    totalDelivery: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.totalCustomCalc();
    if (engines && carYear) {
      const engineToSelect = [
        ...engines.engines.map(el => {
          return {
            value: el,
            label: el
          };
        })
      ];
      const yearsToSelect = [
        ...carYear.map(el => {
          return {
            value: el,
            label: el
          };
        })
      ];
      this.setState({
        engineToSelect: [...engineToSelect],
        yearsToSelect: [...yearsToSelect]
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { carPrice, aucComission, totalDelivery } = this.props;
    if (this.props !== prevProps) {
      const totalCarPrice = Number(carPrice) + Number(aucComission);
      this.setState({
        importDuty: Math.round(totalCarPrice * 0.1),
        totalDelivery
      });
    }
  }

  handleRadioCheck = e => {
    this.setState(
      {
        engineType: e.target.value
      },
      () => {
        this.taxesCalc();
      }
    );
  };

  handleSelectChange = (e, { name }) => {
    this.setState({ [name]: e.value }, () => this.taxesCalc());
  };

  taxesCalc = () => {
    const { carPrice, aucComission } = this.props;
    const { engineType, carYear, importDuty, engineVolume } = this.state;
    if (carYear.length > 1 && engineVolume.length > 1) {
      let coeficient = 50;
      const ageOfCar = 2020 - Number(carYear);
      let exise = "";
      let totalCustomPrice = "";
      let nds = "";
      switch (engineType) {
        case "GAS":
          if (Number(engineVolume) > 3.5) {
            coeficient = 100;
          }
          exise = Math.round(
            Number(ageOfCar) * Number(engineVolume) * Number(coeficient)
          );
          totalCustomPrice =
            Number(carPrice) +
            Number(aucComission) +
            Number(exise) +
            Number(importDuty);
          nds = Math.round(totalCustomPrice * 0.2);
          break;
        case "DIESEL":
          if (Number(engineVolume) > 3.5) {
            coeficient = 150;
          } else coeficient = 75;
          exise = Math.round(
            Number(ageOfCar) * Number(engineVolume) * Number(coeficient)
          );
          totalCustomPrice =
            Number(carPrice) +
            Number(aucComission) +
            Number(exise) +
            Number(importDuty);
          nds = Math.round(totalCustomPrice * 0.2);
          break;
        case "HYBRID ENGINE":
          exise = 100;
          totalCustomPrice =
            Number(carPrice) +
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
      this.setState({ nds, exise, importDuty, esv });
    }
  };

  totalCustomCalc = () => {
    const {
      portExpedition,
      brokerPrice,
      inTax,
      pdv,
      esv,
      evacution,
      certification,
      accounting
    } = this.state;
    // eslint-disable-next-line no-unused-vars
    const totalCustom =
      Number(portExpedition) +
      Number(brokerPrice) +
      Number(inTax) +
      Number(pdv) +
      Number(esv) +
      Number(evacution) +
      Number(certification) +
      Number(accounting);
  };

  render() {
    const {
      portExpedition,
      brokerPrice,
      esv,
      evacution,
      certification,
      accounting,
      exise,
      importDuty,
      nds,
      engineType,
      yearsToSelect,
      engineToSelect,
      totalDelivery
    } = this.state;
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
    const totalCarPrice = Number(totalCustom) + Number(totalDelivery);

    const selectStyles = {
      control: base => ({
        ...base,

        fontSize: "13px;"
      }),
      menu: base => ({
        ...base,
        fontSize: "13px;"
      })
    };
    return (
      <>
        <div className={style.customContainer}>
          <div className={style.shadow}>
            <h2 className={style.customTitle}>Калькулятор розмитнення</h2>

            <div className={style.engineTypeRadioWrapper}>
              <label htmlFor="BenzineRadio">
                <input
                  type="radio"
                  className={style.styledCheckBox}
                  id="BenzineRadio"
                  checked={engineType === "GAS"}
                  value="GAS"
                  name="engTypeRadio"
                  onChange={this.handleRadioCheck}
                />
                <span className={style.checkmark}>Бензин</span>
              </label>
              <label htmlFor="DieselRadio">
                <input
                  type="radio"
                  id="DieselRadio"
                  checked={engineType === "DIESEL"}
                  value="DIESEL"
                  name="engTypeRadio"
                  onChange={this.handleRadioCheck}
                />
                <span className={style.checkmark}>Дизель</span>
              </label>
              <label htmlFor="ElectroRadio">
                <input
                  type="radio"
                  id="ElectroRadio"
                  checked={engineType === "ELECTRIC"}
                  value="ELECTRIC"
                  name="engTypeRadio"
                  onChange={this.handleRadioCheck}
                />
                <span className={style.checkmark}>Електро</span>
              </label>
              <label htmlFor="HybridRadio">
                <input
                  type="radio"
                  id="HybridRadio"
                  checked={engineType === "HYBRID ENGINE"}
                  value="HYBRID ENGINE"
                  name="engTypeRadio"
                  onChange={this.handleRadioCheck}
                />
                <span className={style.checkmark}>Гібрид</span>
              </label>
            </div>
            {engineType.length > 1 ? null : <div className={style.pseudo} />}
            <CSSTransition
              in={engineType.length > 1}
              unmountOnExit
              timeout={300}
              classNames={heightTransition}
            >
              <div className={style.selectWrapper}>
                <CSSTransition
                  in={engineType !== "ELECTRIC"}
                  unmountOnExit
                  timeout={300}
                  classNames={widthTransition}
                >
                  <Select
                    className={style.selectEngine}
                    isSearchable={false}
                    styles={selectStyles}
                    placeholder="Обєм двигуна"
                    options={engineToSelect}
                    defaultValue={engineToSelect[15]}
                    id="engine"
                    name="engineVolume"
                    onChange={this.handleSelectChange}
                  />
                </CSSTransition>
                <Select
                  isSearchable={false}
                  className={style.carYear}
                  styles={selectStyles}
                  placeholder="Рік випуску авто"
                  options={yearsToSelect}
                  id="carYear"
                  name="carYear"
                  onChange={this.handleSelectChange}
                />
              </div>
            </CSSTransition>

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
              ЄСВ:<span className={style.innerSpan}>{esv}$</span>
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
            <span className={style.totalCustomCost}>
              Загальна вартість авто:
              <span className={style.innerSpan}> {totalCarPrice}$</span>
            </span>
            <CallBackBtn styles={{ margin: "40px auto" }} />
          </div>
        </div>
      </>
    );
  }
}

export default CustomCalc;
