/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import Slider from "react-slick";
import allCars from "../../assets/img/availabCars/index";
import style from "./carAvailability.module.css";
import SVG from "../../assets/svg/index";
import CallBackBtn from "../CallBack/CallBackBtn";
import hitImg from "../../assets/img/hit.webp";
import avtoriaLogo from "../../assets/img/avtoriaLogo.jpg";

class carAvailability extends Component {
  state = {
    cars: []
  };

  componentDidMount() {
    this.setState({ cars: [...allCars] });
  }

  render() {
    const ArrowLeft = props => <button {...props} className={style.prev} />;
    const ArrowRight = props => <button {...props} className={style.next} />;

    const settings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: true,
      prevArrow: <ArrowLeft />,
      nextArrow: <ArrowRight />,
      appendDots: dots => (
        <div
          style={{
            borderRadius: "10px",
            padding: "10px"
          }}
        >
          <ul style={{ margin: "0px" }}> {dots} </ul>
        </div>
      )
    };
    const { cars } = this.state;
    return (
      <div className={style.container}>
        <h2 className={style.title}>Або замов авто з наявності</h2>
        {cars.map(car => (
          <div className={style.outWrapper} key={car.carName}>
            {car.hit ? (
              <img src={hitImg} className={style.hitLogo} alt="presentation" />
            ) : null}
            <div className={style.sliderWrapper}>
              <Slider {...settings}>
                {car.photos.map(photo => (
                  <div
                    className={style.sliderInnerWrapper}
                    key={photo.indexOf()}
                  >
                    <img
                      src={photo}
                      className={style.carPhoto}
                      alt="presentation"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <h2 className={style.carName}>{car.carName}</h2>
            <p className={style.carPrice}>{car.price}$</p>
            <div className={style.innerWrapper}>
              <div className={style.iconsContainer}>
                <img src={SVG.year} alt="presentation" className={style.icon} />
                <p className={style.iconText}>{car.carYear}р.</p>
              </div>
              <div className={style.iconsContainer}>
                <img src={SVG.fuel} alt="presentation" className={style.icon} />
                <p className={style.iconText}>{car.engineType}</p>
              </div>
              <div className={style.iconsContainer}>
                <img
                  src={SVG.engineCapacity}
                  alt="presentation"
                  className={style.icon}
                />
                <p className={style.iconText}>{car.capacity}л.</p>
              </div>
              <div className={style.iconsContainer}>
                <img
                  src={SVG.odometer}
                  alt="presentation"
                  className={style.icon}
                />
                <p className={style.iconText}>{car.odo}км.</p>
              </div>
              <div className={style.iconsContainer}>
                <img
                  src={SVG.defAxle}
                  alt="presentation"
                  className={style.icon}
                />
                <p className={style.iconText}>{car.drive}</p>
              </div>
            </div>
            <p className={style.averagePrice}>
              Середня ціна на
              <img
                className={style.avtoriaLogo}
                src={avtoriaLogo}
                alt="presentation"
              />
              <span>{car.averagePrice}$</span>
            </p>
            <CallBackBtn text="Замовити авто" />
          </div>
        ))}
      </div>
    );
  }
}

export default carAvailability;
