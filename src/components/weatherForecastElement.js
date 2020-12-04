import React from "react";
import styled from "styled-components";
import { timeFormats } from "../constants";
import { formatTime } from "../utils/formatting";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
`;
const Icon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;
const Day = styled.div`
  margin: 0;
  :nth-child(2) {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
`;
const Temperature = styled.h3`
  margin-top: 0.5rem;
  margin-bottom: 0;
`;
export function WeatherForecastElement({ weatherInfo }) {
    const mostRelevantWeatherDescription = weatherInfo.weather[0];
  return (
    <Container>
      <Day>
        {formatTime(
          weatherInfo.dt,
          weatherInfo.timezone,
          timeFormats.DayShortened
        )}
      </Day>
      <Icon
        src={`http://openweathermap.org/img/wn/${mostRelevantWeatherDescription.icon}@2x.png`}
        alt={mostRelevantWeatherDescription.description}
      />
      <Temperature>{Math.round(weatherInfo.temp.day)}℃</Temperature>
    </Container>
  );
}
