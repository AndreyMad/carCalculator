import React from "react";
import PropTypes from "prop-types";
import backImage from "../../assets/img/back-button-logo-png-3.png";
import style from "./GoBack.module.css";

const GoBack = ({ goBack }) => {
  return (
    <>
      <button type="button" onClick={goBack} className={style.button}>
        <img src={backImage} alt="presentation" />
      </button>
    </>
  );
};
GoBack.propTypes = {
  goBack: PropTypes.func.isRequired
};
export default GoBack;
