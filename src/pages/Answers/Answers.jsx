import React from "react";
import style from "./Answers.module.css";
import Footer from "../../components/Footer/Footer";
import OrderForm from "../../components/OrderForm/OrderForm";
import disturbImage from "../../assets/img/ashish-joshi-e6mqDRqe7P8-unsplash.png";

const Answers = () => {
  return (
    <>
      <section className={style.container}>
        <div className={style.disturbWrapper}>
          <h3 className={style.subTitle}>
            Знайди відповіді тут або запитай у нас
          </h3>
          <img src={disturbImage} alt="sad man" />
        </div>
        <div className={style.wrapper}>
          <ul className={style.shadowContainer}>
            <li className={style.spoiler}>
              <input type="checkbox" />
              <span className={style.question}>
                Як відбувається процес купівлі автомобіля
                <img alt="presentation" className={style.svg} />
              </span>

              <div className={style.listInner}>
                <ul>
                  <li>Обговорення ваших вимог до авто та бажаного бюджету.</li>
                  <li>Заключення договору та внесення страхового депозиту</li>
                  <li>Підбір та перевірка авто по базам страхових компаній</li>
                  <li>Проведення торгів</li>
                  <li>Оплата вартості авто та транспортування морем</li>
                  <li>Доставка авто до порту Одеси або Клайпеди</li>
                  <li>Оплата митних платежів та брокерських послуг</li>
                  <li>Доставка авто за адресою клієнта або на сто</li>
                </ul>
              </div>
            </li>
            <li className={style.spoiler}>
              <input type="checkbox" />
              <span className={style.question}>
                Чи можливо отримати відремонтоване і зареєстроване авто
                <img alt="presentation" className={style.svg} />
              </span>

              <div className={style.listInner}>
                <p>
                  Так. Компанія AutoNom займається повним спектром послуг з
                  доставки та ремонту авто. Тому за вашим бажанням ми можемо
                  підібрати необхідні деталі та відновити Ваш автомобіль до
                  ідеального стану. Провести сертифікацію та постановку на облік
                  в сервісних центрах України.
                </p>
              </div>
            </li>
            <li className={style.spoiler}>
              <input type="checkbox" />
              <span className={style.question}>
                В США можливо придбати авто тільки після ДТП
                <img alt="presentation" className={style.svg} />
              </span>

              <div className={style.listInner}>
                <p>
                  В Америці можна купити не тільки авто з ушкодженнями, а й
                  абсолютно цілі або відновлені. Причина, по якій в Україні
                  завозяться в основному биті авто, полягає в їхній ціні, яка
                  навіть після всіх витрат на купівлі, доставку, оформлення та
                  ремонт, виявляється набагато нижче, ніж на аналогічний
                  автомобіль в Україні і навіть Європі. Повністю цілий
                  автомобіль купувати не так вигідно, так як таке авто дорожче
                  продасться на аукціоні, і як наслідок буде дорожче
                  розмитнення. Якщо купувати відновлений автомобіль, економія
                  коштів не буде настільки відчутною, як у випадку з
                  пошкодженими авто.
                </p>
              </div>
            </li>
            <li className={style.spoiler}>
              <input type="checkbox" />
              <span className={style.question}>
                Які етапи та скільки часу займає доставка авто
                <img alt="presentation" className={style.svg} />
              </span>

              <div className={style.listInner}>
                <p>
                  Після придбання авто відбувається його транспортування до
                  порту відправки, потім завантаження в контейнер та
                  транспортування морем. В Одесу повний цикл займає близько
                  50днів, в Клайпеду 35днів. Та після прибуття, транспортування
                  за адресою клієнта.
                </p>
              </div>
            </li>
            <li className={style.spoiler}>
              <input type="checkbox" />
              <span className={style.question}>
                Чи можу я повернути страховий депозит
                <img alt="presentation" className={style.svg} />
              </span>

              <div className={style.listInner}>
                <p>
                  Страховий депозит можливо повернути тільки до моменту купівлі
                  авто на аукціоні. Після виграшу авто страховий депозит іде в
                  рахунок оплати за авто або ж при відмові клієнта, на погашення
                  штрафних санкцій аукціону.
                </p>
              </div>
            </li>
            <li className={style.spoiler}>
              <input type="checkbox" />
              <span className={style.question}>
                З якої ціни вигідно купувати авто в США
                <img alt="presentation" className={style.svg} />
              </span>

              <div className={style.listInner}>
                <p>
                  Від 6000$. За цю суму можливо придбати дуже вдалі авто в
                  хорошому стані, такі як Ford Focus 2013- або Wolksvagen Jetta
                  2012-. В такому випадку економія буде близько 40%. Як показує
                  практика за збільшення вартості авто збілшується і економія.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <OrderForm title="Залишились питання?" value="Отримати відповідь" />
      </section>
      <Footer />
    </>
  );
};

export default Answers;
