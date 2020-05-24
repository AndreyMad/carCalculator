import React from "react";
import Footer from "../Footer/Footer";
import styles from "./About.module.css";
import CallBackBtn from "../CallBack/CallBackBtn";

const About = () => {
  return (
    <>
      <section className={styles.advantage}>
        <div className={styles.about_wrapper}>
          <h2 className={styles.Title}>Про нас</h2>
          <p className={styles.about}>
            Компанія автоном успішно працює на ринку більж 8 років. Ми проводимо
            повний цикл починаючи від консультації клієнта і до постановки
            автомобіля на облік в сервісному центрі. Залиште заявку або
            зателефонуйте нам і ви отримаєте відповіді на всі ваші питання
            стосовно автомобіля з сша.
          </p>
          <CallBackBtn styles={{ margin: "30px auto" }} />
          <h2 className={styles.Title}>Переваги роботи з нами:</h2>
          <ul className={styles.list}>
            <li className={styles.item}>
              <h2 className={styles.Item_Title}>
                Найвищий рівень обслуговування
              </h2>

              <p className={styles.about}>
                Компанія Автоном це команда професіоналів яка в найкоротші сроки
                надасть Вам актуальну інформацію та здійснить професійний підбір
                автомобіля, згідно Ваших побажань та бюджету.
              </p>
            </li>
            <li className={styles.item}>
              <h2 className={styles.Item_Title}>
                Одні з найкращих тарифів на ринку
              </h2>

              <p className={styles.about}>
                Завдяки довгостроковим відносинам та оптовим поставкам авто, ми
                можемо запропонувати нашим клієнтам найкращі ціни та умови
                доставки авто за США.
              </p>
            </li>
            <li className={styles.item}>
              <h2 className={styles.Item_Title}>
                Гарантія безпеки та збереження авто до отримання власником
              </h2>

              <p className={styles.about}>
                Купівля авто проходить згідно договору, всі платежі покупець
                здійснює самостійно в касі банку Swift переказом. Всі автомобілі
                застраховані в найкращих страхових компаніях світу.
              </p>
            </li>
            <li className={styles.item}>
              <h2 className={styles.Item_Title}>
                Гнучкі умови дилерського співробітництва
              </h2>

              <p className={styles.about}>
                Якщо ви розумієтесь на авто і у вас є бажання займатись цією
                діяльністю, зв&apos;яжіться за нашим менеджером для отримання
                дилерської пропозиції.
              </p>
            </li>
            <li className={styles.item}>
              <h2 className={styles.Item_Title}>
                Найкращі ціни на автозапчастини
              </h2>

              <p className={styles.about}>
                Одним із напрямків діяльності компаніїї являється доставка і
                продаж автозапчастин. Ми співпрацюємо з постачальниками з
                Європи, США, Японії, Арабських Еміратів та інших. Тому при
                замовленні авто у нас Ви можете бути впевнені в тому що
                отримаєте якісні запасні частини за найкращими цінами на ринку.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
