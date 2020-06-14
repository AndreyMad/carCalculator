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
import slide from "../../transitions/slide.module.css";

class Header extends Component {
  state = {
    isBurgerOpen: false,
    scrolOn: true,
    windowWidth: ""
  };

  componentDidMount() {
    this.setState({
      windowWidth: window.innerWidth
    });
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

  render() {
    const { isBurgerOpen, windowWidth } = this.state;
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
                      className={style.shadowLink}
                      to={routes.MAIN_PAGE.path}
                    >
                      Головна
                    </NavLink>
                  </li>
                  <li className={style.menuItem}>
                    <NavLink
                      className={style.shadowLink}
                      to={routes.SEARCH_PAGE.path}
                    >
                      Пошук
                    </NavLink>
                  </li>
                  <li className={style.menuItem}>
                    <NavLink
                      className={style.shadowLink}
                      to={routes.CALCULATOR_PAGE.path}
                    >
                      Калькулятор
                    </NavLink>
                  </li>

                  <li className={style.menuItem}>
                    <NavLink
                      className={style.shadowLink}
                      to={routes.ANSWERS.path}
                    >
                      Питання
                    </NavLink>
                  </li>
                  <li className={style.menuItem}>
                    <NavLink
                      className={style.shadowLink}
                      to={routes.ABOUT_US_PAGE.path}
                    >
                      Про нас
                    </NavLink>
                  </li>
                  <li className={style.menuItem}>
                    <NavLink
                      className={style.shadowLink}
                      to={routes.PARTS_PAGE.path}
                    >
                      Автозапчастини
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className={style.feedbackTabletContainer}>
                <div className={style.feedbackTabletWrapper}>
                  <a href="tel:+380979011449" className={style.phoneLink}>
                    +38 097 901 14 49
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
                    <a href="tel:+380979011449" className={style.phoneLink}>
                      <img
                        className={style.feedbackBtnImg}
                        src={SVG.viberWhite}
                        alt="presentation"
                      />
                    </a>
                    <a href="tel:+380979011449" className={style.phoneLink}>
                      <img
                        className={style.feedbackBtnImg}
                        src={SVG.telegramWhite}
                        alt="presentation"
                      />
                    </a>
                    <a href="tel:+380979011449" className={style.phoneLink}>
                      <img
                        className={style.feedbackBtnImg}
                        src={SVG.tel}
                        alt="presentation"
                      />
                    </a>
                  </div>
                </div>
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
                    href="tel:+380979011449"
                  >
                    +380979011449
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
                      <a className={style.itemLink} href="tel:+38097901414">
                        Viber
                        <img
                          alt="presentation"
                          src={SVG.viberHeader}
                          className={style.itemIcon}
                        />
                      </a>
                    </li>
                    <li className={style.iinerListItem}>
                      <a className={style.itemLink} href="tel:+38097901414">
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
      </>
    );
  }
}

export default Header;
