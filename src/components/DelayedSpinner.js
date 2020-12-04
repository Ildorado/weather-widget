import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Loader = styled.div`
  border: 0.4rem solid ${(props) => props.theme.colors.spinner1};
  border-top: 0.4rem solid ${(props) => props.theme.colors.spinner2};
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export function DelayedSpinner({ delay = 200 }) {
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSpinner(true);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return <>{showSpinner && <Loader />}</>;
}
