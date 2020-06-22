/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React, { Component } from "react";
import levenshtein from "fast-levenshtein";
import * as API from "../../api/api";
import makes from "../../assets/data/makes.json";
import SearchForm from "../../components/SearchForm/SearchForm";
import CarInfo from "../../components/Carinfo/CarInfo";
import ErrorNotif from "../../components/ErrorNotif/ErrorNotif";
import Loader from "../../components/Loader/Loader";
import SearchCalc from "../../components/SearchCalc/SearchCalc";
import Footer from "../../components/Footer/Footer";
import CallBackBtn from "../../components/CallBack/CallBackBtn";
import style from "./SearchPage.module.css";

class SearchPage extends Component {
  state = {
    car: {},
    averagePriceCar: {
      make: "",
      model: "",
      year: ""
    },
    averagePrice: "",
    isLoading: false,
    error: "",
    lotPrice: "",
    selectedAuction: ""
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps, prevState) {
    const { averagePriceCar, car } = this.state;

    if (
      JSON.stringify(prevState.averagePriceCar) !==
      JSON.stringify(averagePriceCar)
    ) {
      this.averagePriceHelper(car.name);
      this.getAveragePrice(averagePriceCar);
    }
  }

  abortLoading = () => {
    this.setState({
      isLoading: false
    });
  };

  averagePriceHelper = car => {
    const arrayData = car.split(" ");
    const carYear = arrayData[0];
    const carMake = arrayData[1];
    const altCarMake = `${arrayData[1]} ${arrayData[2]}`;
    const carName = makes.find(el => {
      if (
        el.toLowerCase() === carMake.toLowerCase() ||
        el.toLowerCase() === altCarMake.toLowerCase()
      ) {
        return el;
      }
      return null;
    });
    const from =
      car.toLowerCase().search(carName.toLowerCase()) + carName.length + 1;
    const carModelToEqual = car.substr(from, car.length);
    const getModel = (models, modelCar) => {
      let initValueLevenstein = 100;
      let valueToReturn = "";
      for (const model of models) {
        if (levenshtein.get(model, modelCar) < initValueLevenstein) {
          initValueLevenstein = levenshtein.get(model, modelCar);
          valueToReturn = model;
        }
      }

      return valueToReturn;
    };
    const carModelsFromResponse = carNameToResp => {
      const modelsFromrRes = [];
      API.getModels(carNameToResp)
        .then(res => {
          return res.data;
        })
        .then(data => data.forEach(el => modelsFromrRes.push(el)))
        .then(data => getModel(modelsFromrRes, carModelToEqual))
        .finally(data =>
          this.setState({
            averagePriceCar: {
              make: carNameToResp,
              model: getModel(modelsFromrRes, carModelToEqual),
              year: carYear
            }
          })
        );
    };

    carModelsFromResponse(carName);
  };

  getAveragePrice = car => {
    this.averagePriceHelper(car.name);
    return API.getAveragePrice(car).then(res => {
      this.setState({ averagePrice: res.data.price });
    });
  };

  formSubmit = (formValue, selectedAuction, lotPrice) => {
    this.setState({
      isLoading: true,
      lotPrice,
      selectedAuction,
      car: {},
      error: ""
    });
    if (formValue.length === 8) {
      API.getCarByLot(formValue, selectedAuction)
        .then(res => {
          if (res.error) {
            this.setState({ error: res.error, isLoading: false });
            return;
          }
          if (res.car) {
            const { car } = res;
            const { photos } = res;
            const photoArray = photos.substr(1, photos.length - 2).split(",");
            const newPhotoArray = photoArray.map(el => {
              return el.substr(1, el.length - 2);
            });
            this.setState({
              car: { ...car, images: newPhotoArray },

              isLoading: false
            });
          }
        })
        // eslint-disable-next-line no-console
        .catch(err => console.log(err));
    } else if (formValue.length === 17) {
      API.getCarByVin(formValue, selectedAuction)
        .then(res => {
          if (res.err) {
            this.setState({ error: res.resp, isLoading: false });
          } else if (res.car) {
            const { car } = res;
            const { photos } = res;
            const photoArray = photos.substr(1, photos.length - 2).split(",");
            const newPhotoArray = photoArray.map(el => {
              return el.substr(1, el.length - 2);
            });
            this.setState({
              car: { ...car, images: newPhotoArray },

              isLoading: false
            });
          }
        })
        // eslint-disable-next-line no-console
        .catch(err => console.log(err));
    }
  };

  render() {
    const {
      car,
      isLoading,
      averagePrice,
      error,
      lotPrice,
      selectedAuction
    } = this.state;
    return (
      <>
        {isLoading ? <Loader abortLoading={this.abortLoading} /> : null}
        <div className={style.container}>
          <div className={style.wrapper}>
            <div className={style.shadow}>
              {car && car.lot && car.lot ? null : (
                <div className={style.marginContainer} />
              )}
              <SearchForm formSubmit={this.formSubmit} />

              {error.length === 0 && car ? (
                <>
                  {car.images ? (
                    <CarInfo car={car} averagePrice={averagePrice} />
                  ) : null}

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
                          Для отримання повної вартості введіть номер лоту та
                          очікувану виграшну ставку
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
            </div>
          </div>

          <Footer />
        </div>
      </>
    );
  }
}

export default SearchPage;
