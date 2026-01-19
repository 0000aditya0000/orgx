import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmployeeSkills from "./EmployeeSkills";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("EmployeeSkills Component", () => {
  const mockSkillData = [
    { id: 1, skill_name: "React", level: 5 },
    { id: 2, skill_name: "Node.js", level: 4 },
    { id: 3, skill_name: "GraphQL", level: 3 },
  ];
  const mockAllSkills = [
    { id: 1, skill_name: "React" },
    { id: 2, skill_name: "Node.js" },
    { id: 3, skill_name: "GraphQL" },
    { id: 4, skill_name: "MongoDB" },
    { id: 5, skill_name: "Angular" },
  ];
  const mockHandleSkill = jest.fn();
  const mockHandleSkillData = jest.fn();
  const mockHandleDelete = jest.fn();
  const mockEmployeeData = { id: 1, studio_name: "Studio" };
  const editButton = true;

  beforeEach(() => {
    fetch.resetMocks();
  });

  test("loading State", () => {
    render(
      <EmployeeSkills
        skillData={mockSkillData}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        handleDelete={mockHandleDelete}
        editButton={editButton}
        employeeData={mockEmployeeData}
      />
    );

    expect(screen.getByTestId("ClassicSpinner"));
  });

  test("displays fetched skills as chips", async () => {
    fetch.mockResponses(
      [JSON.stringify({ data: mockSkillData }), { status: 200 }],
      [JSON.stringify({ data: mockAllSkills }), { status: 200 }],
      [JSON.stringify({ data: { id: 1 } }), { status: 200 }]
    );

    render(
      <EmployeeSkills
        skillData={mockSkillData}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        handleDelete={mockHandleDelete}
        editButton={editButton}
        employeeData={mockEmployeeData}
      />
    );

    await waitFor(() => expect(screen.getByText("React")).toBeInTheDocument());
  });

  test("handles fetch failure", async () => {
    fetch.mockReject(new Error("Failed to fetch"));

    render(
      <EmployeeSkills
        skillData={mockSkillData}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        handleDelete={mockHandleDelete}
        editButton={editButton}
        employeeData={mockEmployeeData}
      />
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(
        screen.getByText("Something went wrong while fetching employee skills:")
      ).toBeInTheDocument()
    );
  });

  test("handles non-ok response from fetch", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

    render(
      <EmployeeSkills
        skillData={mockSkillData}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        handleDelete={mockHandleDelete}
        editButton={editButton}
        employeeData={mockEmployeeData}
      />
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(
        screen.getByText("Unable to fetch employee skills")
      ).toBeInTheDocument()
    );
  });

  test("handles sequential fetch calls with the second one failing", async () => {
    fetch.mockResponses(
      [JSON.stringify({ data: mockSkillData }), { status: 200 }],
      [() => Promise.reject(new Error("API is down"))],
      [JSON.stringify({ data: { id: 1 } }), { status: 200 }]
    );

    render(
      <EmployeeSkills
        skillData={[]}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        handleDelete={mockHandleSkill}
        editButton={true}
        employeeData={mockEmployeeData}
      />
    );

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong while fetching all skills")
      ).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  test("opens add skill modal.", async () => {
    fetch.mockResponses(
      [JSON.stringify({ data: mockSkillData }), { status: 200 }],
      [JSON.stringify({ data: mockAllSkills }), { status: 200 }],
      [JSON.stringify({ data: { id: 1 } }), { status: 200 }]
    );

    render(
      <EmployeeSkills
        skillData={mockSkillData}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        handleDelete={mockHandleDelete}
        editButton={editButton}
        employeeData={mockEmployeeData}
      />
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("Add Skill")).toBeInTheDocument();
  });
});
