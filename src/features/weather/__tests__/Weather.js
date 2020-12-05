import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import Theme from "../../../theme";
import { ThemeProvider } from "styled-components";
import { createTestWeatherAPI } from "../../../utils/jest";
import { createStore } from "../../../utils/createStore";
import Weather from "../Weather";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("test with valid city name", async () => {
  const testWeatherAPI = createTestWeatherAPI();
  const store = createStore(testWeatherAPI);
  render(
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <Weather />
      </Provider>
    </ThemeProvider>
  );

  userEvent.type(screen.getByRole("searchBox"), "London");
  userEvent.click(screen.getByRole("button"));
  expect(testWeatherAPI.fetchCurrentWeather).toBeCalledTimes(1);
  expect(await screen.findByText("London")).toBeInTheDocument();
});

test("test with invalid city name", async () => {
  const testWeatherAPI = createTestWeatherAPI();
  testWeatherAPI.fetchCurrentWeather.mockImplementationOnce(() =>
    Promise.reject()
  );
  const store = createStore(testWeatherAPI);
  render(
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <Weather />
      </Provider>
    </ThemeProvider>
  );

  userEvent.type(screen.getByRole("searchBox"), "asd");
  userEvent.click(screen.getByRole("button"));
  expect(testWeatherAPI.fetchCurrentWeather).toBeCalledTimes(1);
  expect(await screen.findByText("City not found")).toBeInTheDocument();
});

test("test showing spinner while api is delayed for more than set delay accepts", async () => {
  const testWeatherAPI = createTestWeatherAPI();
  testWeatherAPI.fetchCurrentWeather.mockImplementationOnce(
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject();
        }, 500);
      })
  );
  const store = createStore(testWeatherAPI);
  render(
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <Weather />
      </Provider>
    </ThemeProvider>
  );

  userEvent.type(screen.getByRole("searchBox"), "asd");
  userEvent.click(screen.getByRole("button"));
  expect(testWeatherAPI.fetchCurrentWeather).toBeCalledTimes(1);
  await waitFor(
    () => expect(screen.getByTestId("spinner")).toBeInTheDocument(),
    1000,
    50
  );
  await waitFor(
    () => {
      expect(screen.getByText("City not found")).toBeInTheDocument();
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    },
    1000,
    100
  );
});

test("test showing spinner while api is delayed for less then set delay spinner accepts", async () => {
  const testWeatherAPI = createTestWeatherAPI();
  testWeatherAPI.fetchCurrentWeather.mockImplementationOnce(
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject();
        }, 100);
      })
  );
  const store = createStore(testWeatherAPI);
  render(
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <Weather />
      </Provider>
    </ThemeProvider>
  );

  userEvent.type(screen.getByRole("searchBox"), "asd");
  userEvent.click(screen.getByRole("button"));
  expect(testWeatherAPI.fetchCurrentWeather).toBeCalledTimes(1);
  await waitFor(
    () => {
      expect(screen.getByText("City not found")).toBeInTheDocument();
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    },
    1000,
    100
  );
});
