/* eslint-disable react/no-did-update-set-state */
import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

class SelectComponent extends Component {
  state = {
    isLoading: false,
    options: []
  };

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  };

  componentDidUpdate(prevProps) {
    const { options } = this.props;
    if (prevProps.options !== options) {
      this.setState({ options });
    }
  }

  render() {
    const { placeholder, className } = this.props;
    const { isLoading, options } = this.state;

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
