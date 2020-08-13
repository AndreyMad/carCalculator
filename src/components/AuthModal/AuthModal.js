import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./AuthModal.module.css";

class AuthModal extends Component {
  state = {
    registrationForm: false,
    email: "",
    password: ""
  };

  static propTypes = {
    authClose: PropTypes.func.isRequired
  };

  inputHandleChange = ({ target }) => {
    this.setState({
      [target.id]: target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { authorization, authClose } = this.props;
    authorization(email, password);
  };

  render() {
    const { authClose } = this.props;
    const { registrationForm, authPassword, authLogin } = this.state;
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
          {registrationForm ? null : (
            <>
              <form className={style.authForm} onSubmit={this.handleSubmit}>
                <input
                  placeholder="Email"
                  id="email"
                  type="text"
                  value={authLogin}
                  onChange={this.inputHandleChange}
                />
                <input
                  placeholder="Пароль"
                  id="password"
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
