import axios from "axios";

const apiKey = "468a3504d2bcfc4926b8b092d9b7a883";

export const trendigFilmRequest = () => {
  return axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
  );
};
export const searchFimByQuery = query => {
  return axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  );
};
export const searcShowById = id => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
  );
};
export const getCast = id => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
  );
};
export const getReviews = id => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=en-US`
  );
};
