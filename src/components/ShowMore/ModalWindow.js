import React, { Component } from "react";
import closeSvg from "../../assets/svg/close.svg";
import style from "./ShowMore.module.css";

class ModalWindow extends Component {
  componentDidMount() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    const { closeModal } = this.props;
    window.addEventListener("keydown", closeModal);
  }

  componentWillUnmount() {
    const { closeModal } = this.props;
    window.removeEventListener("keydown", closeModal);
  }

  render() {
    const { closeModal, images } = this.props;
    return (
      <div
        className={style.overlay}
        onClick={closeModal}
        onKeyDown={closeModal}
        role="presentation"
        style={{ height: document.body.offsetHeight + 200 }}
      >
        <div className={style.modalContainer}>
          <img
            src={closeSvg}
            alt="close svg"
            onClick={closeModal}
            onKeyDown={closeModal}
            className={style.closeSvg}
            role="presentation"
          />
          {images.map(el => (
            <img
              src={el}
              className={style.carImage}
              key={el}
              alt="presentation"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ModalWindow;
