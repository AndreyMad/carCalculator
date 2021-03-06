import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import style from "./OrderForm.module.css";
import "react-notifications/lib/notifications.css";
import * as API from "../../api/api";
import Loader from "../Loader/Loader";

class OrderForm extends Component {
  state = {
    name: "",
    phone: "",
    comment: "",
    isLoading: false
  };

  static propTypes = {
    title: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    title: "",
    value: ""
  };

  abortLoading = () => {
    this.setState({
      isLoading: false
    });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };

  submitForm = e => {
    e.preventDefault();

    const { name, phone, comment } = this.state;
    if (name.length < 3 || phone.length < 7) {
      NotificationManager.error(
        "Не коректне ім'я або номер телефону!",
        "Помилка",
        3000
      );
      return;
    }
    this.setState({ isLoading: true });

    API.sendMessageTelegram(
      `Імя: ${name}, Телефон: ${phone}, Коментар: ${comment}`
    )
      .then(res => {
        return res.data.ok ? (
          (NotificationManager.success(
            "Дякуюмо за звернення, ми зв'яжемось з Вами найближчим часом.",
            "Успішно"
          ),
          this.setState({ isLoading: false, name: "", phone: "", comment: "" }))
        ) : (
          <span>Щось пішло не так. Спробуйте ще раз</span>
        );
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  render() {
    const { title, value } = this.props;
    const { name, phone, comment, isLoading } = this.state;
    return (
      <>
        {isLoading && <Loader abortLoading={this.abortLoading} />}
        <div className={style.container}>
          <div className={style.shadow}>
            <h2 className={style.title}>
              {title || "Замов авто зараз та заощадь до 50%"}
            </h2>

            <form className={style.orderForm}>
              <input
                type="text"
                id="name"
                className={style.inputName}
                onChange={this.handleChange}
                value={name}
                placeholder="Ваше ім'я*"
              />
              <input
                type="number"
                id="phone"
                className={style.inputNumber}
                onChange={this.handleChange}
                value={phone}
                placeholder="Ваш телефон*"
              />
              <textarea
                type="text"
                id="comment"
                value={comment}
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
      </>
    );
  }
}

export default OrderForm;
