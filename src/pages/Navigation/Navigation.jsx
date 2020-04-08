/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes/routes";
import style from "./Navigation.module.css";
import burgerStyle from "./burgerStyle.module.css";
// import Header from "../../components/Header/Header";

class Navigation extends Component {
  state = {
    isBurgerOpen: false,
    scrolOn: true
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isBurgerOpen: !prevState.isBurgerOpen,
      scrolOn: !prevState.scrolOn
    }));
    this.togleScrol();
  };

  togleScrol = () => {
    const { scrolOn } = this.state;
    if (scrolOn) {
      document.body.style = " overflow: hidden ";
    } else {
      document.body.style = "";
    }
  };

  togleHelper = e => {
    if (
      e.target.className.includes("menuButton") ||
      e.target.className.includes("menuItem") ||
      e.target.className.includes("menuButton_active")
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
          className={
            isBurgerOpen
              ? burgerStyle.menuButton_active
              : burgerStyle.menuButton
          }
        >
          <span className={burgerStyle.burgerSpan} />
          <span className={burgerStyle.burgerSpan} />
          <span className={burgerStyle.burgerSpan} />
        </button>
        {isBurgerOpen ? (
          <>
            {/* <Header /> */}
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
                    Підбір і доставка автозапчастин
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
