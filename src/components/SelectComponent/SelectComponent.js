import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

class SelectComponent extends Component {
  state = {
    isLoading: false
  };

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
  };

  render() {
    const options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" }
    ];
    const { placeholder, className } = this.props;
    const { isLoading } = this.state;

    return (
      <Select
        options={options}
        placeholder={placeholder}
        className={className}
        isLoading={isLoading}
      />
    );
  }
}

export default SelectComponent;
