import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import style from "./OrderForm.module.css";
import "react-notifications/lib/notifications.css";

class OrderForm extends Component {
  state = {
    name: "",
    phone: ""
  };

  static propTypes = {
    title: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    title: "",
    value: ""
  };

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };

  submitForm = e => {
    e.preventDefault();
    const { name, phone } = this.state;
    if (name.length < 3 || phone.length < 7) {
      NotificationManager.error(
        "Не коректне ім'я або номер телефону!",
        "Помилка",
        3000
      );
    }
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
              id="phone"
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
              type="submit"
              value={value || "Замовити авто"}
              className={style.submitBtn}
              onClick={this.submitForm}
            />
          </form>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default OrderForm;
