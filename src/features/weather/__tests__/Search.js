import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import Theme from "../../../theme";
import { ThemeProvider } from "styled-components";
import { createTestWeatherAPI } from "../../../utils/jest";
import { createStore } from "../../../utils/createStore";
import Search from "../Search";

test("test with submit by button click", async () => {
  const testWeatherAPI = createTestWeatherAPI();
  testWeatherAPI.fetchWeatherForecast = jest.fn();
  testWeatherAPI.fetchCurrentWeather = jest.fn();
  const store = createStore(testWeatherAPI);
  render(
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <Search />
      </Provider>
    </ThemeProvider>
  );

  userEvent.type(screen.getByRole("searchbox"), "London");
  userEvent.click(screen.getByRole("button"));
  expect(testWeatherAPI.fetchCurrentWeather).toBeCalledTimes(1);
});

test("test with submit by button double click", async () => {
  const testWeatherAPI = createTestWeatherAPI();
  testWeatherAPI.fetchWeatherForecast = jest.fn();
  testWeatherAPI.fetchCurrentWeather = jest.fn();
  const store = createStore(testWeatherAPI);
  render(
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <Search />
      </Provider>
    </ThemeProvider>
  );

  userEvent.type(screen.getByRole("searchbox"), "London");
  userEvent.dblClick(screen.getByRole("button"));
  expect(testWeatherAPI.fetchCurrentWeather).toBeCalledTimes(1);
});
