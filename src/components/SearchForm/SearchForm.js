/* eslint-disable no-alert */
import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./SearchForm.module.css";

class SearchForm extends Component {
  state = {
    value: "",
    selectedAuction: ""
  };

  static propTypes = {
    formSubmit: PropTypes.func.isRequired
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { formSubmit } = this.props;
    const { value, selectedAuction } = this.state;
    if (!selectedAuction) {
      alert("Выберите аукцион");
      return;
    }
    if (selectedAuction === "Iaai") {
      alert("Я ж казав з Iaai поки не працює)))");
      return;
    }
    formSubmit(value, selectedAuction);
  };

  handleRadioCheck = e => {
    this.setState({
      selectedAuction: e.target.value
    });
  };

  render() {
    const { value, selectedAuction } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className={style.form}>
          <div className={style.inputWrapper}>
            <input
              type="number"
              value={value}
              className={style.input}
              placeholder="Введіть номер лота"
              onChange={this.handleChange}
            />
            <input type="submit" className={style.submitBtn} value="Пошук" />
          </div>

          <div className={style.checkboxWrapper}>
            <label htmlFor="CopartBtn">
              <input
                type="radio"
                id="CopartBtn"
                checked={selectedAuction === "Copart"}
                value="Copart"
                name="auctionRadio"
                onChange={this.handleRadioCheck}
              />
              Copart
            </label>
            <label htmlFor="IaaiBtn">
              <input
                type="radio"
                value="Iaai"
                id="IaaiBtn"
                name="auctionRadio"
                checked={selectedAuction === "Iaai"}
                onChange={this.handleRadioCheck}
              />
              Iaai
            </label>
          </div>
        </form>
      </>
    );
  }
}

export default SearchForm;
