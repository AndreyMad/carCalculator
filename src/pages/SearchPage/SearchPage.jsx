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

class SearchPage extends Component {
  state = {
    car: {
      currentBid: 0,
      buyNow: 0,
      lot: 26098920,
      aucDate: 1587996000000,
      vin: "2FMDK39C57B******",
      name: "2007 FORD EDGE SEL PLUS",
      year: 2007,
      city: "SAVANNAH",
      state: "GA",
      seller: "State Farm Insurance",
      fuel: "GAS",
      engine: "3.5L  6",
      highlights: "RUNS AND DRIVES",
      odo: 183964,
      capacity: 3.5,
      images: [
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX236/6d16dcf5-cd4c-4bf2-ba6e-e2f7f383b1e6.JPG",
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX244/9db09217-40dc-4c08-84a4-77d61c06483a.JPG",
        "https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX244/e83a2570-9914-4cc2-92fd-2ed5bca19c2d.JPG"
      ],
      doc: "GA - CERT OF TITLE-SALVAGE"
    },
    averagePriceCar: {
      make: "",
      model: "",
      year: ""
    },
    averagePrice: "",
    isLoading: false,
    error: "",
    lotPrice: ""
  };

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
    console.log("start");
    // const { car } = this.state;
    this.averagePriceHelper(car.name);
    return API.getAveragePrice(car).then(res => {
      this.setState({ averagePrice: res.data.price });
    });
  };

  formSubmit = (value, selectedAuction, lotPrice) => {
    this.setState({ isLoading: true, lotPrice });
    API.getCarByLot(value, selectedAuction)
      .then(res => {
        if (res.err) {
          this.setState({ error: res.resp, isLoading: false });
        } else if (res.car) {
          this.setState({ car: res.car, isLoading: false });
        }
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  };

  render() {
    const { car, isLoading, averagePrice, error, lotPrice } = this.state;
    return (
      <>
        {isLoading ? <Loader /> : null}
        <SearchForm formSubmit={this.formSubmit} />
        {car.images ? <CarInfo car={car} averagePrice={averagePrice} /> : null}
        {error ? <ErrorNotif error={error} /> : null}
        {car.lot > 5 ? <SearchCalc car={car} lotPrice={lotPrice} /> : null}
      </>
    );
  }
}

export default SearchPage;
