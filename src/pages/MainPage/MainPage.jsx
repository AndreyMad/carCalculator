/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import Slider from "react-slick";
import Map from "../../components/Map/Map";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./MainPage.module.css";
import phoneSvg from "../../assets/svg/phone.svg";
import viberSvg from "../../assets/svg/viberSvg.svg";
import CallBackBtn from "../../components/CallBack/CallBackBtn";
import Footer from "../../components/Footer/Footer";
import EMMA_MAERSK from "../../assets/img/EMMA_MAERSK.png";
import parts from "../../assets/img/parts.png";
import sertif from "../../assets/img/sertif.png";

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
      autoplaySpeed: 6000,
      arrows: false,
      dots: false
    };

    return (
      <div className={style.container}>
        <section className={style.headWrapper}>
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
                Сертифікація та постановка на облік{" "}
              </h1>
              <img
                className={style.backgroundImg}
                src={sertif}
                alt="presentation"
              />
            </div>
          </Slider>
          <CallBackBtn />
        </section>
        <section className={style.aboutContainer}>
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
        </section>
        <section className={style.advantage}>
          <p className={style.about}>
            компанія автоном успішно працює на ринку більж 8 років. ми проводимо
            повний цикл починаючи від консультації клієнта і до постановки
            автомобіля на облік в сервісному центрі. залиште заявку або
            зателефонуйте нам і ви отримаєте відповіді на всі ваші питання
            стосовно автомобіля з сша
          </p>
          <h2 className={style.subTitle}>Переваги роботи з нами:</h2>
          <ul className={style.list}>
            <li>
              найвищий рівень обслуговування
              <p>
                Компанія Автоном це команда професіоналів яка в найкоротші сроки
                надасть Вам актуальну інформацію та здійснить професійний підбір
                автомобіля, згідно Ваших побажань та бюджету
              </p>
            </li>
            <li>
              одні з найкращих тарифів на ринку
              <p>
                Завдяки довгостроковим відносинам та оптовим поставкам авто, ми
                можемо запропонувати нашим клієнтам найкращі ціни та умови
                доставки авто за США
              </p>
            </li>
            <li>
              гарантія безпеки та збереження авто до отримання власником
              <p>
                Купівля авто проходить згідно договору, всі платежі покупець
                здійснює самостійно в касі банку Swift переказом. Всі автомобілі
                застраховані в найкращих страхових компаніях світу.
              </p>
            </li>
            <li>
              гнучкі умови дилерського співробітництва
              <p>
                Якщо ви розумієтесь на авто і у вас є бажання займатись цією
                діяльністю, зв'яжіться за нашим менеджером для отримання
                дилерської пропозиції
              </p>
            </li>
            <li>
              Найкращі ціни на автозапчастини
              <p>
                Одним із напрямків діяльності компаніїї являється доставка і
                продаж автозапчастин. Ми співпрацюємо з постачальниками з
                Європи, США, Японії, Арабських Еміратів та інших. Тому при
                замовленні авто у нас Ви можете бути впевнені в тому що
                отримаєте якісні запасні частини за найкращими цінами на ринку.
              </p>
            </li>
          </ul>
        </section>
        <section className={style.causes}>
          <div className={style.outwrapper}>
            <h3 className={style.subtitle}>6 причин придбати авто з США</h3>
            <ul className={style.causesList}>
              <li className={style.listItem}>
                Вигідна ціна
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
                Великий вибір
                <span className={style.listInnerItem}>
                  Багато американців віддають перевагу новим авто, а їздять вони
                  на них до закінчення гарантії, після чого автомобіль
                  продається. Окрема категорія товарів — машини після аварії.
                  Замість ремонту власнику простіше передати розбиту машину
                  страховій компанії, щоб та продала її на аукціоні.
                </span>
              </li>
              <li className={style.listItem}>
                Чесна історія
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
                Багата комплектація
                <span className={style.listInnerItem}>
                  Американці люблять комфорт. Тож їхні автомобілі здебільшого
                  краще оснащені, ніж європейські. Переважна частина машин має
                  систему клімат-контролю, автоматичну коробку передач та інші
                  пристосування, що роблять водіння максимально комфортним.
                </span>
              </li>
              <li className={style.listItem}>
                Надійність та невибагливість
                <span className={style.listInnerItem}>
                  Авто з Америки мають об'єм двигуна вище середнього, а також
                  розраховані на бензин марки 92, що чудово підходить для
                  вітчизняних доріг.
                </span>
              </li>
              <li className={style.listItem}>
                Оплата частинами
                <span className={style.listInnerItem}>
                  Покупка авто відбувається в 2 етапи. Після виграшу на аукціоні
                  покупець оплачує лише вартість авто та доставку морем. Всі
                  митні платежі оплачуються за 35-50 днів. Це може бути дуже
                  зручним якщо Ви бажаєте користуватись цими коштами, або ж Вам
                  сподобалось авто яке наразі трохи не по кишені.
                </span>
              </li>
            </ul>
          </div>
        </section>
        {/* <Map /> */}
        <Footer />
      </div>
    );
  }
}

export default MainPage;
{
}
