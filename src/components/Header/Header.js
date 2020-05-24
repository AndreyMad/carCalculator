import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
import logo from "../../assets/img/logo.4acaa253b517.png";
import phoneSvg from "../../assets/svg/phone.svg";
import viberSvg from "../../assets/svg/viberSvg.svg";
import routes from "../../routes/routes";

const Header = () => {
  return (
    <>
      <div className={style.container}>
        <NavLink className={style.logo} to={routes.MAIN_PAGE.path}>
          <img src={logo} alt="autonom logo" />
        </NavLink>

        <div className={style.phoneContainer}>
          <div className={style.phoneWrapper}>
            <img
              className={style.phoneSvg}
              alt="phone"
              src={phoneSvg}
              role="presentation"
            />

            <a href="tel: +380979011449" className={style.phoneLink}>
              +38 097 9011449
            </a>
          </div>

          <div className={style.phoneWrapper}>
            <img
              className={style.phoneSvg}
              alt="phone"
              src={viberSvg}
              role="presentation"
            />

            <a href="tel: +380979011449" className={style.phoneLink}>
              +38 097 9011449
            </a>
          </div>
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
};

export default Header;
