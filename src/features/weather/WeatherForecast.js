import React from "react";
import styled from "styled-components";
import WeatherForecastElement from "./WeatherForecastElement";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
`;

function WeatherForecast({ weatherDaily }) {
  // weatherDaily[0] is today weather, while we
  // need weather only for following days, that's why we slice it
  const weatherForecastFiveDaysAhead = weatherDaily.slice(1, 6);
  return (
    <Container>
      {weatherForecastFiveDaysAhead.map((weatherInfo) => (
        <WeatherForecastElement
          weatherInfo={weatherInfo}
          key={weatherInfo.dt}
        />
      ))}
    </Container>
  );
}
export default WeatherForecast;
