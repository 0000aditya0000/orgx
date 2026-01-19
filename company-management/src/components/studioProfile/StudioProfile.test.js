import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import StudioProfile from "./StudioProfile";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import fetchMock from "jest-fetch-mock";

const theme = createTheme();

fetchMock.enableMocks();

describe("StudioProfile Component", () => {
  const mockData = {
    data: {
      competency_name: "competency",
      competency_head: "John Doe",
      total_employee: 10,
      competency_code: "COMP001",
      total_project: 5,
      competency_admin_email: "john.doe@example.com",
      description: "Test description",
    },
  };
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("renders studio profile component", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockData));
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/studioprofile/1"]}>
          <Routes>
            <Route path="/studioprofile/:id" element={<StudioProfile />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("competency")).toBeInTheDocument();
    });
  });
});

describe("StudioProfile Component", () => {
  const mockData = {
    data: {
      competency_name: "Test Competency",
      competency_head: "John Doe",
      total_employee: 10,
      competency_code: "COMP001",
      total_project: 5,
      competency_admin_email: "john.doe@example.com",
      description: "Test description",
    },
  };
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("checks text on StudioProfile Component ", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/studioprofile/1"]}>
          <Routes>
            <Route path="/studioprofile/:id" element={<StudioProfile />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );
    const divElement = getByText("Competency Head");
    expect(divElement).toBeInTheDocument();
  });
});
