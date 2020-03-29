import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchForm extends Component {
  state = {
    value: ""
  };

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
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
      <form onSubmit={this.handleSubmit}>
        <input type="number" value={value} onChange={this.handleChange} />
        <input type="submit" value="Поиск" />
      </form>
    );
  }
}

export default SearchForm;
