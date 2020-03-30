/* eslint-disable no-console */
import axios from "axios";
/* eslint-disable no-unused-vars */

const getAveragePrice = () => {
  axios
    .get("http://45.11.24.158/priceAvg?make=TESLA&model=Model%20s&year=2017")
    .then(res => console.log(res));
};
getAveragePrice();

export const getCarNames = () => {
  axios.get("http://45.11.24.158/makes").then(res => {
    console.log(res);
  });
};
// getCarNames();

export const getLotInfo = async (lot, price) => {
  return axios
    .post(
      "http://45.11.24.158/priceCopart",
      `lot=${lot}&price=${price || 1000}`
    )
    .then(res => res);
};
