import React, { Component } from "react";
import style from "./AuthModal.module.css";

class AuthModal extends Component {
  state = {
    registrationForm: false
  };

  render() {
    const { registrationForm } = this.state;
    return (
      <div className={style.containerShadow}>
        <div className={style.wrapper}>
          <button
            type="button"
            id="authButton"
            className={registrationForm ? "authButtonActive" : "authButton"}
          >
            Авторизація
          </button>
          <button
            type="button"
            id="authButton"
            className={registrationForm ? "authButton" : "authButtonActive"}
          >
            Реєстрація
          </button>
        </div>
      </div>
    );
  }
}

export default AuthModal;
