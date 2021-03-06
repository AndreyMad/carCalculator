import axios from "axios";
import config from "../config";

const bodId = "1134043686:AAFOSqO-GV5KOzkfJMZYxsRmM01QHiWAJTo";
const recepientId = "218478457";
const recepientId2 = "1052050185";
export const getCarByLot = (lot, selectedAuction, price = 1000, cap = 2.0) => {
  const car = axios
    .post(
      ` https://sweetcars.com.ua/andrey/228/${selectedAuction}`,
      `lot=${lot}&price=${price}&cap=${cap}`
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

export const sendMessageTelegram = mesage => {
  const messageToSend = `From AutonomSite, ${mesage}`;
  axios.post(
    `https://api.telegram.org/bot${bodId}/sendMessage`,
    `text=${messageToSend}&chat_id=${recepientId2}`
  );
  return axios.post(
    `https://api.telegram.org/bot${bodId}/sendMessage`,
    `text=${messageToSend}&chat_id=${recepientId}`
  );
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

export const authorization = (userEmail, password) => {
  const req = {
    method: "post",
    url: `${config.IP}auth`,
    data: { userEmail, password }
  };

  return axios(req).then(res => res);
};

export const registerUser = user => {
  const req = {
    method: "post",
    url: `${config.IP}registerUser`,
    data: { user }
  };
  return axios(req).then(res => res.data);
};

export const logout = token => {
  const req = {
    method: "post",
    url: `${config.IP}logout`,
    data: { token }
  };
  return axios(req).then(res => res.data);
};

export const checkUserSession = token => {
  const req = {
    method: "post",
    url: `${config.IP}getSession`,
    data: { token }
  };
  return axios(req).then(res => res);
};
export const deleteSession = token => {
  const req = {
    method: "post",
    url: `${config.IP}deleteSession`,
    data: { token }
  };
  return axios(req).then(res => res);
};
