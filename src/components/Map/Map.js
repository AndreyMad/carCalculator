/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from "react";
import style from "./Map.module.css";

const componentName = () => {
  return (
    <div className={style.mapContainer}>
      <iframe
        className={style.map}
        title="autonom map"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d635.8033708764533!2d30.372991155244723!3d50.3998588876884!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6d13656ddcec38b8!2sAutoNom!5e0!3m2!1sru!2sua!4v1586345284383!5m2!1sru!2sua"
        frameBorder="0"
        allowFullScreen=""
        tabIndex="0"
      />
    </div>
  );
};

export default componentName;
