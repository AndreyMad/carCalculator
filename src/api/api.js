import axios from "axios";

export const getCarByLot = (lot, price = 1000) => {
  const car = axios
    .post("http://45.11.24.158/priceCopart", `lot=${lot}&price=${price}`)
    .then(res => res.data);
  return car;
};

export const getCarsMakes = () => {
  return axios.get("http://45.11.24.158/makes");
};
export const getAveragePrice = () => {
  axios
    .get("http://45.11.24.158/priceAvg?make=TESLA&model=Model%20s&year=2017")
    .then(res => res);
};
