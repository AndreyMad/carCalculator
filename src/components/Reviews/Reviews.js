import React from "react";
import Slider from "react-slick";
import { Player } from "video-react";
import style from "./Reviews.module.css";
import VIDEO from "../../assets/video/index";

import "video-react/dist/video-react.css";

const Reviews = () => {
  return (
    <div className={style.container}>
      <Slider>
        {VIDEO.map(el => (
          <Player className={style.video} key={el.indexOf()}>
            <source src={el} />
          </Player>
        ))}
      </Slider>
    </div>
  );
};

export default Reviews;
