/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import style from "./CarInfo.module.css";
import * as API from "../../api/api";

const CarInfo = ({ car, averagePrice }) => {
  const auctionDateTime = aucDate => {
    const dateToParse = new Date(aucDate);
    const aucDay = dateToParse.getDate().toString();
    const aucMonth = dateToParse.getMonth().toString();
    const aucYear = dateToParse.getFullYear().toString();
    const auctHour = dateToParse.getHours().toString();
    const aucMin = dateToParse.getMinutes().toString();
    return `${aucDay.length > 1 ? aucDay : `0${aucDay}`}.${
      aucMonth.length > 1 ? aucMonth : `0${aucMonth}`
    }.${aucYear}г., ${auctHour.length > 1 ? auctHour : `0${auctHour}`}:${
      aucMin.length > 1 ? aucMin : `0${aucMin}`
    }`;
  };

  const imgSrc = car.images[0]
    .replace("width=161", "width=1200")
    .replace("height=120", "height=800");

  return (
    <div className={style.container}>
      <div className={style.outWrapper}>
        <h1 className={style.title}>Информация о лоте</h1>
        <h2 className={style.carName}>{car.name}</h2>
        <img src={imgSrc} className={style.image} alt="car" />
        <div className={style.wrapper}>
          <p className={style.text}>
            Номер лота: <span className={style.span}>{car.lot}</span>
          </p>
          <p className={style.text}>
            Дата аукциона: {auctionDateTime(car.aucDate)}
          </p>
          <p className={style.text}>Двигатель: {car.engine}</p>
          <p className={style.text}>Топливо: {car.fuel}</p>
          <p className={style.text}>Пробег: {car.odo}</p>
          <p className={style.text}>Tittle: {car.doc}</p>
          <p className={style.text}>
            Run and Drive: {car.runAndDrive ? "Yes" : "No"}{" "}
          </p>
          <p className={style.text}>Средняя цена{averagePrice}</p>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
