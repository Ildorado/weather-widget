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
  return (
    <Container>
      <WeatherForecastElement weatherObj={weatherDaily[1]} />
      <WeatherForecastElement weatherObj={weatherDaily[2]} />
      <WeatherForecastElement weatherObj={weatherDaily[3]} />
      <WeatherForecastElement weatherObj={weatherDaily[4]} />
      <WeatherForecastElement weatherObj={weatherDaily[5]} />
    </Container>
  );
}
