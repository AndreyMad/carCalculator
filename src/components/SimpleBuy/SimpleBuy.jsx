import React from "react";
import { NavLink } from "react-router-dom";
import style from "./SimpleBuy.module.css";
import copartLogo from "../../assets/img/1200px-Copart_logo.svg.png";
import iaaiLogo from "../../assets/img/iaaiLogo.jpg";
import manheimLogo from "../../assets/img/manheimLogo.jpg";
import SVG from "../../assets/svg/index";
import routes from "../../routes/routes";
import CallBackBtn from "../CallBack/CallBackBtn";

const SimpleBuy = () => {
  return (
    <div className={style.container}>
      <div className={style.shadow}>
        <h2 className={style.title}>
          Придбати авто з США, простіше ніж ти думаєш
        </h2>

        <ul className={style.list}>
          <li className={style.item}>
            Обери авто на страховому аукціоні:
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
            <img
              src={SVG.downArrow}
              className={style.arrow}
              alt="presentation"
            />
          </li>
          <li className={style.item}>
            <button type="button" className={style.navButton}>
              <NavLink
                className={style.navLink}
                to={routes.CALCULATOR_PAGE.path}
              >
                Підрахуй вартість
              </NavLink>
            </button>

            <img
              src={SVG.downArrow}
              className={style.arrow}
              alt="presentation"
            />
          </li>
          <li className={style.item}>
            <CallBackBtn
              text="Зроби замовлення"
              styles={{ margin: "15px auto " }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleBuy;
