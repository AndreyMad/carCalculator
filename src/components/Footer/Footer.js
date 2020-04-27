import React from "react";
import style from "./Footer.module.css";
import logo from "../../assets/img/logo.4acaa253b517.png";

const componentName = () => {
  return (
    <div className={style.footerContainer}>
      <img src={logo} alt="autonom logo" className={style.imgLogo} />
      <div className={style.wrapper}>
        <span className={style.span}>Графік роботи:</span>
        <div className={style.innerWrapper}>
          <span className={style.span}>пн-пт 9:00-19:00</span>
          <span className={style.span}>сб 10:00-13:00</span>
          <span className={style.span}>нд вихідний</span>
        </div>
      </div>

      <div className={style.wrapper}>
        <p className={style.title}>З нами по дорозі!!!</p>
      </div>
    </div>
  );
};

export default componentName;
