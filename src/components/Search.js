import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fetchWeatherForecast } from "../features/weather/weatherSlice";
import throttle from "lodash.throttle";

const Input = styled.input`
  width: 70%;
`;

const Button = styled.button`
  width: 25%;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export function Search() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const throttledDispatch = useCallback(
    throttle(() => {
      dispatch(fetchWeatherForecast({ query: inputValue }));
    }, 1000),
    [inputValue, dispatch]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      throttledDispatch();
    },
    [throttledDispatch]
  );
  const handleOnChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);
  return (
    <Form noValidate>
      <Input value={inputValue} onChange={handleOnChange} />
      <Button type="submit" onClick={handleSubmit}>
        Search
      </Button>
    </Form>
  );
}
