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

  componentDidMount() {
    document.body.style = " overflow: hidden ";
  }

  componentWillUnmount() {
    document.body.style = "";
  }

  formSubmit = e => {
    e.preventDefault();
    const { toggleModal } = this.props;
    toggleModal();
  };

  render() {
    const { formValues } = this.state;
    const { toggleModal } = this.props;
    return (
      <>
        <div className={style.overlay}>
          <div className={style.container}>
            <h3 className={style.title}>
              Залиште Ваші контактні дані і наш менеджер звяжеться з вами
              протягом 30хв
            </h3>
            <div className={style.formWrappe}>
              <form onSubmit={this.formSubmit}>
                <label htmlFor="phoneNumber">
                  Номер телефону:
                  <input
                    type="number"
                    className={style.input}
                    id="pnoneNumber"
                  />
                </label>
                <label htmlFor="nameInput">
                  Ваше імя:
                  <input
                    type="text"
                    value={formValues}
                    className={style.input}
                    id="nameInput"
                  />
                </label>
                <label htmlFor="comment">
                  Коментар:
                  <textarea className={style.textArea} id="comment" />
                </label>
              </form>
              <button
                type="button"
                onClick={toggleModal}
                className={style.closeButton}
              />
            </div>
            <button
              className={style.CallBackSubmitButton}
              onClick={this.formSubmit}
              type="button"
            >
              Залишити заявку
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default CallBackModal;
