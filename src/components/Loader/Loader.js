/* eslint-disable camelcase */
import React from "react";
import style from "./Loader.module.css";

const componentName = () => {
  const strike_strike2 = `${style.strike} ${style.strike2}`;
  const strike_strike3 = `${style.strike} ${style.strike3}`;
  const strike_strike4 = `${style.strike} ${style.strike4}`;
  const strike_strike5 = `${style.strike} ${style.strike5}`;
  const carDetail_spoiler = `${style.car_detail} ${style.strike5}`;
  const carDetail_back = `${style.car_detail} ${style.back}`;
  const carDetail_center = `${style.car_detail} ${style.center}`;
  const carDetail_center1 = `${style.car_detail} ${style.center1}`;
  const carDetail_front = `${style.car_detail} ${style.front}`;
  const carDetail_wheel = `${style.car_detail} ${style.wheel}`;
  const carDetail_wheel2 = `${style.car_detail} ${style.wheel2}`;

  return (
    <div className={style.loading_window}>
      <div className={style.car}>
        <div className={style.strike} />
        <div className={strike_strike2} />
        <div className={strike_strike3} />
        <div className={strike_strike4} />
        <div className={strike_strike5} />
        <div className={carDetail_spoiler} />
        <div className={carDetail_back} />
        <div className={carDetail_center} />
        <div className={carDetail_center1} />
        <div className={carDetail_front} />
        <div className={carDetail_wheel} />
        <div className={carDetail_wheel2} />
      </div>

      <div className={style.text}>
        <span>Loading</span>
        <span className={style.dots}>...</span>
      </div>
    </div>
  );
};

export default componentName;
