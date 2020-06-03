import React, { Component } from "react";
import style from "./PartsPage.module.css";
import Footer from "../../components/Footer/Footer";
import SVG from "../../assets/svg/index";

class PartsPage extends Component {
  state = { name: "", phone: "", coment: "" };

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };

  submit = () => {
    // console.log("work");
  };

  render() {
    const { name, phone, coment } = this.state;

    return (
      <>
        <section className={style.container}>
          <div className={style.titleContainer}>
            <div className={style.shadow}>
              <h2 className={style.title}>Запчастини з Америки</h2>
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
                  placeholder="Ваше імя"
                  id="name"
                  onChange={this.handleChange}
                />
                <input
                  type="number"
                  placeholder="Ваш телефон"
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
                    src={SVG.carDoors}
                    className={style.svg}
                    alt="presentation"
                  />
                  <span> розхідні матеріали:</span>

                  <span> фільтра, мастила, ремені</span>
                </li>
                <li className={style.item}>
                  <img
                    src={SVG.carDoors}
                    className={style.svg}
                    alt="presentation"
                  />
                  <span> елементи шассі:</span>

                  <span> амортизатори, пружини, пневмобалони</span>
                </li>
                <li className={style.item}>
                  <img
                    src={SVG.carDoors}
                    className={style.svg}
                    alt="presentation"
                  />
                  <span> елементи рульового управління:</span>

                  <span> рейки, насоси, вали, тяги</span>
                </li>
                <li className={style.item}>
                  <img
                    src={SVG.carDoors}
                    className={style.svg}
                    alt="presentation"
                  />
                  <span> деталі гальмівної системи:</span>

                  <span> диски, колодки, датчики</span>
                </li>
                <li className={style.item}>
                  <img
                    src={SVG.carDoors}
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
        </section>
        <Footer />
      </>
    );
  }
}

export default PartsPage;
