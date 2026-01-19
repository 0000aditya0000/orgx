import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectForm from "./ProjectForm";
import { BrowserRouter as Router } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("ProjectForm Component", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  test("renders form with default values", () => {
    render(
      <Router>
        <ProjectForm title="Project" action="Add" />
      </Router>
    );

    expect(screen.getByText("Add Project")).toBeInTheDocument();
    expect(screen.getByLabelText("Project Title *")).toBeInTheDocument();
    expect(screen.getByLabelText("Timeline *")).toBeInTheDocument();
    expect(screen.getByLabelText("Description *")).toBeInTheDocument();
    expect(screen.getByText("Team Members")).toBeInTheDocument();
    expect(screen.getByLabelText("Start *")).toBeInTheDocument();
    expect(screen.getByLabelText("End *")).toBeInTheDocument();
    expect(screen.getByLabelText("Status *")).toBeInTheDocument();
    expect(screen.getByLabelText("Duration *")).toBeInTheDocument();
  });

  test("validates form fields and displays errors when required fields are missing", async () => {
    render(
      <Router>
        <ProjectForm title="Project" action="Add" />
      </Router>
    );

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(screen.getByText("Project Title is required")).toBeInTheDocument();
      expect(screen.getByText("Timeline is required")).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
      expect(screen.getByText("Status is required")).toBeInTheDocument();
      expect(screen.getByText("Duration is required")).toBeInTheDocument();
    });
  });

  test("displays employee search results", async () => {
    render(
      <Router>
        <ProjectForm title="Project" action="Add" />
      </Router>
    );

    const employeeAutocomplete = screen.getByLabelText("Employee *");

    fireEvent.focus(employeeAutocomplete);

    fireEvent.change(employeeAutocomplete, {
      target: { value: "John" },
    });

    const mockEmployees = [
      {
        id: 1,
        first_name: "John",
        designation: "Developer",
        studio_name: "Studio A",
        email: "john@example.com",
        image: null,
      },
    ];

    fetch.mockResponseOnce(
      JSON.stringify({
        message: "Employee created successfully",
        data: mockEmployees,
      })
    );

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("John"));
    expect(screen.getByLabelText("Employee *").value).toBe(
      "John - Developer- Studio A - (john@example.com)"
    );
  });
  test("displays error when unable to fetch employee", async () => {
    render(
      <Router>
        <ProjectForm title="Project" action="Add" />
      </Router>
    );

    const employeeAutocomplete = screen.getByLabelText("Employee *");

    fireEvent.focus(employeeAutocomplete);

    fireEvent.change(employeeAutocomplete, {
      target: { value: "John" },
    });

    fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch Employee(s) Data")
      ).toBeInTheDocument();
    });
  });

  test("displays error meassage when search API fails", async () => {
    render(
      <Router>
        <ProjectForm title="Project" action="Add" />
      </Router>
    );

    const employeeAutocomplete = screen.getByLabelText("Employee *");

    fireEvent.focus(employeeAutocomplete);

    fireEvent.change(employeeAutocomplete, {
      target: { value: "John" },
    });

    fetch.mockResponseOnce(new Error("API failed for searching employee"));

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });

  });

  test("submits the form with correct data", async () => {
    const navigate = jest.fn();
    render(
      <Router>
        <ProjectForm title="Project" action="Add" />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("Project Title *"), {
      target: { value: "New Project" },
    });

    const timelineSelect = screen.getByLabelText("Timeline *");

    fireEvent.mouseDown(timelineSelect);

    await waitFor(() => {
      const developmentOption = screen.getByRole("option", {
        name: "Development",
      });
      fireEvent.click(developmentOption);
    });

    expect(timelineSelect).toHaveTextContent("Development");

    fireEvent.change(screen.getByLabelText("Description *"), {
      target: {
        value:
          "Sunt esse excepteur irure exercitation veniam eiusmod esse ea. Pariatur reprehenderit consequat fugiat officia sit consectetur aliquip laborum minim consequat commodo reprehenderit. Nostrud ullamco velit nisi officia fugiat in. Ex dolor do dolore aliqua consectetur non culpa aliquip commodo in est deserunt labore cupidatat. Aute voluptate occaecat id aliqua quis do.Ea minim excepteur voluptate esse ullamco non in dolore. Aliquip nulla anim ea deserunt enim pariatur excepteur aute ad anim. Enim commodo tempor excepteur non nisi duis ut enim id veniam sint magna. Ipsum dolore fugiat aute ipsum voluptate dolor. Id velit Lorem ut ad pariatur consequat ex consequat.",
      },
    });

    const statusSelect = screen.getByLabelText("Status *");
    fireEvent.mouseDown(statusSelect);

    await waitFor(() => {
      const activeOption = screen.getByRole("option", { name: "Active" });
      fireEvent.click(activeOption);
    });

    expect(statusSelect).toHaveTextContent("Active");

    const durationSelect = screen.getByLabelText("Duration *");
    fireEvent.mouseDown(durationSelect);

    await waitFor(() => {
      const sixMonthsOption = screen.getByRole("option", { name: "6 months" });
      fireEvent.click(sixMonthsOption);
    });

    expect(durationSelect).toHaveTextContent("6 months");
    const employeeAutocomplete = screen.getByLabelText("Employee *");

    fireEvent.focus(employeeAutocomplete);

    fireEvent.change(employeeAutocomplete, {
      target: { value: "John" },
    });

    const mockEmployees = [
      {
        id: 1,
        first_name: "John",
        designation: "Developer",
        studio_name: "Studio A",
        email: "john@example.com",
        image: null,
      },
    ];

    fetch.mockResponseOnce(
      JSON.stringify({
        message: "Employee created successfully",
        data: mockEmployees,
      })
    );

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("John"));
    expect(screen.getByLabelText("Employee *").value).toBe(
      "John - Developer- Studio A - (john@example.com)"
    );

    const roleSelect = screen.getByLabelText("Role *");
    fireEvent.mouseDown(roleSelect);

    await waitFor(() => {
      const projectManagerOption = screen.getByRole("option", {
        name: "Project Manager",
      });
      fireEvent.click(projectManagerOption);
    });
    expect(roleSelect).toHaveTextContent("Project Manager");

    fetch.mockResponseOnce(
      JSON.stringify({
        message: "Project added successfully",
        data: [],
      })
    );

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(screen.getByText("Project added Successfully."));
    });
  });

  test("shows snackbar when fails to add", async () => {
    const navigate = jest.fn();
    render(
      <Router>
        <ProjectForm title="Project" action="Add" />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("Project Title *"), {
      target: { value: "New Project" },
    });

    const timelineSelect = screen.getByLabelText("Timeline *");

    fireEvent.mouseDown(timelineSelect);

    await waitFor(() => {
      const developmentOption = screen.getByRole("option", {
        name: "Development",
      });
      fireEvent.click(developmentOption);
    });

    expect(timelineSelect).toHaveTextContent("Development");

    fireEvent.change(screen.getByLabelText("Description *"), {
      target: {
        value:
          "Sunt esse excepteur irure exercitation veniam eiusmod esse ea. Pariatur reprehenderit consequat fugiat officia sit consectetur aliquip laborum minim consequat commodo reprehenderit. Nostrud ullamco velit nisi officia fugiat in. Ex dolor do dolore aliqua consectetur non culpa aliquip commodo in est deserunt labore cupidatat. Aute voluptate occaecat id aliqua quis do.Ea minim excepteur voluptate esse ullamco non in dolore. Aliquip nulla anim ea deserunt enim pariatur excepteur aute ad anim. Enim commodo tempor excepteur non nisi duis ut enim id veniam sint magna. Ipsum dolore fugiat aute ipsum voluptate dolor. Id velit Lorem ut ad pariatur consequat ex consequat.",
      },
    });

    const statusSelect = screen.getByLabelText("Status *");
    fireEvent.mouseDown(statusSelect);

    await waitFor(() => {
      const activeOption = screen.getByRole("option", { name: "Active" });
      fireEvent.click(activeOption);
    });

    expect(statusSelect).toHaveTextContent("Active");

    const durationSelect = screen.getByLabelText("Duration *");
    fireEvent.mouseDown(durationSelect);

    await waitFor(() => {
      const sixMonthsOption = screen.getByRole("option", { name: "6 months" });
      fireEvent.click(sixMonthsOption);
    });

    expect(durationSelect).toHaveTextContent("6 months");
    const employeeAutocomplete = screen.getByLabelText("Employee *");

    fireEvent.focus(employeeAutocomplete);

    fireEvent.change(employeeAutocomplete, {
      target: { value: "John" },
    });

    const mockEmployees = [
      {
        id: 1,
        first_name: "John",
        designation: "Developer",
        studio_name: "Studio A",
        email: "john@example.com",
        image: null,
      },
    ];

    fetch.mockResponseOnce(
      JSON.stringify({
        message: "Employee created successfully",
        data: mockEmployees,
      })
    );

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("John"));
    expect(screen.getByLabelText("Employee *").value).toBe(
      "John - Developer- Studio A - (john@example.com)"
    );

    const roleSelect = screen.getByLabelText("Role *");
    fireEvent.mouseDown(roleSelect);

    await waitFor(() => {
      const projectManagerOption = screen.getByRole("option", {
        name: "Project Manager",
      });
      fireEvent.click(projectManagerOption);
    });
    expect(roleSelect).toHaveTextContent("Project Manager");

    fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(screen.getByText("Unable to add project."));
    });
  });

  test("handles file upload correctly", async () => {
    render(
      <Router>
        <ProjectForm title="Project" action="Add" />
      </Router>
    );

    const file = new File(["sample"], "sample.txt", {
      type: "text/plain",
    });

    const fileInput = screen.getByLabelText(/Upload File/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText("sample.txt")).toBeInTheDocument();
  });
});
