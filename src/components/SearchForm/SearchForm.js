/* eslint-disable no-alert */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import style from "./SearchForm.module.css";
import "react-notifications/lib/notifications.css";

class SearchForm extends Component {
  state = {
    formValue: "",
    lotPrice: "",
    selectedAuction: "copart"
  };

  static propTypes = {
    formSubmit: PropTypes.func.isRequired
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { formSubmit } = this.props;
    const { formValue, lotPrice, selectedAuction } = this.state;
    if (!selectedAuction) {
      NotificationManager.warning(
        "Оберіть аукціон!",
        "Аукціон не обраний",
        3000
      );
      return;
    }
    if (formValue.length < 8) {
      NotificationManager.warning(
        "Не менш 8 символів",
        "Не вірний номер лота",
        3000
      );
      return;
    }

    formSubmit(formValue, selectedAuction, lotPrice || 1000);
  };

  handleRadioCheck = e => {
    this.setState({
      selectedAuction: e.target.value
    });
  };

  render() {
    const { formValue, selectedAuction, lotPrice } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className={style.form}>
          <div className={style.inputWrapper}>
            <input
              type="text"
              value={formValue}
              name="formValue"
              className={style.input}
              placeholder="Номер лота"
              onChange={this.handleChange}
            />
            <input
              type="number"
              name="lotPrice"
              value={lotPrice}
              className={style.inputPrice}
              placeholder="Ціна купівлі"
              onChange={this.handleChange}
            />
            <div className={style.checkboxWrapper}>
              <label htmlFor="CopartBtn">
                <input
                  type="radio"
                  id="CopartBtn"
                  checked={selectedAuction === "copart"}
                  value="copart"
                  name="auctionRadio"
                  onChange={this.handleRadioCheck}
                />
                Copart
              </label>
              <label htmlFor="IaaiBtn">
                <input
                  type="radio"
                  value="iaai"
                  id="IaaiBtn"
                  name="auctionRadio"
                  checked={selectedAuction === "iaai"}
                  onChange={this.handleRadioCheck}
                />
                Iaai
              </label>
            </div>

            <input type="submit" className={style.submitBtn} value="Пошук" />
          </div>
        </form>
        <NotificationContainer />
      </>
    );
  }
}

export default SearchForm;
