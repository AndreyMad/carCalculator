/* eslint-disable react/no-did-update-set-state */
import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import style from "./CustomCalc.module.css";
import engines from "../../assets/data/engines.json";

class CustomCalc extends Component {
  state = {
    portExpedition: 450,
    brokerPrice: 400,
    inTax: 1000,
    pdv: 400,
    esv: 200,
    evacution: 250,
    certification: 200,
    accounting: 120,
    totalCustom: "",
    engineType: "",
    engineToSelect: {}
    // engineVolume: ""
  };

  static propTypes = {
    carPrice: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.totalCustomCalc();
    if (engines) {
      const engineToSelect = [
        ...engines.engines.map(el => {
          return {
            value: el,
            label: el
          };
        })
      ];

      this.setState({ engineToSelect: [...engineToSelect] });
    }
  }

  componentDidUpdate(prevProps) {
    const { carPrice } = this.props;
    const { isDieselIngine } = this.state;
    if (this.props !== prevProps) {
      const k = isDieselIngine ? 50 : 100;
      this.setState({ inTax: k * carPrice });
    }
  }

  handleRadioCheck = e => {
    this.setState({
      engineType: e.target.value
    });
  };

  handleSelectChange = (e, { name }) => {
    this.setState({ [name]: e.value });
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
      inTax,
      pdv,
      esv,
      evacution,
      certification,
      accounting,
      totalCustom,
      excise,
      engineType,
      engineToSelect
    } = this.state;

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
            <span className={style.innerSpan}>{inTax}$</span>
          </span>
          <br />
          <span className={style.span}>
            Акцизний збір:<span className={style.innerSpan}>{excise}</span>
          </span>
          <br />
          <span className={style.span}>
            ПДВ:<span className={style.innerSpan}>{pdv}$</span>
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
