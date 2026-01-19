import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProjectsAccordion } from "./ProjectsAccordion";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

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

describe("ProjectsAccordion", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders "No Projects to show" when projects array is empty', () => {
    render(
      <Router>
        <ProjectsAccordion projects={[]} />
      </Router>
    );
    expect(screen.getByText("No Projects to show")).toBeInTheDocument();
  });

  it("renders project details correctly when projects are provided", () => {
    render(
      <Router>
        <ProjectsAccordion projects={mockProjects} />
      </Router>
    );
    expect(screen.getByText("Project A")).toBeInTheDocument();
    expect(screen.getByText("Project Manager")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Team Lead")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Q1 2024")).toBeInTheDocument();
  });

  it("expands and collapses the accordion", async () => {
    render(
      <Router>
        <ProjectsAccordion projects={mockProjects} />
      </Router>
    );
    screen.debug();
    const accordionSummary = screen.getByText("Project A");
    const descriptionText = screen.queryByText("Description of Project A");

    expect(descriptionText).not.toBeVisible();

    fireEvent.click(accordionSummary);
    expect(screen.getByText("Description of Project A")).toBeVisible();

    fireEvent.click(accordionSummary);
    await waitFor(() => {
      expect(screen.queryByText("Description of Project A")).not.toBeVisible();
    });
  });

  it("navigates to the correct edit page when edit icon is clicked", () => {
    render(
      <Router>
        <ProjectsAccordion projects={mockProjects} />
      </Router>
    );

    const editButton = screen.getByTestId("EditIcon");
    fireEvent.click(editButton);

    expect(mockUseNavigate).toHaveBeenCalledWith("edit-project/1");
  });

  it("navigates to the correct statistics page when open icon is clicked", () => {
    // const navigate = jest.fn();
    render(
      <Router>
        <ProjectsAccordion projects={mockProjects} />
      </Router>
    );

    const openButton = screen.getByTestId("OpenInNewIcon");
    fireEvent.click(openButton);

    expect(mockUseNavigate).toHaveBeenCalledWith("projectStatistics/1");
  });
});
