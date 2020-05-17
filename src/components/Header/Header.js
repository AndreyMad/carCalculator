import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
import logo from "../../assets/img/logo.4acaa253b517.png";
import phoneSvg from "../../assets/svg/phone.svg";
import viberSvg from "../../assets/svg/viberSvg.svg";
import routes from "../../routes/routes";

const Header = () => {
  return (
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
  );
};

export default Header;
