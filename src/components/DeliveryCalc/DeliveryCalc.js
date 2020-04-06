import React, { Component } from "react";
import levenstein from "fast-levenshtein";
import style from "./DeliveryCalc.module.css";
import SelectComponent from "../SelectComponent/SelectComponent";
import * as API from "../../api/api";

class DeliveryCalc extends Component {
  state = {
    options: []
  };

  componentDidMount() {
    const data = [];
    API.getCarsMakes()
      .then(res =>
        res.data.forEach(element => {
          const el = {
            value: element,
            label: element
          };
          return data.push(el);
        })
      )
      .then(this.setState({ options: data }));
    console.log(levenstein.get("car", "car"));
    // console.log(this.state.options);
  }

  render() {
    const { some, options } = this.state;
    return (
      <div className={style.container}>
        <div className={style.outWrapper}>
          <h2 className={style.title}>Стоимисть доставки </h2>
          <div className={style.wrapperPortSelector}>
            <p className={style.text}>Порт отправки: ${some}</p>
            <SelectComponent
              className={style.portSelector}
              placeholder="Порт отправки"
              options={options}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DeliveryCalc;
