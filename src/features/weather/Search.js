import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fetchWeatherForecast } from "./weatherSlice";
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

function Search() {
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
    <Form role="form" noValidate>
      <Input role="searchbox" value={inputValue} onChange={handleOnChange} />
      <Button type="submit" onClick={handleSubmit}>
        Search
      </Button>
    </Form>
  );
}
export default Search;
