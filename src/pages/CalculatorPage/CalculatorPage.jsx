import React, { Component } from "react";
import Calculator from "../../components/Calculator/Calculator";

class CalculatorPage extends Component {
  state = {
    some: "asd"
  };

  render() {
    const { some } = this.state;
    return <>{some ? <Calculator /> : null}</>;
  }
}

export default CalculatorPage;
