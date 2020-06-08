import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./OrderForm.module.css";

class OrderForm extends Component {
  state = {
    name: "",
    number: "",
    comment: ""
  };

  static propTypes = {
    title: PropTypes.string,
    value: PropTypes.string
  };

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };

  render() {
    const { title, value } = this.props;
    return (
      <div className={style.container}>
        <h2 className={style.title}>
          {title || "Замов авто зараз та заощадь до 50%"}
        </h2>
        <div className={style.shadow}>
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
              value={value || "Замовити авто"}
              className={style.submitBtn}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default OrderForm;
