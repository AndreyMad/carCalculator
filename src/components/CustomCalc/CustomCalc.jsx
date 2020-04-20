/* eslint-disable react/no-did-update-set-state */
import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import style from "./CustomCalc.module.css";
import engines from "../../assets/data/engines.json";
import { carYear } from "../../assets/data/carYear.json";

class CustomCalc extends Component {
  state = {
    portExpedition: 450,
    brokerPrice: 400,
    esv: "",
    evacution: 250,
    certification: 200,
    accounting: 120,
    totalCustom: "",
    engineType: "",
    engineToSelect: {},
    yearsToSelect: [],
    carYear: "",
    engineVolume: "",
    importDuty: "",
    exise: "",
    nds: ""
  };

  static propTypes = {
    carPrice: PropTypes.string.isRequired
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
    const { carPrice, aucComission } = this.props;
    if (this.props !== prevProps) {
      const totalCarPrice = Number(carPrice) + Number(aucComission);
      this.setState({ importDuty: Math.round(totalCarPrice * 0.1) });
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
        case "Benzine":
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
        case "Diesel":
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
        case "Hybrid":
          exise = 100;
          totalCustomPrice =
            Number(carPrice) +
            Number(aucComission) +
            Number(exise) +
            Number(importDuty);
          nds = Math.round(totalCustomPrice * 0.2);
          break;
        case "Electro":
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

    const totalCustom =
      Number(portExpedition) +
      Number(brokerPrice) +
      Number(inTax) +
      Number(pdv) +
      Number(esv) +
      Number(evacution) +
      Number(certification) +
      Number(accounting);
    this.setState({ totalCustom });
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
      engineToSelect
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
    return (
      <>
        <div className={style.customContainer}>
          <h2 className={style.customTitle}>Калькулятор розмитнення</h2>
          <div className={style.engineTypeRadioWrapper}>
            <label htmlFor="BenzineRadio">
              <input
                type="radio"
                id="BenzineRadio"
                checked={engineType === "Benzine"}
                value="Benzine"
                name="engTypeRadio"
                onChange={this.handleRadioCheck}
              />
              Бензин
            </label>
            <label htmlFor="DieselRadio">
              <input
                type="radio"
                id="DieselRadio"
                checked={engineType === "Diesel"}
                value="Diesel"
                name="engTypeRadio"
                onChange={this.handleRadioCheck}
              />
              Дизель
            </label>
            <label htmlFor="ElectroRadio">
              <input
                type="radio"
                id="ElectroRadio"
                checked={engineType === "Electro"}
                value="Electro"
                name="engTypeRadio"
                onChange={this.handleRadioCheck}
              />
              Електро
            </label>
            <label htmlFor="HybridRadio">
              <input
                type="radio"
                id="HybridRadio"
                checked={engineType === "Hybrid"}
                value="Hybrid"
                name="engTypeRadio"
                onChange={this.handleRadioCheck}
              />
              Гібрид
            </label>
          </div>
          <div className={style.selectWrapper}>
            <Select
              className={style.selectEngine}
              placeholder="Обєм двигуна"
              options={engineToSelect}
              id="engine"
              name="engineVolume"
              onChange={this.handleSelectChange}
            />

            <Select
              className={style.carYear}
              placeholder="Рік випуску авто"
              options={yearsToSelect}
              id="carYear"
              name="carYear"
              onChange={this.handleSelectChange}
            />
          </div>

          <span className={style.span}>
            Експедиція в порту:
            <span className={style.innerSpan}>{portExpedition}$</span>
          </span>
          <br />
          <span className={style.span}>
            Брокер:<span className={style.innerSpan}>{brokerPrice}$</span>
          </span>
          <br />
          <span className={style.span}>
            Ввізне мито:
            <span className={style.innerSpan}>{importDuty}$</span>
          </span>
          <br />
          <span className={style.span}>
            Акцизний збір:<span className={style.innerSpan}>{exise}$</span>
          </span>
          <br />
          <span className={style.span}>
            ПДВ:<span className={style.innerSpan}>{nds}$</span>
          </span>
          <br />
          <span className={style.span}>
            ЄСВ:<span className={style.innerSpan}>{esv}$</span>
          </span>
          <br />
          <span className={style.span}>
            Евакуатор до адреси клієнта:
            <span className={style.innerSpan}>{evacution}$</span>
          </span>
          <br />
          <span className={style.span}>
            Сертифікація:
            <span className={style.innerSpan}>{certification}$</span>
          </span>
          <br />
          <span className={style.span}>
            Постановка на облік:
            <span className={style.innerSpan}>{accounting}$</span>
          </span>
          <span className={style.totalCustomCost}>
            Сума платежів в Україні:
            <span className={style.innerSpan}> {totalCustom}$</span>
          </span>
        </div>
      </>
    );
  }
}

export default CustomCalc;
