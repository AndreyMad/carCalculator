import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import * as API from "../../api/api";
import Loader from "../Loader/Loader";
import style from "./CallBack.module.css";
import "react-notifications/lib/notifications.css";

class CallBackModal extends Component {
  state = {
    name: "",
    phone: "",
    comment: "",
    isLoading: false
  };

  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    carText: PropTypes.string
  };

  static defaultProps = {
    carText: ""
  };

  componentDidMount() {
    const { carText } = this.props;
    this.setState({ comment: carText });
    document.body.style = " overflow: hidden ";
  }

  componentWillUnmount() {
    document.body.style = "";
  }

  abortLoading = () => {
    this.setState({
      isLoading: false
    });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };

  formSubmit = e => {
    e.preventDefault();
    const { toggleModal } = this.props;
    const { name, phone, comment } = this.state;
    if (name.length < 3) {
      NotificationManager.error(
        "Не коректне ім'я! Mінімум 3 символи ",
        "Помилка",
        3000
      );
      return;
    }
    if (phone.length < 7) {
      NotificationManager.error(
        "Не коректний номер телефону!",
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
          this.setState(
            { isLoading: false, name: "", phone: "", comment: "" },
            () => toggleModal()
          ))
        ) : (
          <span>Щось пішло не так. Спробуйте ще раз</span>
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { name, phone, comment, isLoading } = this.state;
    const { toggleModal, carText } = this.props;
    return (
      <>
        {isLoading && <Loader abortLoading={this.abortLoading} />}
        <div className={style.overlay}>
          <div className={style.container}>
            <h3 className={style.title}>
              Залиште Ваші контактні дані і наш менеджер звяжеться з вами
              протягом 30хв
            </h3>
            <div className={style.formWrappe}>
              <form onSubmit={this.formSubmit}>
                <label htmlFor="phoneNumber">
                  Номер телефону:*
                  <input
                    type="number"
                    id="phone"
                    className={style.input}
                    value={phone}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="nameInput">
                  Ваше імя:*
                  <input
                    type="text"
                    value={name}
                    className={style.input}
                    id="name"
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="comment">
                  Коментар:
                  <textarea
                    className={style.textArea}
                    value={carText || comment || ""}
                    id="comment"
                    onChange={this.handleChange}
                  />
                </label>
              </form>
              <button
                type="button"
                onClick={toggleModal}
                className={style.closeButton}
              />
            </div>
            <button
              className={style.CallBackSubmitButton}
              onClick={this.formSubmit}
              type="button"
            >
              Залишити заявку
            </button>
          </div>
          <NotificationContainer />
        </div>
      </>
    );
  }
}

export default CallBackModal;
