import React from "react";
import { NavLink } from "react-router-dom";
import style from "./SimpleBuy.module.css";
import copartLogo from "../../assets/img/copartLogo.jpg";
import iaaiLogo from "../../assets/img/iaaiLogo.jpg";
import manheimLogo from "../../assets/img/manheimLogo.jpg";
import SVG from "../../assets/svg/index";
import routes from "../../routes/routes";
import CallBackBtn from "../CallBack/CallBackBtn";

const SimpleBuy = () => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>
        Придбати авто з США, простіше ніж ти думаєш
      </h2>
      <ul className={style.list}>
        <li className={style.item}>
          Підбери авто на страховому аукціоні:
          <div className={style.iconsWrapper}>
            <a
              className={style.link}
              target="blank"
              href="https://www.copart.com/"
            >
              <img
                className={style.linkImg}
                src={copartLogo}
                alt="presentation"
              />
            </a>
            <a
              className={style.link}
              target="blank"
              href="https://www.iaai.com/"
            >
              <img
                className={style.linkImg}
                src={iaaiLogo}
                alt="presentation"
              />
            </a>
            <a
              className={style.link}
              target="blank"
              href="https://www.manheim.com/"
            >
              <img
                className={style.linkImg}
                src={manheimLogo}
                alt="presentation"
              />
            </a>
          </div>
          <img src={SVG.downArrow} className={style.arrow} alt="presentation" />
        </li>
        <li className={style.item}>
          <NavLink className={style.navLink} to={routes.CALCULATOR_PAGE.path}>
            Підрахуй вартість
          </NavLink>

          <img src={SVG.downArrow} className={style.arrow} alt="presentation" />
        </li>
        <li className={style.item}>
          <CallBackBtn
            text="Зроби замовлення"
            styles={{ margin: "15px auto " }}
          />
        </li>
      </ul>
    </div>
  );
};

export default SimpleBuy;
