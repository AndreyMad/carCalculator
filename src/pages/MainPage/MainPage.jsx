import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import Map from "../../components/Map/Map";
import style from "./MainPage.module.css";
import phoneSvg from "../../assets/svg/phone.svg";
import viberSvg from "../../assets/svg/viberSvg.svg";
import CallBackBtn from "../../components/CallBack/CallBackBtn";
import Footer from "../../components/Footer/Footer";

class MainPage extends Component {
  state = {
    isModalOpen: false
  };

  render() {
    return (
      <div>
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
        <h1 className={style.title}>Купівля та доставка авто з США</h1>
        <p>
          компанія автоном успішно працює на ринку більж 8 років. ми проводимо
          повний цикл починаючи від консультації клієнта і до постановки
          автомобіля на облік в сервісному центрі. залиште заявку або
          зателефонуйте нам і ви отримаєте відповіді на всі ваші питання
          стосовно автомобіля з сша
        </p>
        <CallBackBtn />
        <div className={style.aboutContainer}>
          <div className={style.aboutWrapper}>
            <div className={style.aboutInnerWrapper}>
              <p className={style.aboutBigNumber}>8</p>
              <span className={style.aboutText}>
                років на автомобільному ринку України
              </span>
            </div>
          </div>
          <CallBackBtn />
          <div className={style.aboutWrapper2}>
            <div className={style.aboutInnerWrapper}>
              <p className={style.aboutBigNumber}>2150</p>
              <span className={style.aboutText}>вчасно доставлених авто</span>
            </div>
          </div>
          <CallBackBtn />
        </div>
        <section className={style.advantage}>
          <h2 className={style.subTitle}>Переваги роботи з нами:</h2>
          <ul className={style.list}>
            <li>одні з найкращих тарифів на ринку</li>
            <li>гарантія безпеки та збереження авто до отримання власником </li>
            <li>гнучкі умови дилерського співробітництва</li>
            <li>Професійна команда менеджерів на звязку 24/7</li>
            <li>найвищий рівень обслуговування;</li>
          </ul>
        </section>
        {/* <Map /> */}
        <Footer />
      </div>
    );
  }
}

export default MainPage;
