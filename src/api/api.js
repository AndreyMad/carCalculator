import axios from "axios";

export const getLotByNumber = lot => {
  const reqBody = JSON.stringify(lot);

  axios.post("http://45.11.24.158/", reqBody).then(res => {
    console.log(res);
  });
};
export const w = "2";
