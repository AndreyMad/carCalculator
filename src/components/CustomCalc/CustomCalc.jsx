import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./CustomCalc.module.css";

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
    isDieselIngine: false
  };

  static propTypes = {
    carPrice: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.totalCustomCalc();
  }

  componentDidUpdate(prevProps) {
    const { carPrice } = this.props;
    const { isDieselIngine } = this.state;
    if (this.props !== prevProps) {
      const k = isDieselIngine ? 50 : 100;
      this.setState({ inTax: k * carPrice });
    }
  }

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
      excise
    } = this.state;

    return (
      <>
        <div className={style.customContainer}>
          <h2 className={style.customTitle}>Калькулятор розмитнення</h2>
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
