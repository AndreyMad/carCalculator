import React, { Component } from "react";
import Calculator from "../../components/Calculator/Calculator";
import Footer from "../../components/Footer/Footer";

class CalculatorPage extends Component {
  state = {
    isModalOpen: false
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }));
  };

  render() {
    return (
      <>
        <Calculator />

        <Footer />
      </>
    );
  }
}

export default CalculatorPage;
