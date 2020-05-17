import React from "react";
import { NavLink } from "react-router-dom";
import oopsImg from "../../assets/img/8885322-oops-icon.jpg";
import style from "./ErrorNotif.module.css";
// eslint-disable-next-line import/no-cycle
import routes from "../../routes/routes";

const ErrorNotif = () => {
  return (
    <>
      <div className={style.container}>
        <img className={style.img} src={oopsImg} alt="oops " />
        <h3 className={style.title}>Номер лоту не знайдено. </h3>
        <p className={style.text}>
          Щось пішло не так...
          <p className={style.text}>
            Перевірте номер лоту і спробуйте ще раз, або скористайтесь &nbsp;
            <NavLink className={style.link} to={routes.CALCULATOR_PAGE.path}>
              калькулятором
            </NavLink>
          </p>
        </p>
      </div>
    </>
  );
};

export default ErrorNotif;
