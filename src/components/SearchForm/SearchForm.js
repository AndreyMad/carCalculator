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
    lotNumber: "",
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
    const { lotNumber, lotPrice, selectedAuction } = this.state;
    if (!selectedAuction) {
      NotificationManager.warning(
        "Оберіть аукціон!",
        "Аукціон не обраний",
        3000
      );
      return;
    }
    if (lotNumber < 8) {
      NotificationManager.warning(
        "Не менш 8 символів",
        "Не вірний номер лота",
        3000
      );
      return;
    }
    if (selectedAuction === "iaai") {
      NotificationManager.warning(
        "На даний момент функціонал Iaai нажаль не доступний",
        "",
        3000
      );
      return;
    }
    formSubmit(lotNumber, selectedAuction, lotPrice);
  };

  handleRadioCheck = e => {
    this.setState({
      selectedAuction: e.target.value
    });
  };

  render() {
    const { lotNumber, selectedAuction, lotPrice } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className={style.form}>
          <div className={style.inputWrapper}>
            <input
              type="number"
              value={lotNumber}
              name="lotNumber"
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
