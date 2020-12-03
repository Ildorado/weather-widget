import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import weatherAPI from "../../api";

const sliceName = "weather";

export const fetchWeatherForecast = createAsyncThunk(
  `${sliceName}/fetchWeatherForecast`,
  ({ query }) => {
    return weatherAPI
      .fetchCurrentWeather({ query })
      .then((data) => weatherAPI.fetchWeatherForecast(data.data.coord))
      .then((forecastData) => {
        forecastData.data.cityName = query;
        return forecastData;
      });
  }
);
export const weatherSlice = createSlice({
  name: sliceName,
  initialState: {
    current: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchWeatherForecast.pending]: (state, { payload, meta }) => {
      state.loading = true;
    },
    [fetchWeatherForecast.fulfilled]: (state, { payload, meta }) => {
      state.loading = false;
      state.current = payload?.data;
    },
    [fetchWeatherForecast.rejected]: (state, { error, meta }) => {
      state.loading = false;
      state.error = error;
    },
  },
});
export const selectWeather = (state) => state.weather;
export default weatherSlice.reducer;
