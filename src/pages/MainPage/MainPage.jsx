import React, { Component } from "react";
import Map from "../../components/Map/Map";
import style from "./MainPage.module.css";
import phoneSvg from "../../assets/svg/phone.svg";
import viberSvg from "../../assets/svg/viberSvg.svg";

class MainPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <div className={style.phoneContainer}>
          <div className={style.phoneWrapper}>
            <img
              className={style.phoneSvg}
              alt="phone"
              src={phoneSvg}
              role="presentation"
            />

            <a href="tel: +380979011449" className={style.phoneLink}>
              +38 097 9011449
            </a>
          </div>
          <div className={style.phoneWrapper}>
            <img
              className={style.phoneSvg}
              alt="phone"
              src={phoneSvg}
              role="presentation"
            />

            <a href="tel: +380979011449" className={style.phoneLink}>
              +38 097 9011449
            </a>
          </div>
          <div className={style.phoneWrapper}>
            <img
              className={style.phoneSvg}
              alt="phone"
              src={viberSvg}
              role="presentation"
            />

            <a href="tel: +380979011449" className={style.phoneLink}>
              +38 097 9011449
            </a>
          </div>
        </div>
        <Map />
      </div>
    );
  }
}

export default MainPage;
