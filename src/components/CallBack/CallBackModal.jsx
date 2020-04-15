import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./CallBack.module.css";

class CallBackModal extends Component {
  state = {
    formValues: ""
  };

  componentDidMount() {}

  static propTypes = {
    toggleModal: PropTypes.func.isRequired
  };

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
          <h3 className={style.title}>
            Залиште Ваші контактні дані і наш менеджер звяжеться з вами протягом
            30хв
          </h3>
          <div className={style.container}>
            <form onSubmit={this.formSubmit}>
              <label htmlFor="phoneNumber">
                Номер телефону:
                <input type="number" className={style.input} id="pnoneNumber" />
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
            <button
              className={style.CallBackButton}
              onClick={this.formSubmit}
            />
          </div>
        </div>
      </>
    );
  }
}

export default CallBackModal;
