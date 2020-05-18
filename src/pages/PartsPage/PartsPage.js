import React, { Component } from "react";
import style from "./PartsPage.module.css";

class PartsPage extends Component {
  state = { name: "", phone: "", coment: "" };

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };

  submit = () => {
    console.log("work");
  };

  render() {
    const { name, phone, coment } = this.state;

    return (
      <>
        <h2 className={style.title}>
          Запчастини з Америки. Замовити автозапчастини з США
        </h2>
        <p>
          Окрім безпосередньої покукпи авто з США, багато власників хотіли б
          придбати автозапчастини для ремонту та обслуговування свого авто
        </p>
        <p>
          Заповніть форму нижче і наші співробітники нададуть вам необхідну
          інформацію щодо ремонту авто.
        </p>
        <form onSubmit={this.submit}>
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
          <input
            type="text"
            id="coment"
            value={coment}
            placeholder="Коментар"
            onChange={this.handleChange}
          />
          <input type="submit" value="Замовити" />
        </form>
        <p>
          Ми співпрацюємо з постачальниками з Європи, США, Японії, Арабських
          Еміратів та інших. Тому ви зможете бути впевенні що отримаєте тільки
          якісні деталі за найнижчоюб ціною.
        </p>
        <ul>
          <li>
            Наявність на наших складах більш 100000 позиці, серед яких такі
            групи деталей:
          </li>
          <li>кузовні елементи: крила, бампери, капоти, фари і т.д.</li>
          <li>розхідні елементи: фільтра, мастила, ремені</li>
          <li>елементи шассі: амортизатори, пружини, пневмобалониважелі</li>
          <li>елементи рульового управління: рейки, насоси, вали, тяги</li>
          <li>деталі гальмівної системи: диски, колодки, датчики</li>
          <li>елементи сисеми запалювання: свічки, катушки, модулі</li>
          <li>та багато іншого</li>
        </ul>
      </>
    );
  }
}

export default PartsPage;
