import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import weatherReducer from "../features/weather/weatherSlice";
import defaultWeatherAPI from "../api";

export const createStore = (weatherAPI = defaultWeatherAPI) => {
  const defaultMiddleWare = [thunk.withExtraArgument({ weatherAPI })];
  return configureStore({
    reducer: {
      weather: weatherReducer,
    },
    devTools: true,
    middleware: defaultMiddleWare,
  });
};
