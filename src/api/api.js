import axios from "axios";

export const getCarByLot = (lot, selectedAuction, price = 1000) => {
  const car = axios
    .post(
      `https://45.11.24.158/price${selectedAuction}`,
      `lot=${lot}&price=${price}`
    )
    .then(res => res.data);
  return car;
};

export const getCarsMakes = () => {
  return axios.get("https://45.11.24.158/makes");
};

export const getAveragePrice = (make, model, year) => {
  return axios
    .get(
      `https://45.11.24.158/priceAvg?make=${make}&model=${model}&year=${year}`
    )
    .then(res => res);
};
