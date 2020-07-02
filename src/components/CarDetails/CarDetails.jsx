/* eslint-disable import/no-cycle */
import React from "react";
import PropTypes from "prop-types";
import style from "./CarDetails.module.css";
import CallBackBtn from "../CallBack/CallBackBtn";
import ErrorNotif from "../ErrorNotif/ErrorNotif";
import CarInfo from "../Carinfo/CarInfo";
import SearchCalc from "../SearchCalc/SearchCalc";

const CarDetails = ({
  error,
  car,
  averagePrice,
  lotPrice,
  selectedAuction
}) => {
  // console.log(error);
  //   console.log(car);
  //   console.log(averagePrice);
  //   console.log(lotPrice);
  //   console.log(selectedAuction);
  return (
    <>
      {error.length === 0 && car ? (
        <>
          {car.vin ? <CarInfo car={car} averagePrice={averagePrice} /> : null}

          {car.lot ? (
            <SearchCalc
              car={car}
              lotPrice={lotPrice}
              selectedAuction={selectedAuction}
            />
          ) : (
            <>
              {error.length === 0 ? (
                <p className={style.infoText}>
                  Для отримання повної вартості введіть номер лоту та очікувану
                  виграшну ставку
                </p>
              ) : (
                <ErrorNotif error={error} />
              )}
            </>
          )}
        </>
      ) : null}

      {error ? <ErrorNotif error={error} /> : null}

      {car && car.lot && error.length === 0 ? (
        <CallBackBtn
          carText={`Доброго дня, мене зацікавив автомобіль ${car.name}, за номером лоту №${car.lot}`}
        />
      ) : null}
    </>
  );
};

export default CarDetails;

CarDetails.propTypes = {
  error: PropTypes.string,
  car: PropTypes.shape({
    vin: PropTypes.string.isRequired,
    lot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  selectedAuction: PropTypes.string.isRequired,
  averagePrice: PropTypes.string,
  lotPrice: PropTypes.string
};
CarDetails.defaultProps = {
  error: "",
  averagePrice: "",
  lotPrice: "1000"
};
