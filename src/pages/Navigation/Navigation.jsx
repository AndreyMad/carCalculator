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
        />
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
