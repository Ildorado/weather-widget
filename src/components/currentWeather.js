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
  width: 5rem;
  height: 5rem;
`;
const CurrentWeatherContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const CurrentWeatherData = styled.div`
  display: flex;
  flex-direction: column;
`;
const Paragraph = styled.div`
  margin: 0;
  :nth-child(2) {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
`;

export function CurrentWeather({ currentWeather }) {
  const todayWeather = currentWeather.daily[0];
  const mostRelevantWeatherDescription = todayWeather.weather[0];
  return (
    <Container>
      <h3>{currentWeather.cityName}</h3>
      <CurrentWeatherContainer>
        <Icon
          src={`http://openweathermap.org/img/wn/${mostRelevantWeatherDescription.icon}@2x.png`}
          alt={mostRelevantWeatherDescription.description}
        />
        <h2>{Math.round(todayWeather.temp.day)}℃</h2>
        <CurrentWeatherData>
          <Paragraph>Wind: {todayWeather.wind_speed} m/s</Paragraph>
          <Paragraph>
            {`Sunrise: ${formatTime(
              todayWeather.sunrise,
              todayWeather.timezone
            )}`}
          </Paragraph>
          <Paragraph>
            {`Sunset: ${formatTime(
              todayWeather.sunset,
              todayWeather.timezone
            )}`}
          </Paragraph>
        </CurrentWeatherData>
      </CurrentWeatherContainer>
    </Container>
  );
}
