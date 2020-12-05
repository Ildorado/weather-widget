import React from "react";
import { render, screen } from "@testing-library/react";
import Theme from "../../../theme";
import { ThemeProvider } from "styled-components";
import { defaultWeatherInfoObj } from "../../../utils/jest";
import WeatherForecast from "../WeatherForecast";

test("test if component shows 5 elements", async () => {
  render(
    <ThemeProvider theme={Theme}>
      <WeatherForecast weatherDaily={defaultWeatherInfoObj.data.daily} />
    </ThemeProvider>
  );

  expect(screen.queryAllByRole("img").length).toBe(5);
});
