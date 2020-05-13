/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import Slider from "react-slick";
import Map from "../../components/Map/Map";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./MainPage.module.css";

import CallBackBtn from "../../components/CallBack/CallBackBtn";
import Footer from "../../components/Footer/Footer";
import EMMA_MAERSK from "../../assets/img/EMMA_MAERSK.png";
import parts from "../../assets/img/parts.png";
import sertif from "../../assets/img/sertif.png";
import OrderForm from "../../components/OrderForm/OrderForm";
import SVG from "../../assets/svg/index";
import audiImg from "../../assets/img/audi.png";
import jaguar from "../../assets/img/jaguar.png";
import SimpleBuy from "../../components/SimpleBuy/SimpleBuy";
import CarAvailability from "../../components/carAvailability/carAvailability";
import Reviews from "../../components/Reviews/Reviews";

class MainPage extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    isModalOpen: false
  };

  render() {
    const settings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      dots: false
    };
    return (
      <div className={style.container}>
        <section className={style.headWrapper}>
          <Slider {...settings}>
            <div className={style.headWrapper}>
              <div className={style.backgroundShadow} />

              <h1 className={style.title}>Купівля та доставка авто з США</h1>
              <img
                className={style.backgroundImg}
                src={EMMA_MAERSK}
                alt="presentation"
              />
            </div>
            <div className={style.headWrapper}>
              <div className={style.backgroundShadow} />

              <h1 className={style.title}>Підбір запчастин і ремонт</h1>
              <img
                className={style.backgroundImg}
                src={parts}
                alt="presentation"
              />
            </div>

            <div className={style.headWrapper}>
              <div className={style.backgroundShadow} />

              <h1 className={style.title}>
                Сертифікація та постановка на облік
              </h1>
              <img
                className={style.backgroundImg}
                src={sertif}
                alt="presentation"
              />
            </div>

            <div className={style.headWrapper}>
              <div className={style.backgroundShadow} />
              <p className={style.aboutBigNumber}>8</p>
              <span className={style.title}>
                років на автомобільному ринку України
              </span>
              <img
                className={style.backgroundImg}
                src={audiImg}
                alt="presentation"
              />
            </div>

            <div className={style.headWrapper}>
              <div className={style.backgroundShadow} />
              <p className={style.aboutBigNumber}>2150</p>
              <span className={style.title}>вчасно доставлених авто</span>
              <img
                className={style.backgroundImg}
                src={jaguar}
                alt="presentation"
              />
            </div>
          </Slider>
        </section>
        <section className={style.orderForm}>
          <OrderForm />
        </section>
        <section className={style.causes}>
          <div className={style.outwrapper}>
            <h3 className={style.subtitle}>6 причин придбати авто з США</h3>
            <ul className={style.causesList}>
              <li className={style.listItem}>
                <img
                  src={SVG.money}
                  className={style.causesIcon}
                  alt="presentation"
                />
                <p> Вигідна ціна</p>
                <span className={style.listInnerItem}>
                  Автомобілі в США дешевші, ніж аналогічні марки, того ж року
                  випуску, у Європі. Відповідно вартість розмитнення, яка
                  залежить від ціни, теж буде нижчою, аналогічної машини з країн
                  ЄС. Навіть з урахуванням всіх витрат — вартості самого авто,
                  митних зборів, оплати доставлення — автомобіль зі США
                  обійдеться дешевше, ніж його аналог в Україніна 30-50%.
                </span>
              </li>
              <li className={style.listItem}>
                <img
                  src={SVG.choice}
                  className={style.causesIcon}
                  alt="presentation"
                />
                <p> Великий вибір</p>

                <span className={style.listInnerItem}>
                  Багато американців віддають перевагу новим авто, а їздять вони
                  на них до закінчення гарантії, після чого автомобіль
                  продається. Окрема категорія товарів — машини після аварії.
                  Замість ремонту власнику простіше передати розбиту машину
                  страховій компанії, щоб та продала її на аукціоні.
                </span>
              </li>
              <li className={style.listItem}>
                <img
                  src={SVG.history}
                  className={style.causesIcon}
                  alt="presentation"
                />
                <p> Чесна історія</p>

                <span className={style.listInnerItem}>
                  Купуючи американське авто, покупець бачить 100% офіційної
                  історії: кількість власників, рік випуску, чи були ДТП тощо. В
                  США на законодавчому рівні заборонено відмотування пробігу.
                  Цифра на одометрі — завжди реальна. До того ж є маса сервісів
                  які дозволяють дізнатись повну історію обслуговування авто:
                  що, коли і з якої причини замінено!
                </span>
              </li>
              <li className={style.listItem}>
                <img
                  src={SVG.carComplect}
                  className={style.causesIcon}
                  alt="presentation"
                />
                <p> Багата комплектація</p>

                <span className={style.listInnerItem}>
                  Американці люблять комфорт. Тож їхні автомобілі здебільшого
                  краще оснащені, ніж європейські. Переважна частина машин має
                  систему клімат-контролю, автоматичну коробку передач та інші
                  пристосування, що роблять водіння максимально комфортним.
                </span>
              </li>
              <li className={style.listItem}>
                <img
                  src={SVG.carNad}
                  className={style.causesIcon}
                  alt="presentation"
                />
                <p> Надійність та невибагливість</p>

                <span className={style.listInnerItem}>
                  Авто з Америки мають об'єм двигуна вище середнього, а також
                  розраховані на бензин марки 92, що чудово підходить для
                  вітчизняних доріг.
                </span>
              </li>
              <li className={style.listItem}>
                <img
                  src={SVG.oplata}
                  className={style.causesIcon}
                  alt="presentation"
                />
                <p> Оплата частинами</p>

                <span className={style.listInnerItem}>
                  Покупка авто відбувається в 2 етапи. Після виграшу на аукціоні
                  покупець оплачує лише вартість авто та доставку морем. Всі
                  митні платежі оплачуються за 35-50 днів. Це може бути дуже
                  зручним якщо Ви бажаєте користуватись цими коштами, або ж Вам
                  сподобалось авто яке наразі трохи не по кишені.
                </span>
              </li>
              <li>
                <CallBackBtn styles={{ margin: "20px auto 30px" }} />
              </li>
            </ul>
          </div>
        </section>
        <section className={style.simpleBuyContainer}>
          <SimpleBuy />
          <CarAvailability />
        </section>
        <section>{/* <Reviews /> */}</section>
        <Map />
        <Footer />
      </div>
    );
  }
}

export default MainPage;
{
}
