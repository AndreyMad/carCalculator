import React, { Component } from "react";
import Calculator from "../../components/Calculator/Calculator";
import Footer from "../../components/Footer/Footer";
import CallBackBtn from "../../components/CallBack/CallBackBtn";
import moduleName from "../..";

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
        <CallBackBtn toggleModal={this.toggleModal} />
        {/* <CSSTransition
          in={isModalOpen}
          unmountOnExit
          timeout={400}
          classNames={slideTop}
        >
          <CallBackModal
            isModalOpen={isModalOpen}
            toggleModal={this.toggleModal}
          />
        </CSSTransition>
        <Footer /> */}
      </>
    );
  }
}

export default CalculatorPage;
