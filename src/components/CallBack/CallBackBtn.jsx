import React from "react";
import PropTypes from "prop-types";
import style from "./CallBack.module.css";

const CallBackBtn = ({ toggleModal }) => {
  return (
    <button
      className={style.CallBackButton}
      type="button"
      onClick={toggleModal}
    >
      Замовити консультацію
    </button>
  );
};

export default CallBackBtn;

CallBackBtn.propTypes = {
  toggleModal: PropTypes.func.isRequired
};
