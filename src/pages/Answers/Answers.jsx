import React from "react";
import style from "./Answers.module.css";

const Answers = () => {
  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <ul>
          <li className={style.spoiler}>
            <input type="checkbox" />
            <span className={style.question}>
              Як відбувається процес покупки
            </span>

            <div className={style.listInner}>
              <ul>
                <li>Обговорення ваших вимог до авто та бажаного бюджету.</li>
                <li>Заключення договору та внесення страхового депозиту</li>
                <li>Підбір та перевірка авто по базам страхових компаній</li>
                <li>Проведення торгів</li>
                <li>Оплата вартості авто та транспортування морем</li>
                <li>Доставка авто до порту Одесси або Клайпеди</li>
                <li>Оплата митних платежів та брокерських послуг</li>
                <li>Доставка авто за адресою клієнта або на сто</li>
              </ul>
            </div>
          </li>
          <li className={style.spoiler}>
            <input type="checkbox" />
            <span className={style.question}>
              Чи можливо отримати відремонтоване і зареєстроване авто
            </span>

            <div className={style.listInner}>
              <p>
                Так. Компанія Автоном займається повним спектром послуг з
                доставки та ремонту авто. Тому за вашим бажанням ми можемо
                підібрати необхідні деталі та відновити Ваш автомобіль до
                ідеального стану. Провести сертифікацію та постановку на облік в
                сервісних центрах України.
              </p>
            </div>
          </li>
          <li className={style.spoiler}>
            <input type="checkbox" />
            <span className={style.question}>
              Скільки часу займає доставка авто
            </span>

            <div className={style.listInner}>
              <p>В середньому близько 35 днів.</p>
            </div>
          </li>
          <li className={style.spoiler}>
            <input type="checkbox" />
            <span className={style.question}>
              Які етапи та скільки часу займає доставка авто
            </span>

            <div className={style.listInner}>
              <p>
                Після придбання авто відбувається його транспортування до порту
                відправки, потім завантаження в контейнер та транспортування
                морем. Та після прибуття транспортування за адресою клієнта.
                Повний цикл займає близько 35 днів.{" "}
              </p>
            </div>
          </li>
          <li className={style.spoiler}>
            <input type="checkbox" />
            <span className={style.question}>
              Чи можу я повернути страховий депозит
            </span>

            <div className={style.listInner}>
              <p>
                Страховий депозит можливо повернути тільки до моменту покупки
                авто на аукціоні. Після виграшу авто страховий депозит іде в
                рахунок оплати за авто або ж привідмові клієнта, на погашенні
                штрафних санкцій аукціону.
              </p>
            </div>
          </li>
          <li className={style.spoiler}>
            <input type="checkbox" />
            <span className={style.question}>
              З якої ціни вигідно купувати авто в США{" "}
            </span>

            <div className={style.listInner}>
              <p>
                Від 6000$. За цю суму можливо придбати дуже вдалі авто в
                хорошому стані, такі як Ford Focus 2013- або Wolksvagen Jetta
                2012-. В такому випадку економія буде близько 30%. Як показує
                практика за збільшення вартості авто збілшується і економія.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Answers;
