/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes/routes";
import style from "./Navigation.module.css";

class Navigation extends Component {
  state = {
    isBurgerOpen: false
  };

  toggleModal = () => {
    this.setState(prevState => ({ isBurgerOpen: !prevState.isBurgerOpen }));
  };

  togleHelper = e => {
    if (
      e.target.className.includes("menuButton") ||
      e.target.className.includes("menuItem")
    ) {
      this.toggleModal();
    }
  };

  render() {
    const { isBurgerOpen } = this.state;
    return (
      <>
        <button
          value="burgerMenu"
          type="button"
          onClick={this.toggleModal}
          className={style.menuButton}
        >
          <svg
            viewBox="0 0 100 80"
            width="100%"
            height="100"
            fill="#3f61e7"
            className={style.menuButton}
          >
            <rect width="30" height="12" rx="8" />
            <rect y="30" width="90" height="12" rx="8" />
            <rect y="60" width="30px" height="12" rx="8" />
          </svg>
        </button>
        {isBurgerOpen ? (
          <>
            <div className={style.overlay}>
              <ul className={style.menuList}>
                <li className={style.menuItem} onClick={this.toggleModal}>
                  <NavLink
                    exact
                    className={style.shadowLink}
                    to={routes.MAIN_PAGE.path}
                  >
                    Головна
                  </NavLink>
                </li>
                <li className={style.menuItem} onClick={this.toggleModal}>
                  <NavLink
                    className={style.shadowLink}
                    to={routes.CALCULATOR_PAGE.path}
                  >
                    Калькулятор
                  </NavLink>
                </li>
                <li className={style.menuItem} onClick={this.toggleModal}>
                  <NavLink
                    className={style.shadowLink}
                    to={routes.SEARCH_PAGE.path}
                  >
                    Пошук
                  </NavLink>
                </li>
                <li className={style.menuItem} onClick={this.toggleModal}>
                  <NavLink
                    className={style.shadowLink}
                    to={routes.SEARCH_PAGE.path}
                  >
                    Контакти
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        ) : null}
      </>
    );
  }
}

export default Navigation;
