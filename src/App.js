import React from "react";
import  Weather  from "./features/weather/Weather";
import Theme from "./theme";
import styled, { ThemeProvider } from "styled-components";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
function App() {
  return (
    <ThemeProvider theme={Theme}>
      <AppContainer data-testid="App">
        <Weather />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
