/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import style from "./Header.module.css";
import logo from "../../assets/img/logo.4acaa253b517.png";
import routes from "../../routes/routes";
import SVG from "../../assets/svg/index";
import fade from "../../transitions/fade250.module.css";
import slide from "../../transitions/slide.module.css";
import AuthModal from "../AuthModal/AuthModal";
import * as API from "../../api/api";

class Header extends Component {
  state = {
    isBurgerOpen: false,
    scrolOn: true,
    windowWidth: "",
    isAuthOpen: false,
    isAuthorized: false,
    user: {}
  };

  componentDidMount() {
    this.setState({
      windowWidth: window.innerWidth
    });
    // this.checkAuth();
  }

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

  authClose = e => {
    if (e.target.className.includes("containerShadow")) {
      this.setState({ isAuthOpen: false }, () => {
        this.togleScrol();
      });
    }
  };

  logOut = () => {
    API.deleteSession(localStorage.getItem("token"));
    this.setState({
      isBurgerOpen: false,
      isAuthOpen: false,
      isAuthorized: false
    });
    localStorage.removeItem("token");
  };

  authorization = (email, password) => {
    API.authorization(email, password)
      .then(res => {
        const { data } = res;
        console.log(data);
        if (data.error) {
          this.setState({ error: data.error });
          NotificationManager.error("Помилка", data.error);
          return;
        }
        if (!data.err && data.token) {
          localStorage.setItem("token", data.token);
          this.setState(
            {
              error: false,
              isAuthorized: true,
              user: data.user,
              isAuthOpen: false
            },
            () => {
              this.togleScrol();
            }
          );
        }
      })
      // .finally(() => this.authorizationCheck())
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  };

  registrationFormSubmit = (
    regEmail,
    regPassword,
    regFirstName,
    regLastName,
    regPhone
  ) => {
    const user = {
      firstName: regFirstName,
      lastName: regLastName,
      password: regPassword,
      email: regEmail,
      phone: regPhone
    };
    API.registerUser(user).then(res => {
      if (res.error && res.error.detail)
        return NotificationManager.error(
          `${res.error.detail}`,
          "Помилка",

          3000
        );

      // return this.authorization(res.email, res.password);
    });
  };

  // checkAuth = () => {
  //   const token = localStorage.getItem("token");
  //   API.checkUserSession(token).then(res => {
  //     if (!res.data.resp) {
  //       this.setState({ isAuthorized: false });
  //     }
  //   });
  // };

  render() {
    const {
      isBurgerOpen,
      isAuthOpen,
      windowWidth,
      isAuthorized,
      user
    } = this.state;
    return (
      <>
        <div className={style.container}>
          <NavLink className={style.logo} to={routes.MAIN_PAGE.path}>
            <img src={logo} alt="autonom logo" />
          </NavLink>

          {windowWidth < 768 ? (
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
          ) : (
            <>
              <div className={style.feedbackTabletContainer}>
                <ul className={style.menuList}>
                  <li className={style.menuItem}>
                    <NavLink
                      exact
                      className={style.link}
                      to={routes.MAIN_PAGE.path}
                      activeClassName={style.activeLink}
                    >
                      Головна
                    </NavLink>
                  </li>
                  <li className={style.menuItem}>
                    <NavLink
                      to={routes.SEARCH_PAGE.path}
                      className={style.link}
                      activeClassName={style.activeLink}
                    >
                      Пошук
                    </NavLink>
                  </li>
                  <li className={style.menuItem}>
                    <NavLink
                      className={style.link}
                      activeClassName={style.activeLink}
                      to={routes.CALCULATOR_PAGE.path}
                    >
                      Калькулятор
                    </NavLink>
                  </li>

                  <li className={style.menuItem}>
                    <NavLink
                      className={style.link}
                      activeClassName={style.activeLink}
                      to={routes.ANSWERS.path}
                    >
                      Питання
                    </NavLink>
                  </li>
                  <li className={style.menuItem}>
                    <NavLink
                      className={style.link}
                      activeClassName={style.activeLink}
                      to={routes.ABOUT_US_PAGE.path}
                    >
                      Про нас
                    </NavLink>
                  </li>
                  <li className={style.menuItem}>
                    <NavLink
                      className={style.link}
                      activeClassName={style.activeLink}
                      to={routes.PARTS_PAGE.path}
                    >
                      Автозапчастини
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className={style.feedbackTabletContainer}>
                <div className={style.feedbackTabletWrapper}>
                  <a href="tel:+380681401111" className={style.phoneLink}>
                    +38 068 140 11 11
                  </a>
                  <img
                    className={style.feedbackBtnImg}
                    src={SVG.tel}
                    alt="presentation"
                  />
                </div>
                <div className={style.feedbackTabletWrapper}>
                  <span>Контакти</span>
                  <div>
                    <a
                      href="viber://chat?number=%2B380681401111"
                      className={style.phoneLink}
                    >
                      <img
                        className={style.feedbackBtnImg}
                        src={SVG.viberWhite}
                        alt="presentation"
                      />
                    </a>

                    <a
                      href="tg://resolve?domain=AutonomAutoImport"
                      className={style.phoneLink}
                    >
                      <img
                        className={style.feedbackBtnImg}
                        src={SVG.telegramWhite}
                        alt="presentation"
                      />
                    </a>
                    <a href="tel:+380681401111" className={style.phoneLink}>
                      <img
                        className={style.feedbackBtnImg}
                        src={SVG.tel}
                        alt="presentation"
                      />
                    </a>
                  </div>
                </div>
                {isAuthorized ? (
                  <div className={style.authWrapper}>
                    <span>{user.name.firstName}</span>
                    <button
                      className={style.exitButton}
                      onClick={this.logOut}
                      type="button"
                    >
                      Вихід
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      this.setState({
                        isAuthOpen: true,
                        isBurgerOpen: false
                      });
                    }}
                    className={style.authButton}
                  >
                    Авторизація
                  </button>
                )}
              </div>
            </>
          )}
          <CSSTransition
            in={isBurgerOpen}
            unmountOnExit
            timeout={250}
            classNames={slide}
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
                    href="tel:+380681401111"
                  >
                    +380681401111
                    <img
                      alt="presentation"
                      src={SVG.tel}
                      className={style.itemIcon}
                    />
                  </a>
                </li>
                <li className={style.item}>
                  <span className={style.subTitle}>Ми у соц мережах</span>
                  <ul className={style.innerList}>
                    <li className={style.iinerListItem}>
                      <a
                        className={style.itemLink}
                        href="viber://chat?number=%2B380681401111"
                      >
                        Viber
                        <img
                          alt="presentation"
                          src={SVG.viberHeader}
                          className={style.itemIcon}
                        />
                      </a>
                    </li>
                    <li className={style.iinerListItem}>
                      <a
                        className={style.itemLink}
                        href="tg://resolve?domain=AutonomAutoImport"
                      >
                        Telegram
                        <img
                          alt="presentation"
                          src={SVG.telegramHeader}
                          className={style.itemIcon}
                        />
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
                    info@autonom.ua
                    <img
                      alt="presentation"
                      src={SVG.tel}
                      className={style.itemIcon}
                    />
                  </a>
                </li>
                <li className={style.itemIcon}>
                  {isAuthorized ? (
                    <div className={style.authWrapper}>
                      <span>{user.name.firstName}</span>
                      <button
                        className={style.exitButton}
                        onClick={this.logOut}
                        type="button"
                      >
                        Вихід
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        this.setState({
                          isAuthOpen: true,
                          isBurgerOpen: false
                        });
                      }}
                      className={style.authButton}
                    >
                      Авторизація
                    </button>
                  )}
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
          <CSSTransition
            in={isAuthOpen}
            unmountOnExit
            timeout={250}
            classNames={fade}
          >
            <AuthModal
              authClose={this.authClose}
              authorization={this.authorization}
              registrationFormSubmit={this.registrationFormSubmit}
            />
          </CSSTransition>
          <NotificationContainer />
        </div>
      </>
    );
  }
}

export default Header;
