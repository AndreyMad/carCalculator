/* eslint-disable import/no-cycle */
import MainPage from "../pages/MainPage/MainPage";
import CalculatorPage from "../pages/CalculatorPage/CalculatorPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import PartsPage from "../pages/PartsPage/PartsPage";
import AboutUs from "../pages/AboutUs/AboutUs";
import Answers from "../pages/Answers/Answers";
import Admin from "../pages/AdminPanel/Admin";

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
    path: `/search`,
    component: SearchPage
  },

  PARTS_PAGE: {
    path: "/parts/",
    component: PartsPage
  },
  ABOUT_US_PAGE: {
    path: "/about",
    component: AboutUs
  },
  ANSWERS: {
    path: "/answers",
    component: Answers
  },
  ADMIN_PANEL: {
    path: "/admin",
    component: Admin
  }
};
