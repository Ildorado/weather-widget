import React from "react";
import styled from "styled-components";
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
export function WeatherForecastElement({ weatherObj }) {
  return (
    <Container>
      {weatherObj && (
        <>
          <Day>{formatTime(weatherObj.dt, weatherObj.timezone, "ddd")}</Day>
          <Icon
            src={`http://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`}
            alt={weatherObj.weather[0].description}
          />
          <Temperature>{Math.round(weatherObj.temp.day)}℃</Temperature>
        </>
      )}
    </Container>
  );
}
