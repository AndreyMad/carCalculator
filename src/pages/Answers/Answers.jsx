import React from "react";
import style from "./Answers.module.css";

const Answers = () => {
  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <ul>
          <li className={style.spoiler}>
            <input type="checkbox" />
            <span className={style.question}>питання</span>

            <div className={style.listInner}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima
              explicabo iusto quidem eius ipsam a animi ea suscipit illo quo.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              pariatur sed quae aperiam fugiat minima. Aliquid ipsa inventore
              mollitia nobis unde numquam voluptas, deleniti impedit debitis
              excepturi asperiores animi quia placeat, alias autem repellat,
              illum corporis recusandae quibusdam nemo at! Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Quisquam necessitatibus earum
              nostrum nemo, iure eveniet placeat eligendi tempora fuga sed,
              perspiciatis magnam aspernatur? Magnam reiciendis pariatur
              incidunt corporis? Perspiciatis eum iusto est eveniet sunt
              doloribus quasi ipsum maiores, dolorem deserunt? Est, corporis.
              Provident eaque repudiandae voluptate cum itaque delectus nam
              beatae fugiat veniam cumque, reprehenderit corporis quisquam,
              velit magni, sint distinctio eius! Pariatur natus qui, sint omnis
              corporis quo corrupti?
            </div>
          </li>

          <li>5</li>
          <li>4</li>
          <li>3</li>
          <li>2</li>
          <li>1</li>
        </ul>
      </div>
    </section>
  );
};

export default Answers;
