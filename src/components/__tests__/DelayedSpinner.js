import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import Theme from "../../theme";
import { ThemeProvider } from "styled-components";
import { DelayedSpinner } from "../DelayedSpinner";

test("test showing spinner after delay", async () => {
  render(
    <ThemeProvider theme={Theme}>
      <DelayedSpinner />
    </ThemeProvider>
  );

  expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();

  await waitFor(
    () => expect(screen.getByTestId("spinner")).toBeInTheDocument(),
    1000,
    50
  );
});
