/* eslint-disable camelcase */
import React from "react";
import style from "./Loader.module.css";

const Loader = () => {
  const cssload_inner_one = `${style.cssload_inner} ${style.cssload_one}`;
  const cssload_inner_two = `${style.cssload_inner} ${style.cssload_two}`;
  const cssload_inner_three = `${style.cssload_inner} ${style.cssload_three}`;

  return (
    <>
      <div className={style.overlay}>
        <div className={style.cssload_loader}>
          <div className={cssload_inner_one} />
          <div className={cssload_inner_two} />
          <div className={cssload_inner_three} />
        </div>
      </div>
    </>
  );
};

export default Loader;
