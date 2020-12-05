import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const sliceName = "weather";

export const fetchWeatherForecast = createAsyncThunk(
  `${sliceName}/fetchWeatherForecast`,
  ({ query }, { extra: { weatherAPI } }) => {
    return weatherAPI
      .fetchCurrentWeather({ query })
      .then((data) => weatherAPI.fetchWeatherForecast(data.data.coord))
      .then((forecastData) => {
        const cityName = query.charAt(0).toUpperCase() + query.slice(1);
        return {
          ...forecastData,
          data: { ...forecastData.data, cityName: cityName },
        };
      });
  }
);
export const weatherSlice = createSlice({
  name: sliceName,
  initialState: {
    current: null,
    loading: false,
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
      state.error = null;
    },
    [fetchWeatherForecast.rejected]: (state, { error, meta }) => {
      state.loading = false;
      state.error = error;
    },
  },
});
export const selectWeather = (state) => state.weather;
export default weatherSlice.reducer;
