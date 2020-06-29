import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import style from "./PartsPage.module.css";
import Footer from "../../components/Footer/Footer";
import SVG from "../../assets/svg/index";
import "react-notifications/lib/notifications.css";
import * as API from "../../api/api";

class PartsPage extends Component {
  state = { name: "", phone: "", coment: "" };

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };

  submit = e => {
    e.preventDefault();
    const { name, phone, comment } = this.state;
    if (name.length < 3 || phone.length < 7) {
      NotificationManager.error(
        "Не коректне ім'я або номер телефону!",
        "Помилка",
        3000
      );
      return;
    }

    API.sendMessageTelegram(
      `Імя: ${name}, Телефон: ${phone}, Коментар: ${comment}`
    )
      .then(res => {
        return res.data.ok ? (
          (NotificationManager.success(
            "Дякуюмо за звернення, ми зв'яжемось з Вами найближчим часом.",
            "Успішно"
          ),
          this.setState({ name: "", phone: "", comment: "" }))
        ) : (
          <span>Щось пішло не так. Спробуйте ще раз</span>
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { name, phone, coment } = this.state;

    return (
      <>
        <section className={style.container}>
          <div className={style.titleContainer}>
            <div className={style.shadow}>
              <h2 className={style.title}>Замовити автозапчастини</h2>
              <h2 className={style.title2}> Замовити автозапчастини з США.</h2>

              <p className={style.span}>
                Окрім безпосередньої покукпи авто з США, багато власників хотіли
                б придбати автозапчастини для ремонту та обслуговування свого
                авто
              </p>
            </div>
          </div>

          <div className={style.formContainer}>
            <div className={style.whiteShadow}>
              <p>
                Ми співпрацюємо з постачальниками з Європи, США, Японії,
                Арабських Еміратів та інших. Тому ви зможете бути впевенні що
                отримаєте тільки якісні деталі за найнижчоюб ціною.
              </p>
              <p>
                Заповніть форму нижче і наші співробітники нададуть вам
                необхідну інформацію щодо ремонту авто.
              </p>
              <form className={style.form} onSubmit={this.submit}>
                <input
                  type="text"
                  value={name}
                  placeholder="Ваше імя*"
                  id="name"
                  onChange={this.handleChange}
                />
                <input
                  type="number"
                  placeholder="Ваш телефон*"
                  id="phone"
                  value={phone}
                  onChange={this.handleChange}
                />
                <textarea
                  type="text"
                  id="coment"
                  value={coment}
                  placeholder="Коментар"
                  onChange={this.handleChange}
                />
                <input
                  type="submit"
                  className={style.submitBtn}
                  value="Отримати консультацію"
                />
              </form>
            </div>
          </div>
          <div className={style.listContainer}>
            <div className={style.shadow}>
              <h3 className={style.subTitle}>
                Наявність на наших складах більш 100000 позиці, серед яких такі
                групи деталей:
              </h3>
              <ul className={style.list}>
                <li className={style.item}>
                  <img
                    src={SVG.carDoors}
                    className={style.svg}
                    alt="presentation"
                  />
                  <span> кузовні елементи:</span>

                  <span> крила, бампери, капоти, фари і т.д.</span>
                </li>
                <li className={style.item}>
                  <img
                    src={SVG.filter}
                    className={style.svg}
                    alt="presentation"
                  />
                  <span> розхідні матеріали:</span>

                  <span> фільтра, мастила, ремені</span>
                </li>
                <li className={style.item}>
                  <img
                    src={SVG.tyres}
                    className={style.svg}
                    alt="presentation"
                  />
                  <span> елементи шассі:</span>

                  <span> амортизатори, пружини, пневмобалони</span>
                </li>
                <li className={style.item}>
                  <img
                    src={SVG.steering}
                    className={style.svg}
                    alt="presentation"
                  />
                  <span> елементи рульового управління:</span>

                  <span> рейки, насоси, вали, тяги</span>
                </li>
                <li className={style.item}>
                  <img
                    src={SVG.brake}
                    className={style.svg}
                    alt="presentation"
                  />
                  <span> деталі гальмівної системи:</span>

                  <span> диски, колодки, датчики</span>
                </li>
                <li className={style.item}>
                  <img
                    src={SVG.plug}
                    className={style.svg}
                    alt="presentation"
                  />
                  <span> елементи сисеми запалювання:</span>

                  <span> свічки, катушки, модулі</span>
                </li>
                <li className={style.item}> та багато іншого</li>
              </ul>
            </div>
          </div>
          <NotificationContainer />
        </section>
        <Footer />
      </>
    );
  }
}

export default PartsPage;
