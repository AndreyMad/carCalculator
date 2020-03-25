import React, { Component } from "react";
import style from "./DeliveryCalc.module.css";
import SelectComponent from "../SelectComponent/SelectComponent";

class DeliveryCalc extends Component {
  state = {
    some: ""
  };

  render() {
    const { some } = this.state;
    return (
      <div className={style.container}>
        <div className={style.outWrapper}>
          <h2 className={style.title}>Стоимисть доставки </h2>
          <div className={style.wrapperPortSelector}>
            <p className={style.text}>Порт отправки: ${some}</p>
            <SelectComponent
              className={style.portSelector}
              placeholder="Порт отправки"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DeliveryCalc;
