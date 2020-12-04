import React from "react";
import { useSelector } from "react-redux";
import { selectWeather } from "./weatherSlice";
import styled from "styled-components";
import { CurrentWeather, WeatherForecast, Search } from "../../components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 22.5rem;
  }
  min-height: 25rem;
`;
const WeatherContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  border: 0.125rem solid ${(props) => props.theme.colors.border};
  padding: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

export function Weather() {
  const weather = useSelector(selectWeather);

  return (
    <Container>
      <h1> Weather App </h1>
      <SearchContainer>
        <Search />
      </SearchContainer>

      {!weather.loading && (
        <WeatherContainer>
          {weather.error ? (
            <h3>City not found</h3>
          ) : (
            <>
              <CurrentWeather currentWeather={weather.current} />
              <WeatherForecast weatherDaily={weather.current.daily} />
            </>
          )}
        </WeatherContainer>
      )}
    </Container>
  );
}
