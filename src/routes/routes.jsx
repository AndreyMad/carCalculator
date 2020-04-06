import MainPage from "../pages/MainPage/MainPage";
import CalculatorPage from "../pages/CalculatorPage/CalculatorPage";
import SearchPage from "../pages/SearchPage/SearchPage";

export default {
  MAIN_PAGE: {
    path: "/",
    component: MainPage
  },
  CALCULATOR_PAGE: {
    path: "/calculator",
    component: CalculatorPage
  },
  SEARCH_PAGE: {
    path: "search",
    component: SearchPage
  }
};
