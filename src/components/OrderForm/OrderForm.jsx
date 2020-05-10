import React, { Component } from "react";
import style from "./OrderForm.module.css";

class OrderForm extends Component {
  state = {
    name: "",
    form: "",
    comment: ""
  };
  // handleChange(e)=>{

  // }
  render() {
    return (
      <div className={style.container}>
        <div className={style.shadow}>
          <h2 className={style.title}>Замов авто зараз та заощадь до 50%</h2>
          <form className={style.orderForm}>
            <input
              type="text"
              className={style.inputName}
              placeholder="Ваше ім'я"
            />
            <input
              type="number"
              className={style.inputNumber}
              placeholder="Ваш телефон"
            />
            <input
              type="text"
              className={style.inputComment}
              placeholder="Коментар"
            />
            <input
              type="button"
              value="Замовити авто"
              className={style.submitBtn}
            />
          </form>
          <p className={style.text}>
            Залиште заявку і наші менеджери підберуть Вам пропозицію протяном
            30хв
          </p>
        </div>
      </div>
    );
  }
}

export default OrderForm;
