import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import style from "./CallBack.module.css";
import CallBackModal from "./CallBackModal";
import fade from "../../transitions/fade.module.css";
import slideTop from "../../transitions/slideTop.module.css";

class CallBackBtn extends Component {
  state = {
    isModalOpen: false
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }));
  };

  render() {
    const { isModalOpen } = this.state;
    return (
      <>
        <button
          id="callBackButton"
          className={style.CallBackButton}
          type="button"
          onClick={this.toggleModal}
        >
          Замовити консультацію
        </button>
        <CSSTransition
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

        <CSSTransition
          in={isModalOpen}
          unmountOnExit
          timeout={400}
          classNames={fade}
        >
          <div className={style.shadow} />
        </CSSTransition>
      </>
    );
  }
}

export default CallBackBtn;