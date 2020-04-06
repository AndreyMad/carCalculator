import React, { Component } from "react";
import PropTypes from "prop-types";
import ModalWindow from "./ModalWindow";
import style from "./ShowMore.module.css";

class ShowMoreBtn extends Component {
  state = {
    showModal: false
  };

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = e => {
    if (
      e.code === "Escape" ||
      e.target.className.includes("closeSvg") ||
      e.target.className.includes("overlay")
    ) {
      this.setState({ showModal: false });
    }
  };

  render() {
    const { showModal } = this.state;
    const { images } = this.props;
    return (
      <>
        <button
          className={style.showMoreBtn}
          type="button"
          onClick={this.openModal}
        >
          <span className={style.showMoreBtnText}> Всі фото</span>
        </button>
        {showModal ? (
          <ModalWindow images={images} closeModal={this.closeModal} />
        ) : null}
      </>
    );
  }
}

export default ShowMoreBtn;
