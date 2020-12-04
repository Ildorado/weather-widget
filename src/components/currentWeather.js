import React from "react";
import { useSelector } from "react-redux";
import { selectWeather } from "../features/weather/weatherSlice";
import styled from "styled-components";
import { formatTime } from "../utils/formatting";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
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

export function CurrentWeather() {
  const weather = useSelector(selectWeather);

  return (
    <Container>
      <h3>{weather.current.cityName}</h3>
      <CurrentWeatherContainer>
        <Icon
          src={`http://openweathermap.org/img/wn/${weather.current.daily[0].weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <h2>{Math.round(weather.current.daily[0].temp.day)}℃</h2>
        <CurrentWeatherData>
          <Paragraph>Wind: {weather.current.daily[0].wind_speed} m/s</Paragraph>
          <Paragraph>
            {`Sunrise: ${formatTime(
              weather.current.daily[0].sunrise,
              weather.current.timezone
            )}`}
          </Paragraph>
          <Paragraph>
            {`Sunset: ${formatTime(
              weather.current.daily[0].sunset,
              weather.current.timezone
            )}`}
          </Paragraph>
        </CurrentWeatherData>
      </CurrentWeatherContainer>
    </Container>
  );
}
