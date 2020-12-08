import {
  createTestWeatherAPI,
  defaultWeatherInfoObj,
} from "../../../utils/jest";
import { waitFor } from "@testing-library/react";
import { createStore } from "../../../utils/createStore";
import { fetchWeatherForecast, selectWeather } from "../weatherSlice";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("test store to have valid initial value", async () => {
  const testWeatherAPI = createTestWeatherAPI(defaultWeatherInfoObj);
  const store = createStore(testWeatherAPI);

  expect(store.getState()).toEqual({
    weather: { current: null, loading: false, error: null },
  });
});

test("test weatherSlice reducer with valid fetch data", async () => {
  const testWeatherAPI = createTestWeatherAPI();
  const store = createStore(testWeatherAPI);

  store.dispatch(fetchWeatherForecast({ query: "London" }));

  expect(selectWeather(store.getState()).current).toBe(null);
  expect(selectWeather(store.getState()).loading).toBe(true);

  await waitFor(() => {
    expect(selectWeather(store.getState()).current).not.toBe(null);
    expect(selectWeather(store.getState()).loading).toBe(false);
    expect(selectWeather(store.getState()).error).toBe(null);
  });
});

test("test weatherSlice reducer with invalid fetch data", async () => {
  const testWeatherAPI = createTestWeatherAPI();
  testWeatherAPI.fetchCurrentWeather.mockImplementationOnce(() =>
    Promise.reject()
  );
  const store = createStore(testWeatherAPI);

  store.dispatch(fetchWeatherForecast({ query: "London" }));

  expect(selectWeather(store.getState()).current).toBe(null);
  expect(selectWeather(store.getState()).loading).toBe(true);

  await waitFor(() => {
    expect(selectWeather(store.getState()).current).toBe(null);
    expect(selectWeather(store.getState()).loading).toBe(false);
    expect(selectWeather(store.getState()).error).not.toBe(null);
  });
});
