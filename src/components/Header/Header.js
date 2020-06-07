/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import style from "./Header.module.css";
import logo from "../../assets/img/logo.4acaa253b517.png";
import routes from "../../routes/routes";
import SVG from "../../assets/svg/index";
import fade from "../../transitions/fade250.module.css";
import slideLeft from "../../transitions/slideLeft.module.css";

class Header extends Component {
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

  render() {
    const { isBurgerOpen } = this.state;
    return (
      <>
        <div className={style.container}>
          <NavLink className={style.logo} to={routes.MAIN_PAGE.path}>
            <img src={logo} alt="autonom logo" />
          </NavLink>

          <div className={style.feedbackContainer}>
            <button
              className={
                isBurgerOpen ? style.feedbackButtonActive : style.feedbackButton
              }
              type="button"
              onClick={this.toggleModal}
            >
              <img
                className={style.feedbackBtnImg}
                src={isBurgerOpen ? SVG.headerClose : SVG.tel}
                alt="presentation"
              />
            </button>
            <CSSTransition
              in={isBurgerOpen}
              unmountOnExit
              timeout={250}
              classNames={slideLeft}
            >
              <div className={style.feedbackWrapper}>
                <ul className={style.list}>
                  <li className={style.item}>
                    <a
                      className={style.itemLink}
                      style={{
                        color: "#7E98FF",
                        fontSize: "16px"
                      }}
                      href="tel:+380979011449"
                    >
                      <img
                        alt="presentation"
                        src={SVG.tel}
                        className={style.itemIcon}
                      />
                      +380979011449
                    </a>
                  </li>
                  <li className={style.item}>
                    <span className={style.subTitle}>Ми у соц мережах</span>
                    <ul className={style.innerList}>
                      <li className={style.iinerListItem}>
                        <a className={style.itemLink} href="tel:+38097901414">
                          <img
                            alt="presentation"
                            src={SVG.viberHeader}
                            className={style.itemIcon}
                          />
                          Viber
                        </a>
                      </li>
                      <li className={style.iinerListItem}>
                        <a className={style.itemLink} href="tel:+38097901414">
                          <img
                            alt="presentation"
                            src={SVG.telegramHeader}
                            className={style.itemIcon}
                          />
                          Telegram
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className={style.item}>
                    <span className={style.subTitle}>Чекаємо ваших листів</span>

                    <a
                      className={style.itemLink}
                      style={{
                        color: "#7E98FF",
                        fontSize: "16px",
                        marginTop: "5px"
                      }}
                      href="mailto:andrey.mad.87@gmail.com"
                    >
                      <img
                        alt="presentation"
                        src={SVG.tel}
                        className={style.itemIcon}
                      />
                      info@autonom.ua
                    </a>
                  </li>
                </ul>
              </div>
            </CSSTransition>
            <CSSTransition
              in={isBurgerOpen}
              unmountOnExit
              timeout={250}
              classNames={fade}
            >
              <div className={style.shadow} onClick={this.toggleModal} />
            </CSSTransition>
          </div>
        </div>
        <div className={style.tabletNav}>
          <ul className={style.menuList}>
            <li className={style.menuItem}>
              <NavLink
                exact
                className={style.menuLink}
                activeClassName={style.menuLinkActive}
                to={routes.MAIN_PAGE.path}
              >
                Головна
              </NavLink>
            </li>
            <li className={style.menuItem}>
              <NavLink
                className={style.menuLink}
                activeClassName={style.menuLinkActive}
                to={routes.SEARCH_PAGE.path}
              >
                Пошук
              </NavLink>
            </li>
            <li className={style.menuItem}>
              <NavLink
                className={style.menuLink}
                activeClassName={style.menuLinkActive}
                to={routes.CALCULATOR_PAGE.path}
              >
                Калькулятор
              </NavLink>
            </li>

            <li className={style.menuItem}>
              <NavLink
                className={style.menuLink}
                activeClassName={style.menuLinkActive}
                to={routes.PARTS_PAGE.path}
              >
                Автозапчастини
              </NavLink>
            </li>
            <li className={style.menuItem}>
              <NavLink
                className={style.menuLink}
                activeClassName={style.menuLinkActive}
                to={routes.ABOUT_US_PAGE.path}
              >
                Про нас
              </NavLink>
            </li>
            <li className={style.menuItem}>
              <NavLink
                className={style.menuLink}
                activeClassName={style.menuLinkActive}
                to={routes.ANSWERS.path}
              >
                Питання
              </NavLink>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Header;
