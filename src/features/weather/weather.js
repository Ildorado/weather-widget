import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherForecast, selectWeather } from "./weatherSlice";
import styled from "styled-components";
import { CurrentWeather, WeatherForecast } from "../../components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22.5rem;
  height: 22.5rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 0.125rem solid ${(props) => props.theme.colors.border};
`;

export function Weather() {
  const weather = useSelector(selectWeather);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeatherForecast({ query: "London" }));
  }, [dispatch]);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("weather:", weather);
    console.log("weather.loading:,", weather.loading);
  }, [weather]);

  return (
    <Container>
      <h1> Weather App </h1>
      {weather.loading === false && (
        <>
          <CurrentWeather currentWeather={weather.current} />
          <WeatherForecast weatherDaily={weather.current.daily} />
        </>
      )}
    </Container>
  );
}
