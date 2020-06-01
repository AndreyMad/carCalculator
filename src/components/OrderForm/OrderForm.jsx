import React, { Component } from "react";
import style from "./OrderForm.module.css";

class OrderForm extends Component {
  state = {
    name: "",
    number: "",
    comment: ""
  };

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };

  render() {
    return (
      <div className={style.container}>
        <div className={style.shadow}>
          <h2 className={style.title}>Замов авто зараз та заощадь до 50%</h2>
          <form className={style.orderForm}>
            <input
              type="text"
              id="name"
              className={style.inputName}
              onChange={this.handleChange}
              placeholder="Ваше ім'я"
            />
            <input
              type="number"
              id="number"
              className={style.inputNumber}
              onChange={this.handleChange}
              placeholder="Ваш телефон"
            />
            <textarea
              type="text"
              id="comment"
              className={style.inputComment}
              onChange={this.handleChange}
              placeholder="Коментар"
            />
            <input
              type="button"
              value="Замовити авто"
              className={style.submitBtn}
            />
          </form>
          <p className={style.text}>
            *Залиште заявку і наші менеджери підберуть Вам пропозицію протяном
            30хв
          </p>
        </div>
      </div>
    );
  }
}

export default OrderForm;
