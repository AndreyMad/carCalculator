import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./SearchForm.module.css";

class SearchForm extends Component {
  state = {
    value: ""
  };

  static propTypes = {
    formSubmit: PropTypes.func.isRequired
  };

  handleChange = e => {
    this.setState({ value: Number(e.target.value) });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { formSubmit } = this.props;
    const { value } = this.state;

    formSubmit(value);
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={style.form}>
        <input
          type="number"
          value={value}
          className={style.input}
          onChange={this.handleChange}
        />
        <input type="submit" className={style.submitBtn} value="Поиск" />
      </form>
    );
  }
}

export default SearchForm;
