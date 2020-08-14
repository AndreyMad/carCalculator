/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React, { Component } from "react";
import levenshtein from "fast-levenshtein";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
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
import CarDetails from "../../components/CarDetails/CarDetails";

class SearchPage extends Component {
  state = {
    car: {
      // currentBid: 0,
      // buyNow: 0,
      // lot: 26098920,
      // aucDate: 1587996000000,
      // vin: "2FMDK39C57B******",
      // name: "2007 FORD EDGE SEL PLUS",
      // year: 2007,
      // city: "SAVANNAH",
      // state: "GA",
      // location: "CA - SUN VALLEY",
      // seller: "State Farm Insurance",
      // fuel: "GAS",
      // engine: "3.5L  6",
      // highlights: "RUNS AND DRIVES",
      // odo: 183964,
      // capacity: 3.5,
      // images: [
      //   "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX236/6d16dcf5-cd4c-4bf2-ba6e-e2f7f383b1e6.JPG",
      //   "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX244/9db09217-40dc-4c08-84a4-77d61c06483a.JPG",
      //   "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX244/e83a2570-9914-4cc2-92fd-2ed5bca19c2d.JPG"
      // ],
      // doc: "GA - CERT OF TITLE-SALVAGE"
    },
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

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired,
    location: PropTypes.shape({}).isRequired
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
    const { history, match, location } = this.props;
    history.push(`${match.url}/${formValue}`);

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
          const { car } = res;

          if (res.error) {
            this.setState({ error: res.error, isLoading: false, formValue });
            return;
          }
          if (res.car) {
            const { photos } = res;

            if (photos.length > 1) {
              this.setState({
                car: { ...car, images: [...photos] },
                formValue,
                isLoading: false
              });
              return;
            }
          }
          this.setState({
            car: { ...car },
            formValue,
            isLoading: false
          });
        })
        // eslint-disable-next-line no-console
        .catch(err => console.log(err));
    } else if (formValue.length === 17) {
      API.getCarByVin(formValue.toUpperCase(), selectedAuction)
        .then(res => {
          if (res.err || res.error) {
            this.setState({
              error: res.err || res.error,
              isLoading: false,
              formValue
            });
          } else if (res.car) {
            const { car, photos } = res;

            this.setState({
              car: { ...car, images: photos },
              formValue,
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
      selectedAuction,
      formValue
    } = this.state;
    const { match } = this.props;
    const url = `${match.url}/${formValue}`;
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

              <Route
                path={url}
                render={() => {
                  return (
                    <CarDetails
                      averagePrice={averagePrice}
                      error={error}
                      lotPrice={lotPrice}
                      selectedAuction={selectedAuction}
                      car={car}
                    />
                  );
                }}
              />
            </div>
          </div>

          <Footer />
        </div>
      </>
    );
  }
}

export default SearchPage;
