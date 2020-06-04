/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import Slider from "react-slick";
import allCars from "../../assets/img/availabCars/index";
import style from "./carAvailability.module.css";
import SVG from "../../assets/svg/index";
import CallBackBtn from "../CallBack/CallBackBtn";
import hitImg from "../../assets/img/hit.webp";
import avtoriaLogo from "../../assets/img/avtoriaLogo.jpg";
import ModalPhoto from "../ModalPhoto/ModalPhoto";

class carAvailability extends Component {
  state = {
    cars: [],
    modalImage: ""
  };

  componentDidMount() {
    this.setState({ cars: [...allCars] });
  }

  imageIncrease = photo => {
    this.setState({ modalImage: photo });
    document.body.style = " overflow: hidden ";
  };

  imageDecrease = () => {
    this.setState({ modalImage: "" });
    document.body.style = "";
  };

  render() {
    const ArrowLeft = props => {
      const { currentSlide, slideCount, ...arrowProps } = props;
      return <button {...arrowProps} className={style.prev} type="button" />;
    };

    const ArrowRight = props => {
      const { currentSlide, slideCount, ...arrowProps } = props;
      return <button {...arrowProps} className={style.next} type="button" />;
    };

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
    const { cars, modalImage } = this.state;
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
                      src={SVG.zoom}
                      className={style.zoomSvg}
                      alt="presentation"
                      onClick={() => this.imageIncrease(photo)}
                    />
                    <img
                      src={photo}
                      className={style.carPhoto}
                      alt="presentation"
                      id={photo.toString()}
                      role="presentation"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className={style.textContainer}>
              <h2 className={style.carName}>{car.carName}</h2>
              <p className={style.carPrice}>{car.price}$</p>
              <div className={style.innerWrapper}>
                <div className={style.iconsContainer}>
                  <img
                    src={SVG.year}
                    alt="presentation"
                    className={style.icon}
                  />
                  <p className={style.iconText}>{car.carYear}р.</p>
                </div>
                <div className={style.iconsContainer}>
                  <img
                    src={SVG.fuel}
                    alt="presentation"
                    className={style.icon}
                  />
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
            </div>
            {modalImage ? (
              <ModalPhoto
                photo={modalImage}
                imageDecrease={this.imageDecrease}
              />
            ) : null}
            <CallBackBtn text="Замовити авто" />
          </div>
        ))}
      </div>
    );
  }
}

export default carAvailability;
