import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherForecast, selectWeather } from "./weatherSlice";
import styled from "styled-components";
import { CurrentWeather } from "../../components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  height: 20rem;
  background-color: ${(props) => props.theme.colors.background};
`;

export function Weather() {
  const weather = useSelector(selectWeather);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeatherForecast({ query: "London" }));
  }, [dispatch]);

  useEffect(() => {
    console.log("weather:", weather);
  }, [weather]);

  return (
    <Container>
      <h1> Weather App </h1>
      {!weather.loading && <CurrentWeather />}
    </Container>
  );
}
