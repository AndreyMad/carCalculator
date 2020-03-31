import React from "react";
import style from "./Header.module.css";
import logo from "../../assets/img/logo.4acaa253b517.png";

const Header = () => {
  return (
    <div className={style.container}>
      <img src={logo} className={style.logo} alt="autonom logo" />
      <p />
    </div>
  );
};

export default Header;
