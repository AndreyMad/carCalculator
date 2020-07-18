import React from "react";
import bmwLeft from "../../assets/img/bmwLeft.jpg";
import bmwRight from "../../assets/img/bmwRight.jpg";
import style from "./Footer.module.css";
import SVG from "../../assets/svg/index";

const componentName = () => {
  return (
    <div className={style.footerContainer}>
      <div className={style.imgWrapper}>
        <img className={style.leftImg} src={bmwLeft} alt="presentation" />

        <img className={style.rightImg} src={bmwRight} alt="presentation" />
      </div>
      <div className={style.innerWraper}>
        <h4 className={style.title}>З нами по дорозі!</h4>
        <div className={style.contactsWrapper}>
          <a className={style.link} href="tel: +380681401111">
            +380681401111
          </a>
          <p className={style.linkAbs}>Контакти</p>
          <a className={style.link} href="mailto: andrey.mad.87@gmail.com">
            Написати лист
          </a>
        </div>
        <div className={style.logoWrapper}>
          <a
            className={style.logoLink}
            href="viber://chat?number=%2B380681401111"
          >
            <img
              src={SVG.viberWhite}
              className={style.miniLogo}
              alt="presentation"
            />
          </a>
          <a
            className={style.logoLink}
            href="tg://resolve?domain=AutonomAutoImport"
          >
            <img
              src={SVG.telegramWhite}
              className={style.miniLogo}
              alt="presentation"
            />
          </a>
        </div>

        <div className={style.scheduleWrapper}>
          <p>Графік роботи:</p>
          <p>ПН-ПТ 9:00 - 19:00</p>
          <p>СБ 10:00 - 13:00</p>
          <p>НД вихідний</p>
        </div>
      </div>
    </div>
  );
};

export default componentName;
