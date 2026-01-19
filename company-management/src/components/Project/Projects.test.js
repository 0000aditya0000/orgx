import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import { Projects } from "./Projects";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

fetchMock.enableMocks();

describe("Projects", () => {
  const mockProjects = [
    {
      title: "Project A",
      start_date: "2023-01-01",
      project_team: [
        { first_name: "John", last_name: "Doe", role: "Project Manager" },
        { first_name: "Jane", last_name: "Doe", role: "Team Lead" },
        { first_name: "Dev1", last_name: "Smith", role: "Developer" },
        { first_name: "Dev2", last_name: "Johnson", role: "Developer" },
      ],
      status: "In Progress",
      timeline: "Q1 2024",
      description: "Description of Project A",
      duration: "6 months",
      projectId: 1,
    },
  ];
  beforeEach(() => {
    fetch.resetMocks();
  });
  test("should render correctly", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: mockProjects,
      })
    );

    render(
      <Router>
        <Projects />
      </Router>
    );
  });
  test("should render correctly when no projects added", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: [],
      })
    );

    render(
      <Router>
        <Projects />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByText("No Projects to show")).toBeInTheDocument();
    });
  });

  test("should show snackbar when api response is not ok.", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });

    render(
      <Router>
        <Projects />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/unable to fetch projects/i));
    });
  });
  test("should show snackbar when api fails.", async () => {
    fetch.mockResponseOnce(new Error("API failed."));

    render(
      <Router>
        <Projects />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i));
    });
  });
});
