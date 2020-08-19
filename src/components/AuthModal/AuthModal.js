import React, { Component } from "react";
import PropTypes from "prop-types";
// import * as EmailValidator from "email-validator";
import style from "./AuthModal.module.css";

class AuthModal extends Component {
  state = {
    registrationForm: false,
    authEmail: "",
    authPassword: "",
    regEmail: "",
    regPassword: "",
    regFirstName: "",
    regLastName: "",
    regPhone: ""
  };

  static propTypes = {
    authClose: PropTypes.func.isRequired,
    authorization: PropTypes.func.isRequired,
    registrationFormSubmit: PropTypes.func.isRequired
  };

  inputHandleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { authEmail, authPassword } = this.state;
    // if (EmailValidator.validate(authEmail)) {
    const { authorization } = this.props;
    authorization(authEmail, authPassword);
    // }
  };

  registrationFormHandleSubmit = e => {
    e.preventDefault();
    const {
      regEmail,
      regPassword,
      regFirstName,
      regLastName,
      regPhone
    } = this.state;
    const { registrationFormSubmit } = this.props;
    registrationFormSubmit(
      regEmail,
      regPassword,
      regFirstName,
      regLastName,
      regPhone
    );
  };

  render() {
    const { authClose } = this.props;
    const {
      registrationForm,
      authPassword,
      authLogin,
      regEmail,
      regPassword,
      regFirstName,
      regLastName,
      regPhone
    } = this.state;
    return (
      <div
        className={style.containerShadow}
        onClick={authClose}
        role="presentation"
      >
        <div className={style.wrapper}>
          <div className={style.buttonsWrapper}>
            <button
              type="button"
              id="authButton"
              className={
                registrationForm ? style.authButtonActive : style.authButton
              }
              onClick={() => this.setState({ registrationForm: false })}
            >
              Авторизація
            </button>
            <button
              type="button"
              id="authButton"
              className={
                registrationForm ? style.authButton : style.authButtonActive
              }
              onClick={() => this.setState({ registrationForm: true })}
            >
              Реєстрація
            </button>
          </div>
          {registrationForm ? (
            <form
              className={style.authForm}
              onSubmit={this.registrationFormHandleSubmit}
            >
              <input
                placeholder="Email"
                name="regEmail"
                type="text"
                value={regEmail}
                onChange={this.inputHandleChange}
              />
              <input
                placeholder="Імя"
                name="regFirstName"
                type="text"
                value={regFirstName}
                onChange={this.inputHandleChange}
              />
              <input
                placeholder="Прізвище"
                name="regLastName"
                type="text"
                value={regLastName}
                onChange={this.inputHandleChange}
              />
              <input
                placeholder="Пароль"
                name="regPassword"
                type="text"
                value={regPassword}
                onChange={this.inputHandleChange}
              />
              <input
                placeholder="+38"
                name="regPhone"
                type="text"
                value={regPhone}
                onChange={this.inputHandleChange}
              />
              <input type="submit" value="Реєстрація" />
            </form>
          ) : (
            <>
              <form className={style.authForm} onSubmit={this.handleSubmit}>
                <input
                  placeholder="Email"
                  name="authEmail"
                  type="text"
                  value={authLogin}
                  onChange={this.inputHandleChange}
                />
                <input
                  placeholder="Пароль"
                  name="authPassword"
                  type="password"
                  value={authPassword}
                  onChange={this.inputHandleChange}
                />
                <input type="submit" value="Вхід" />
              </form>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default AuthModal;
