import React from "react";
import styled from "styled-components";
import { WeatherForecastElement } from "./weatherForecastElement";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
`;

export function WeatherForecast({ weatherDaily }) {
  // weatherDaily[0] is today weather
  const WeatherForecastFiveDaysAhead = weatherDaily.slice(1, 6);
  return (
    <Container>
      {WeatherForecastFiveDaysAhead.map((weatherInfo, ìndex) => (
        <WeatherForecastElement
          weatherInfo={weatherInfo}
          key={weatherInfo.dt}
        />
      ))}
    </Container>
  );
}
