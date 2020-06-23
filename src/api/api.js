import axios from "axios";

export const getCarByLot = (lot, selectedAuction, price = 1000) => {
  const car = axios
    .post(
      ` https://sweetcars.com.ua/andrey/228/${selectedAuction}`,
      `lot=${lot}&price=${price}`
    )
    .then(res => {
      return res;
    })

    .then(res => res.data);

  return car;
};
export const getCarByVin = (vin, selectedAuction, price = 1000) => {
  const car = axios
    .post(
      ` https://sweetcars.com.ua/andrey/228/${selectedAuction}`,
      `vin=${vin}&price=${price}`
    )
    .then(res => {
      return res;
    })

    .then(res => res.data);

  return car;
};

export const getCarsMakes = () => {
  return axios.get("http://45.11.24.158/makes");
};
export const getModels = make => {
  return axios.get(`http://45.11.24.158/models?make=${make}`);
};

export const getAveragePrice = ({ make, model, year }) => {
  return axios
    .get(
      `http://45.11.24.158/priceAvg?make=${make}&model=${model}&year=${year}`
    )
    .then(res => res);
};
