/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import style from "./CarInfo.module.css";
import * as API from "../../api/api";
import okSvg from "../../assets/svg/ok.svg";
import falseSvg from "../../assets/svg/falseSvg.svg";
import ShowMoreBtn from "../ShowMore/ShowMoreBtn";
import noPhoto from "../../assets/img/noPhoto.png";

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
  const runAndDrive = car.highlights === "RUNS AND DRIVES";
  const imgSrc =
    (car.images &&
      car.images[0]
        .replace("width=161", "width=1200")
        .replace("height=120", "height=800")) ||
    noPhoto;
  const engineCapacity = car.vol || (car.engine && car.engine.slice(0, 3));
  return (
    <div className={style.container}>
      <div className={style.outWrapper}>
        <div className={style.titleWrapper}>
          <h1 className={style.title}>Інформація про лот</h1>
          <h2 className={style.carName}>{car.name}</h2>
          <img src={imgSrc} className={style.image} alt="car" />
        </div>

        <div className={style.aboutWrapper}>
          <p className={style.text}>
            Номер лоту: <span className={style.span}>{car.lot}</span>
          </p>
          <p className={style.text}>
            VIN:
            <span className={style.span}>{car.vin}</span>
          </p>
          {engineCapacity && (
            <p className={style.text}>
              Двигун:
              <span className={style.span}>
                {Math.round(engineCapacity * 100) / 100}л.
              </span>
            </p>
          )}
          {car.fuel && (
            <p className={style.text}>
              Паливо: <span className={style.span}>{car.fuel}</span>
            </p>
          )}
          {}{" "}
          <p className={style.text}>
            Пробіг:
            <span className={style.span}>{car.miles || car.odometer}</span>
          </p>
          {car.privod && (
            <p className={style.text}>
              Привід: <span className={style.span}>{car.privod}</span>
            </p>
          )}
          {car.docs && (
            <p className={style.text}>
              Тайтл: <span className={style.span}>{car.docs}</span>
            </p>
          )}
          {car.seller && (
            <p className={style.text}>
              Продавець: <span className={style.span}>{car.seller}</span>
            </p>
          )}
          <p className={style.text}>
            Run and Drive:
            {runAndDrive ? (
              <img src={okSvg} className={style.svg} alt="ok" />
            ) : (
              <img
                src={falseSvg}
                className={style.svg}
                alt="presentational images"
              />
            )}
          </p>
          {car.avgPrice && (
            <p className={style.text}>
              Середня авто на аукціоні:
              <span className={style.span}>{car.avgPrice}$</span>
            </p>
          )}
        </div>
      </div>

      {car.images && <ShowMoreBtn images={car.images} />}
    </div>
  );
};

export default CarInfo;
