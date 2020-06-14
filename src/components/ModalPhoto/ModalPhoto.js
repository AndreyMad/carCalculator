import React from "react";
import PropTypes from "prop-types";
import style from "./ModalPhoto.module.css";

const ModalPhoto = ({ photo, imageDecrease }) => {
  return (
    <div
      className={style.container}
      onClick={imageDecrease}
      onKeyDown={imageDecrease}
      role="presentation"
    >
      <div className={style.imgWrapper}>
        <img src={photo} className={style.image} alt="presentation" />
      </div>
    </div>
  );
};
ModalPhoto.propTypes = {
  photo: PropTypes.string.isRequired,
  imageDecrease: PropTypes.func.isRequired
};
export default ModalPhoto;
