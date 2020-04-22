import MainPage from "../pages/MainPage/MainPage";
import CalculatorPage from "../pages/CalculatorPage/CalculatorPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import PartsPage from "../pages/PartsPage/PartsPage";

export default {
  MAIN_PAGE: {
    path: "/carCalculator",
    component: MainPage
  },
  CALCULATOR_PAGE: {
    path: "/calculator",
    component: CalculatorPage
  },
  SEARCH_PAGE: {
    path: "/search",
    component: SearchPage
  },
  PARTS_PAGE: {
    path: "/parts",
    component: PartsPage
  }
};
