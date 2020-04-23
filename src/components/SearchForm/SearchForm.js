/* eslint-disable no-alert */
import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./SearchForm.module.css";

class SearchForm extends Component {
  state = {
    lotNumber: "",
    lotPrice: "",
    selectedAuction: "Copart"
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
      alert("Выберите аукцион");
      return;
    }
    if (selectedAuction === "Iaai") {
      alert("Я ж казав з Iaai поки не працює)))");
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

            <input type="submit" className={style.submitBtn} value="Пошук" />
          </div>
        </form>
      </>
    );
  }
}

export default SearchForm;
