import React from "react";
import { render, screen } from "@testing-library/react";
import Theme from "../../../theme";
import { ThemeProvider } from "styled-components";
import { defaultWeatherInfoObj } from "../../../utils/jest";
import WeatherForecastElement from "../WeatherForecastElement";

test("test if component shows icon, day and temperature", async () => {
  render(
    <ThemeProvider theme={Theme}>
      <WeatherForecastElement
        weatherInfo={defaultWeatherInfoObj.data.daily[0]}
      />
    </ThemeProvider>
  );

  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByText("Sat")).toBeInTheDocument();
  expect(screen.getByText("6℃")).toBeInTheDocument();
});
