import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./CallBack.module.css";

class CallBackModal extends Component {
  state = {
    formValues: ""
  };

  static propTypes = {
    toggleModal: PropTypes.func.isRequired
  };

  render() {
    const { formValues } = this.state;
    const { toggleModal } = this.props;
    return (
      <>
        <div className={style.overlay}>
          <div className={style.container}>
            <form>
              <label htmlFor="phoneNumber">
                Номер телефону:
                <input type="number" id="pnoneNumber" value={formValues} />
              </label>
              <label htmlFor="nameInput">
                Ваше імя:
                <input type="text" id="nameInput" />
              </label>
              <label htmlFor="comment">
                <input type="textArea" id="comment" />
              </label>
            </form>
            <button type="button" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default CallBackModal;
