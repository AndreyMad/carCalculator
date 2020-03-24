/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import style from "./CarInfo.module.css";

const CarInfo = ({ car }) => {
  const aucDate = Date(car.aucDate);
  const imgSrc = car.image[0]
    .replace("width=161", "width=800")
    .replace("height=120", "height=600");

  return (
    <div className={style.container}>
      <div className={style.outWrapper}>
        <h1 className={style.title}>Информация о лоте</h1>
        <h2 className={style.carName}>{car.name}</h2>
        <img src={imgSrc} className={style.image} alt="car" />
        <div className={style.wrapper}>
          <p className={style.carName}>Автомобиль: {car.name}</p>
          <p className={style.carLot}>Номер лота: {car.lot}</p>
          <p className={style.AuctionDate}>Дата аукциона: {aucDate}</p>
          <p className={style.carEngine}>Двигатель: {car.engine}</p>
          <p className={style.carFuel}>Топливо: {car.fuel}</p>
          <p className={style.carOdometr}>Пробег: {car.odo}</p>
          <p className={style.carTittle}>Tittle: {car.doc}</p>
          <p className={style.carRunAndDrive}>
            Run and Drive: {car.runAndDrive ? "Yes" : "No"}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
