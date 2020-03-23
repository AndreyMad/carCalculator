import React from "react";
import style from "./CarInfo.module.css";

const CarInfo = ({ car }) => {
  const aucDate = Date(car.aucDate);
  const imgSrc = car.image[0];

  return (
    <div className={style.container}>
      <h1 className={style.title}>{car.name}</h1>
      <img src={car.image[0]} className={style.image} alt="car" />
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
  );
};

export default CarInfo;
