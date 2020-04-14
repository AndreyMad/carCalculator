import React, { Component } from "react";
import Calculator from "../../components/Calculator/Calculator";
import Footer from "../../components/Footer/Footer";

class CalculatorPage extends Component {
  state = {
    some: "asd"
  };

  render() {
    const { some } = this.state;
    return (
      <>
        {some ? <Calculator /> : null}
        <Footer />
      </>
    );
  }
}

export default CalculatorPage;
