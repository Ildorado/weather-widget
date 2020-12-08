import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectWeather } from "./weatherSlice";
import styled from "styled-components";
import { enchantedStyled } from "../../utils/enchantedStyled";
import { DelayedSpinner } from "../../components";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";
import Search from "./Search";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${(props) =>
    enchantedStyled("width:[100%, 22.5rem, 25rem, 27.5rem]", props.theme.breakpoints)}
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

const SpinnerContainer = styled.div`
  margin-top: 5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

function Weather() {
  const weather = useSelector(selectWeather);

  const renderContent = useCallback(() => {
    if (weather.loading) {
      return (
        <SpinnerContainer>
          <DelayedSpinner delay={200} />
        </SpinnerContainer>
      );
    }

    if (weather.error) {
      return (
        <WeatherContainer>
          <h3>City not found</h3>
        </WeatherContainer>
      );
    }

    if (weather.current) {
      return (
        <WeatherContainer>
          <CurrentWeather currentWeather={weather.current} />
          <WeatherForecast weatherDaily={weather.current.daily} />
        </WeatherContainer>
      );
    }
  }, [weather]);

  return (
    <Container>
      <h1> Weather App </h1>
      <SearchContainer>
        <Search />
      </SearchContainer>

      {renderContent()}
    </Container>
  );
}
export default Weather;
